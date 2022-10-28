import {
  DepositAccount,
  LocationWithDepositAccounts,
} from '../../virtualTerminalTypes'

export const getVirtualTerminalDepositAccounts = (
  location: LocationWithDepositAccounts
): DepositAccount[] =>
  location.product_transactions?.filter((a) => a.vt_enable) ?? []
