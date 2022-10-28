import { Token } from '@fortis/api/src/services/tokens.service'

export const secCodeToAccountType = (code: Token['ach_sec_code']) => {
  switch (code) {
    case 'PPD':
    case 'TEL':
    case 'WEB':
      return 'personal'
    default:
      return 'business'
  }
}
