import { User } from '@fortis/api'
import {
  AccountType,
  DepositAccount,
  LocationWithDepositAccounts,
  ProcessMethod,
  TransactionType,
  VirtualTerminalTransaction,
} from '../../virtualTerminalTypes'
import { getDefaultBillingAddress } from './getDefaultBillingAddress'
import { getDefaultPaymentDetails } from './getDefaultPaymentDetails'
import { getDefaultTransactionAmounts } from './getDefaultTransactionAmounts'

//Calculates default values for the form based on the selected location and account.
export const calculateInitialVirtualTerminalValues = (
  location: LocationWithDepositAccounts,
  user: User,
  account: DepositAccount | undefined,
  processMethod: ProcessMethod,
  transactionType: TransactionType,
  accountType: AccountType
): VirtualTerminalTransaction => {
  return {
    location_id: location.id,
    product_transaction_id: account?.id ?? undefined,
    account_number: '',
    exp_date: '',
    description: '',

    clerk_number:
      account?.payment_method === 'cc' && account?.vt_clerk_number
        ? ''
        : undefined,
    order_number:
      account?.payment_method === 'cc' && account?.vt_order_number
        ? ''
        : undefined,

    transaction_c1: account?.vt_show_custom_fields ? '' : undefined,
    transaction_c2: account?.vt_show_custom_fields ? '' : undefined,
    transaction_c3: account?.vt_show_custom_fields ? '' : undefined,
    transaction_c4: account?.vt_show_custom_fields ? '' : undefined,

    billing_address: getDefaultBillingAddress(account, processMethod),
    ...getDefaultTransactionAmounts(account, transactionType),
    ...getDefaultPaymentDetails(
      location,
      user,
      account,
      processMethod,
      accountType
    ),
  }
}
