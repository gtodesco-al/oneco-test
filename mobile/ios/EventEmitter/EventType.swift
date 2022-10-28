enum EventType: String {
    case error = "ERROR"
    case ok = "OK"
    
    var defaultMessage: String {
        switch self {
        case .error:
            return "Failure"
        case .ok:
            return "Success"
        }
    }
}
