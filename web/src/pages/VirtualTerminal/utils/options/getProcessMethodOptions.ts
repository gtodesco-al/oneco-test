import { User } from '@fortis/api'
import {
  DepositAccount,
  LocationWithDepositAccounts,
  ProcessMethod,
} from '../../virtualTerminalTypes'
import { getValidTerminals } from './getValidTerminals'

export const getProcessMethodOptions = (
  location: LocationWithDepositAccounts,
  account: DepositAccount | undefined,
  user: User,
  allowCustomer = false
): ProcessMethod[] => {
  const includeTerminalOption =
    getValidTerminals(location, account, user).length > 0

  const allowedValues: ProcessMethod[] = ['manual']

  if (includeTerminalOption) {
    allowedValues.push('terminal')
  }

  if (allowCustomer) {
    allowedValues.push('wallet')
  }

  return allowedValues
}
