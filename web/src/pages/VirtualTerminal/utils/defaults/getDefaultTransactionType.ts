import { User } from '@fortis/api'
import { DepositAccount, TransactionType } from '../../virtualTerminalTypes'
import { getTransactionTypesForAccount } from '../options/getTransactionTypesForAccount'

const defaultCcTransactionType: TransactionType = 'sale'
const defaultAchTransactionType: TransactionType = 'debit'

export const getDefaultTransactionType = (
  user: User,
  account?: DepositAccount
): TransactionType => {
  //If there's no account then there's no sensible option, so just return 'sale'
  if (account === undefined) {
    return defaultCcTransactionType
  }

  const allowedTransactions = getTransactionTypesForAccount(account, user).map(
    (t) => t.value
  )

  //Determine the default transaction type.
  const defaultTransaction =
    account.default_transaction_type ??
    (account.payment_method === 'cc'
      ? defaultCcTransactionType
      : defaultAchTransactionType)

  //If the default is allowed then return it.  If nothing is allowed, fall back on the default.
  if (
    allowedTransactions.length === 0 ||
    allowedTransactions.includes(defaultTransaction)
  ) {
    return defaultTransaction
  }

  //If none of the defaults work, return the first allowed action.
  return allowedTransactions[0]
}
