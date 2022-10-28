final class EventEmitter {
    
    private let context: PaymentSDKPlugin
    private let action: ActionEnum
    
    init(context: PaymentSDKPlugin, action: ActionEnum) {
        self.context = context
        self.action = action
    }
    
    func sendEvent(type: EventType, message: String? = nil) {
        guard context.hasListeners else {
            print("⚠️ Try sending \(action.rawValue) with no listeners registered")
            return
            
        }
        
        let body: [String: String] = [
            "status": type.rawValue,
            "message": message ?? type.defaultMessage
        ]
        
        context.sendEvent(
            withName: action.rawValue,
            body: body
        )
    }
}
