import Foundation

extension Optional where Wrapped == String {
    var isNilOrEmpty: Bool {
        guard let string = self else { return true }
        return string.trim() == ""
    }
}

extension String {
    func trim() -> String {
        isEmpty ? "" : trimmingCharacters(in: .whitespacesAndNewlines)
    }
}
