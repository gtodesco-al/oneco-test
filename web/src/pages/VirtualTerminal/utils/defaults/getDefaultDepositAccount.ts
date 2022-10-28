import {
  LocationWithDepositAccounts,
  DepositAccount,
} from '../../virtualTerminalTypes'
import { getVirtualTerminalDepositAccounts } from '../options/getVirtualTerminalDepositAccounts'

export const getDefaultDepositAccount = (
  location: LocationWithDepositAccounts
): DepositAccount | undefined => {
  if (location.product_transactions === undefined) {
    return undefined
  }

  //Create account map to avoid iterating through all accounts for everything that needs them.
  const accountMap = getVirtualTerminalDepositAccounts(location).reduce<{
    [id: string]: DepositAccount
  }>(
    (accounts, account) => Object.assign(accounts, { [account.id]: account }),
    {}
  )

  if (
    location.default_cc !== undefined &&
    location.default_cc !== null &&
    accountMap[location.default_cc]?.vt_enable
  ) {
    return accountMap[location.default_cc]
  } else if (
    location.default_ach !== undefined &&
    location.default_ach !== null &&
    accountMap[location.default_ach]?.vt_enable
  ) {
    return accountMap[location.default_ach]
  } else {
    return location.product_transactions?.find((p) => p.vt_enable === true)
  }
}
