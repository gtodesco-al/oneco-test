import Foundation

struct Transaction: Codable {
    let header: Header?
    let body: Body?
    
    enum CodingKeys: String, CodingKey {
        case header
        case body
    }
    
    struct Header: Codable {
        let httpProtocol: String?
        let hostname: String?
        let apiEndpoint: String?
        let developerId: String?
        let userId: String?
        let userAPIKey: String?
        let userHashKey: String?
        let username: String?
        let password: String?
        let domain: String?
        let authType: AuthenticationType?
        let transactionId: String?
        let accessToken: String?
        let deviceType: String?
        
        enum CodingKeys: String, CodingKey {
            case httpProtocol = "protocol"
            case hostname
            case apiEndpoint
            case developerId
            case userId
            case userAPIKey
            case userHashKey
            case username
            case password
            case domain
            case authType
            case transactionId
            case accessToken
            case deviceType
        }
    }
    
    struct Body: Codable {
        let action: String?
        let accountNumber: String?
        let paymentMethod: String?
        let expDate: String?
        let transactionAmount: String?
        
        enum CodingKeys: String, CodingKey {
            case action
            case accountNumber = "account_number"
            case paymentMethod = "payment_method"
            case expDate = "exp_date"
            case transactionAmount = "transaction_amount"
        }
    }
}
