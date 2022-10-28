import CommonCrypto
import Foundation
import PaymentSDK
import React

@objc(PaymentSDKPlugin)
final class PaymentSDKPlugin: RCTEventEmitter {
    
    private lazy var actionHandler: ActionHandler = .init(context: self)
    private(set) var hasListeners: Bool = false
    
    @objc(execute:args:)
    func execute(action: String, args: String) {
        actionHandler.execute(
            action: action,
            args: args
        )
    }
    
    override func startObserving() {
        hasListeners = true
    }
    
    override func stopObserving() {
        hasListeners = false
    }
    
    override func supportedEvents() -> [String]! {
        ActionEnum.allCases.map {
            $0.rawValue
        }
    }
    
    override class func requiresMainQueueSetup() -> Bool {
        true
    }
}
