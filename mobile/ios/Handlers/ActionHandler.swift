import Foundation

final class ActionHandler {
    
    private let context: PaymentSDKPlugin
    
    init(context: PaymentSDKPlugin) {
        self.context = context
    }
    
    func execute(action: String, args: String) {
        let action = ActionEnum.fromString(action: action)
        let callback = EventEmitter(context: context, action: action)
        
        do {
            let paymentHandler = PaymentHandler(callback: callback)
            
            switch action {
            case .performTransaction:
                try paymentHandler.performTransaction(args: args)
            case .performEMVTransaction:
                try paymentHandler.performEMVTransaction(args: args)
            case .setDeviceType:
                try paymentHandler.setDeviceType(args: args)
            case .scanForDevices:
                try paymentHandler.scanForDevices(args: args)
            case .stopScanForDevices:
                try paymentHandler.stopScanForDevices()
            case .connectDeviceByName:
                try paymentHandler.connectDeviceByName(args: args)
            case .initialDeviceSetup:
                try paymentHandler.initialDeviceSetup(args: args)
            case .disconnectDevice:
                try paymentHandler.disconnectDevice()
            case .setTimeouts:
                try paymentHandler.setTimeouts(args: args)
            case .unknown:
                break
            }
        } catch let error {
            callback.sendEvent(
                type: .error,
                message: error.localizedDescription
            )
        }
    }
}
