import { User } from '@fortis/api'
import {
  LocationWithDepositAccounts,
  DepositAccount,
} from '../../virtualTerminalTypes'
import { getValidTerminals } from '../options/getValidTerminals'

export const getDefaultTerminalId = (
  location: LocationWithDepositAccounts,
  account: DepositAccount | undefined,
  user: User
): string | null | undefined => {
  const validTerminals = getValidTerminals(location, account, user)

  if (validTerminals.length === 0) {
    return undefined
  }

  const preferredTerminal = user.ui_prefs?.default_terminal

  if (validTerminals.some((terminal) => terminal.id === preferredTerminal)) {
    return preferredTerminal
  }

  return validTerminals[0]?.id
}
