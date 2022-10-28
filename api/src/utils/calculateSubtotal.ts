import type { Transaction } from '../schemas/types'

export const calculateSubtotal = (transaction: Transaction) =>
  (transaction.transaction_amount ?? 0) -
  (transaction.surcharge_amount ?? 0) -
  (transaction.tax ?? 0) -
  (transaction.tip_amount ?? 0)
