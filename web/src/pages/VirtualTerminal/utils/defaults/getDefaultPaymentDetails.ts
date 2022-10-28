import { User } from '@fortis/api'
import {
  AccountType,
  DepositAccount,
  LocationWithDepositAccounts,
  ProcessMethod,
  VirtualTerminalTransaction,
} from '../../virtualTerminalTypes'
import { getDefaultSECCode } from './getDefaultSECCode'
import { getDefaultTerminalId } from './getDefaultTerminalId'

export const getDefaultPaymentDetails = (
  location: LocationWithDepositAccounts,
  user: User,
  account: DepositAccount | undefined,
  processMethod: ProcessMethod,
  accountType: AccountType
): Partial<VirtualTerminalTransaction> => {
  if (processMethod !== 'manual' || account === undefined) {
    return {
      terminal_id: undefined,
      account_holder_name: undefined,
      account_number: undefined,
      exp_date: undefined,
      cvv: undefined,
      ach_sec_code: undefined,
      account_type: undefined,
      routing_number: undefined,
    }
  }

  return {
    terminal_id: getDefaultTerminalId(location, account, user),
    account_holder_name: '',
    account_number: '',
    exp_date: account.payment_method === 'cc' ? '' : undefined,
    cvv: account.payment_method === 'cc' && account.vt_cvv ? '' : undefined,
    account_type: account.payment_method === 'ach' ? 'checking' : undefined,
    routing_number: account.payment_method === 'ach' ? '' : undefined,
    ach_sec_code: getDefaultSECCode(account, accountType),
  }
}
