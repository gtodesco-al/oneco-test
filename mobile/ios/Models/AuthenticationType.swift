import Foundation

enum AuthenticationType: String, Codable {
    case token
    case hmac
    case apikey
}
