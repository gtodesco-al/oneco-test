import Foundation

enum PaymentHandlerError: LocalizedError {
    case invalidApiDetails
    case invalidAuthType
    case invalidAuthParameters
    case emptyArguments
    case invalidParameters(action: String)
    
    var errorDescription: String? {
        switch self {
        case .invalidApiDetails:
            return "Invalid API details"
        case .invalidAuthType:
            return "Invalid Auth type"
        case .invalidAuthParameters:
            return "Invalid Auth parameters"
        case .emptyArguments:
            return "Expected non-empty arguments"
        case .invalidParameters(let action):
            return "Invalid parameters in \(action)"
        }
    }
}
