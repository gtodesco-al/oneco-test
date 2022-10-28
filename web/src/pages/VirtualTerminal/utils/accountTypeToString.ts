import { Token } from '@fortis/api/src/services/tokens.service'

export const accountTypeToString = (
  type: Token['account_type'] | undefined
): string => {
  switch (type) {
    case 'checking':
      return 'Checking'
    case 'savings':
      return 'Saving'
    case 'mc':
      return 'Mastercard'
    case 'visa':
      return 'Visa'
    default:
      return 'Unknown'
  }
}
