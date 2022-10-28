import { User } from '@fortis/api'
import { getPermissionsMap } from '../../../../utils/permissions'
import { DepositAccount, TransactionType } from '../../virtualTerminalTypes'

interface TransactionTypeOption {
  label: string
  value: TransactionType
}

const ccTransactionTypes: TransactionTypeOption[] = [
  {
    label: 'sale',
    value: 'sale',
  },
  {
    label: 'auth only',
    value: 'authonly',
  },
  {
    label: 'avs only',
    value: 'avsonly',
  },
  {
    label: 'refund',
    value: 'refund',
  },
  {
    label: 'force',
    value: 'force',
  },
]

const achTransactionTypes: TransactionTypeOption[] = [
  {
    label: 'collect (debit)',
    value: 'debit',
  },
  {
    label: 'send (credit)',
    value: 'credit',
  },
]

const permissionPath = 'v2.transactions.post'

export const getTransactionTypesForAccount = (
  account: DepositAccount | undefined,
  user: User
): TransactionTypeOption[] => {
  if (!account) {
    return []
  }

  const baseMethods =
    account.payment_method === 'cc'
      ? ccTransactionTypes
      : achTransactionTypes.filter(
          (m) =>
            (m.value === 'debit' && account.ach_allow_debit) ||
            (m.value === 'credit' && account.ach_allow_credit)
        )

  //Uses a map to avoid having to iterate through permissions list for each permission.
  const permissions = getPermissionsMap(user)

  return baseMethods.filter(
    (method) => permissions[`${permissionPath}.${method.value}`] !== undefined
  )
}
