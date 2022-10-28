import { User } from '@fortis/api'
import {
  DepositAccount,
  LocationWithDepositAccounts,
  ProcessMethod,
} from '../../virtualTerminalTypes'
import { getProcessMethodOptions } from '../options/getProcessMethodOptions'

export const getDefaultProcessMethod = (
  location: LocationWithDepositAccounts,
  account: DepositAccount | undefined,
  user: User
): ProcessMethod => {
  const availableOptions = getProcessMethodOptions(location, account, user)

  if (
    user.ui_prefs?.process_method === 'physical_terminal' &&
    availableOptions.includes('terminal')
  ) {
    return 'terminal'
  }

  return 'manual'
}
