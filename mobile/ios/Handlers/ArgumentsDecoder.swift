import Foundation

enum ArgumentsDecoderError: LocalizedError {
    case failedToConvertStringToData(type: String)
    
    var errorDescription: String? {
        switch self {
        case .failedToConvertStringToData(let type):
            return "Failed to convert String to \(type)"
        }
    }
}

final class ArgumentsDecoder {
    func decode<T: Decodable>(args: String) throws -> T {
        guard
            let argsData = args.data(using: .utf8),
            let argsDecoded = try? JSONDecoder().decode(T.self, from: argsData)
        else {
            throw ArgumentsDecoderError.failedToConvertStringToData(type: String(describing: T.self))
        }
        return argsDecoded
    }
}
