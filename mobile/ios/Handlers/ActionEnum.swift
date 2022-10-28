import Foundation

@frozen
enum ActionEnum: String, CaseIterable {
    case performTransaction
    case performEMVTransaction
    case setDeviceType
    case scanForDevices
    case stopScanForDevices
    case connectDeviceByName
    case initialDeviceSetup
    case disconnectDevice
    case setTimeouts
    case unknown
    
    static func fromString(action: String) -> Self {
        guard let enumValue = Self.allCases.first(
            where: { $0.rawValue == action }
        ) else {
            return .unknown
        }
        return enumValue
    }
}
