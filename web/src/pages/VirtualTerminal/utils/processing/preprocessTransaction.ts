import { CreditCardTransactionData } from '@fortis/api'
import { cloneDeep } from 'lodash'
import { preprocessCurrencyAmount } from './preprocessCurrencyAmount'

/**
 * Cleans up transactions so that they can be accepted by the API, if possible.
 * Done here rather than as an API hook so that other consumers of the API don't have to conform to the same string formatting
 */
export const preprocessTransaction = (
  transaction: CreditCardTransactionData
): CreditCardTransactionData => {
  const processedTransaction = cloneDeep(transaction)
  return {
    ...processedTransaction,
    subtotal_amount: preprocessCurrencyAmount(
      processedTransaction.subtotal_amount
    ),
    tip_amount: preprocessCurrencyAmount(processedTransaction.tip_amount),
    tax: preprocessCurrencyAmount(processedTransaction.tax),
    surcharge_amount: preprocessCurrencyAmount(
      processedTransaction.surcharge_amount
    ),
    transaction_amount: preprocessCurrencyAmount(
      processedTransaction.transaction_amount
    ),
    exp_date: processedTransaction.exp_date?.replace('/', '') ?? undefined,
  }
}
