import CryptoKit
import Foundation
import PaymentSDK

final class PaymentHandler: NSObject {
    
    private let callback: EventEmitter
    private let decoder: ArgumentsDecoder
    
    private(set) var emvTransaction: EMVTransaction?
    private(set) var restServiceClient: RestServiceClient?
    private(set) var transactionAction: TransactionAction?
    private(set) var payload: [String: String]?
    private(set) var transactionId: String = ""
    private(set) var deviceType: DeviceType = .UNKNOWN
    private(set) var connectingDevice: String = ""
    
    init(callback: EventEmitter, decoder: ArgumentsDecoder = .init()) {
        self.callback = callback
        self.decoder = decoder
    }
    
    deinit {
        emvTransaction = nil
        restServiceClient = nil
        transactionAction = nil
        payload = nil
        transactionId = ""
        deviceType = .UNKNOWN
        connectingDevice = ""
    }
    
    func performTransaction(args: String) throws {
        do {
            try setup(with: args)
            
            guard let restClient = restServiceClient, let transaction = transactionAction, let payload = payload else {
                throw(PaymentHandlerError.invalidParameters(action: "performTransaction"))
            }
            
            let paramMap = NSMutableDictionary(dictionary: payload)
            
            let transactionService = TransactionService(restClient: restClient)
            transactionService.processTransaction(transactionAction: transaction, paramMap: paramMap) { [self] responseData in
                if responseData.isEmpty {
                    callback.sendEvent(type: .error)
                } else {
                    callback.sendEvent(type: .ok, message: responseData)
                }
            }
        }
    }
    
    func performEMVTransaction(args: String) throws {
        do {
            try setup(with: args)
            
            guard let payload = payload else {
                throw(PaymentHandlerError.invalidParameters(action: "performEMVTransaction"))
            }
            
            if let result = emvTransaction?.PerformEMVSale(jsonPayload: payload), result {
                callback.sendEvent(type: .ok, message: "EMV Transaction Started...")
            } else {
                callback.sendEvent(type: .error)
            }
        }
    }
    
    func setDeviceType(args: String) throws {
        do {
            let device: [String] = try decoder.decode(args: args)
            
            guard let result = emvTransaction?.setDeviceType(type: getDeviceType(with: device.first)), result else {
                throw(PaymentHandlerError.invalidParameters(action: "setDeviceType"))
            }
            callback.sendEvent(type: .ok)
        }
    }
    
    func scanForDevices(args: String) throws {
        callback.sendEvent(type: .ok, message: "Scanning in progress...")
        
        do {
            try setup(with: args)
            
            _ = emvTransaction?.scanForDevices()
        }
    }
    
    func stopScanForDevices() throws {
        callback.sendEvent(type: .ok, message: "Stop scanning is not supported")
    }
    
    func connectDeviceByName(args: String) throws {
        do {
            let arguments: [String] = try decoder.decode(args: args)
            
            guard let device = arguments.first, let result = emvTransaction?.connectDeviceByName(name: device), result else {
                throw(PaymentHandlerError.invalidParameters(action: "connectDeviceByName"))
            }
            
            callback.sendEvent(type: .ok)
        }
    }
    
    func initialDeviceSetup(args: String) throws {
        callback.sendEvent(type: .ok, message: "Running initial device setup...")
        
        do {
            try setup(with: args)
            
            guard let restClient = restServiceClient else {
                throw(PaymentHandlerError.invalidParameters(action: "initialDeviceSetup"))
            }
            
            emvTransaction?.restServiceClient = restClient
            _ = emvTransaction?.initialDeviceSetup()
        }
    }
    
    func disconnectDevice() throws {
        _ = emvTransaction?.DisconnectDevice()
    }
    
    func setTimeouts(args: String) throws {
        do {
            let arguments: [String] = try decoder.decode(args: args)
            
            guard !arguments.isEmpty, arguments.count == 2, arguments[0] != "null", arguments[1] != "null" else {
                throw(PaymentHandlerError.invalidParameters(action: "setTimeouts"))
            }
            
            let idleTimeout = Int(arguments[0]) ?? 0
            let sleepTimeout = Int(arguments[1]) ?? 0
            _ = emvTransaction?.setTimeouts(idleMinutes: idleTimeout, sleepMinutes: sleepTimeout)
        }
    }
}

// MARK: - Private Methods

extension PaymentHandler {
    
    private func setup(with args: String) throws {
        let parameters: Transaction = try decoder.decode(args: args)
        
        guard let header = parameters.header else {
            throw(PaymentHandlerError.emptyArguments)
        }
        
        guard let httpProtocol = header.httpProtocol, let hostname = header.hostname, let apiEndpoint = header.apiEndpoint else {
            throw(PaymentHandlerError.invalidApiDetails)
        }
        
        guard let authType = header.authType else {
            throw(PaymentHandlerError.invalidAuthType)
        }
        
        guard let developerId = header.developerId, let userId = header.userId else {
            throw(PaymentHandlerError.invalidAuthParameters)
        }
        
        restServiceClient = RestServiceClient(apiProtocol: httpProtocol, apiHostName: hostname, apiEndpointPath: apiEndpoint)
        
        var requestHeader: [String: String] = [:]
        requestHeader["developer-id"]  = developerId
        requestHeader["user-id"] = userId
        requestHeader["authType"] = authType.rawValue
        
        switch authType {
        case .token:
            try setRequestHeaderByToken(with: header, requestHeader: &requestHeader)
        case .hmac:
            try setRequestHeaderByHMAC(with: header, requestHeader: &requestHeader)
        case .apikey:
            try setRequestHeaderByKey(with: header, requestHeader: &requestHeader)
        }
        
        _ = restServiceClient?.setHTTPRequestHeaders(headerParams: NSDictionary(dictionary: requestHeader))
        transactionId = header.transactionId ?? ""
        
        if let device = header.deviceType {
            deviceType = getDeviceType(with: device)
        } else {
            deviceType = getDeviceType(with: "IDTECH-VP3300BT")
        }
        
        if let body = parameters.body, let action = body.action {
            transactionAction = getTransactionAction(with: action)
            payload = try body.asDictionary()
        }
        
        if let restServiceClient {
            emvTransaction = EMVTransaction(restClient: restServiceClient)
            emvTransaction?.isPluginRequest = true
            emvTransaction?.pluginDelegate = self
            _ = emvTransaction?.setDeviceType(type: deviceType)
        }
    }
    
    private func setRequestHeaderByToken(with header: Transaction.Header, requestHeader: inout [String: String]) throws {
        if let accessToken = header.accessToken {
            requestHeader["access-token"] = accessToken
            return
        }
        
        guard let developerId = header.developerId, let httpProtocol = header.httpProtocol, let hostname = header.hostname else {
            throw(PaymentHandlerError.invalidAuthParameters)
        }
        
        var errorToReturn: Error?
        var accessToken: String?
        
        let semaphore = DispatchSemaphore(value: 1)
        
        if let url = URL(string: "\(httpProtocol)://\(hostname)/v2/token") {
            var request = URLRequest(url: url)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
            request.setValue(developerId, forHTTPHeaderField: "developer-id")
            request.httpMethod = "POST"
            
            var bodyParameters: [String: String?] = [:]
            bodyParameters["username"] = header.username
            bodyParameters["password"] = header.password
            bodyParameters["domain"] = header.domain
            
            let jsonData = try? JSONSerialization.data(withJSONObject: bodyParameters)
            request.httpBody = jsonData
            
            let session = URLSession.shared
            let task = session.dataTask(with: request) { data, response, error in
                defer { semaphore.signal() }
                
                var responseDictionary: [AnyHashable: Any]? = nil
                
                do {
                    if let data {
                        responseDictionary = try JSONSerialization.jsonObject(with: data, options: []) as? [AnyHashable: Any]
                    }
                } catch let parseError {
                    errorToReturn = parseError
                }
                
                let tokenObj = responseDictionary?["token"] as? [AnyHashable: Any]
                accessToken = tokenObj?["token"] as? String
            }
            task.resume()
            semaphore.wait()
            
            guard let accessToken else {
                throw(errorToReturn ?? PaymentHandlerError.invalidAuthParameters)
            }
            
            requestHeader["access-token"] = accessToken
        }
    }
    
    private func setRequestHeaderByHMAC(with header: Transaction.Header, requestHeader: inout [String: String]) throws {
        guard let userId = header.userId, let userHashKey = header.userHashKey else {
            throw(PaymentHandlerError.invalidAuthParameters)
        }
        
        let timeInSeconds = Int(Date().timeIntervalSince1970)
        let timestamp = String(format: "%1d", timeInSeconds)
        
        let hmacData = "\(userId)\(timestamp)"
        let key = SymmetricKey(data: Data(hmacData.utf8))
        
        let signature = HMAC<SHA256>.authenticationCode(for: Data(userHashKey.utf8), using: key)
        let userHash = Data(signature).map { String(format: "%02x", $0) }.joined()
        
        requestHeader["hash-key"] =  userHash
        requestHeader["timestamp"] = timestamp
    }
    
    private func setRequestHeaderByKey(with header: Transaction.Header, requestHeader: inout [String: String]) throws {
        guard let userAPIKey = header.userAPIKey else {
            throw(PaymentHandlerError.invalidAuthParameters)
        }
        
        requestHeader["user-api-key"] = userAPIKey
    }

    private func getDeviceType(with deviceType: String?) -> DeviceType {
        switch deviceType {
        case "IDTECH-VP3300BT":
            return .IDTECH_VP3300BT
        case "IDTECH-VP8800":
            return .IDTECH_VP8800
        default:
            return .UNKNOWN
        }
    }
    
    private func getTransactionAction(with action: String) -> TransactionAction {
        switch action.lowercased() {
        case "sale": return .Sale
        case "refund": return .Refund
        case "void": return .Void
        case "authonly": return .AuthOnly;
        case "authcomplete": return .AuthComplete
        case "authincrement": return .AuthIncrement
        case "force": return .Force
        case "tipadjust": return .TipAdjust
        case "debit": return .Debit
        case "credit": return .Credit
        case "edit": return .Edit
        case "avsonly": return .AVSOnly
        case "view_transaction": return .ViewRecord
        case "view_transactions_all": return .ViewRecordList
        case "bininfo": return .GetBinInfo
        case "store": return .Store
        default: return .NotSelected
        }
    }
}

// MARK: - PluginDelegate

extension PaymentHandler: PluginDelegate {
    
    func deviceMessage(_ message: String!) {
        callback.sendEvent(
            type: .ok,
            message: "\("deviceMessage!@#$")\(message ?? "")"
        )
    }
    
    func deviceScanResponse(_ deviceID: String!, deviceName: String!) {
        callback.sendEvent(
            type: .ok,
            message: "\("deviceScanResponse!@#$")\(deviceID ?? "")\("!@#$")\(deviceName ?? "")"
        )
    }
    
    func deviceConnected() {
        callback.sendEvent(
            type: .ok,
            message: "\("deviceConnected!@#$")\(connectingDevice)\(" - Connected")"
        )
    }
    
    func deviceDisconnected() {
        callback.sendEvent(
            type: .ok,
            message: "\("deviceDisconnected!@#$")\(connectingDevice)\(" - Disconnected")"
        )
    }
    
    func outputLogs(_ logs: String!) {
        callback.sendEvent(
            type: .ok,
            message: "\("outputLogs!@#$")\(logs ?? "")"
        )
    }
    
    func transactionResponse(_ data: String!) {
        callback.sendEvent(
            type: .ok,
            message: "\("transactionResponse!@#$")\(data ?? "")"
        )
    }
}
