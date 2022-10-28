import { User } from '@fortis/api'
import { getPermissionsMap } from '../../../../utils/permissions'
import {
  DepositAccount,
  LocationWithDepositAccounts,
  Terminal,
} from '../../virtualTerminalTypes'

export const getValidTerminals = (
  location: LocationWithDepositAccounts,
  account: DepositAccount | undefined,
  user: User
): Terminal[] => {
  const permissions = getPermissionsMap(user)

  if (
    !(
      permissions['v2.routertransactions.post'] ||
      permissions['v2.terminaltransactions.post']
    ) ||
    account?.industry_type === 'moto' ||
    account?.industry_type === 'ecommerce' ||
    account?.payment_method !== 'cc'
  ) {
    return []
  }

  return (
    location.terminals?.filter(
      (t) =>
        t.terminal_manufacturer_id !== '4' &&
        t.terminal_manufacturer_id !== '100'
    ) ?? []
  )
}
