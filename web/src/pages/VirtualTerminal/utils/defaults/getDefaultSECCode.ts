import { AccountType, DepositAccount } from '../../virtualTerminalTypes'

export const getDefaultSECCode = (
  account: DepositAccount | undefined,
  accountType: AccountType
) => {
  if (account?.payment_method === 'cc') {
    return undefined
  }

  if (accountType === 'personal') {
    return 'PPD'
  } else {
    return 'CCD'
  }
}
