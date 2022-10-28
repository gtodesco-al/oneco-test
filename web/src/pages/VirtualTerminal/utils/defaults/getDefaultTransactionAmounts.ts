import { DepositAccount, TransactionType } from '../../virtualTerminalTypes'

export const getDefaultTransactionAmounts = (
  account: DepositAccount | undefined,
  transactionType: TransactionType
) => {
  if (account === undefined || transactionType === 'avsonly') {
    return {
      subtotal_amount: undefined,
      tax: undefined,
      tip_amount: undefined,
      surcharge_amount: undefined,
      transaction_amount: 0,
    }
  }

  const includeSurcharge =
    account?.surcharge &&
    (transactionType !== 'refund' || account?.surcharge?.refund_surcharges)

  return {
    subtotal_amount: 0,
    tax: account?.vt_enable_sales_tax ? 0 : undefined,
    tip_amount: account?.vt_enable_tip ? 0 : undefined,
    surcharge_amount: includeSurcharge ? 0 : undefined,
    transaction_amount: 0,
  }
}
