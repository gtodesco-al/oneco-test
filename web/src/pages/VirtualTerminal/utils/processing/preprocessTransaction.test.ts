import { CreditCardTransactionData } from '@fortis/api'
import { preprocessCurrencyAmount } from './preprocessCurrencyAmount'
import { preprocessTransaction } from './preprocessTransaction'

describe('preprocessTransaction', () => {
  const testTransaction: CreditCardTransactionData = {
    subtotal_amount: 123456.78,
    tip_amount: 123456.78,
    tax: 123456.78,
    surcharge_amount: 123456.78,
    transaction_amount: 123456.78,
    account_number: '1111222',
    exp_date: new Date().toISOString(),
  }

  test('returns a new object and not a reference to the original', () => {
    expect(preprocessTransaction(testTransaction)).not.toBe(testTransaction)
  })
  ;(
    [
      'subtotal_amount',
      'tip_amount',
      'tax',
      'surcharge_amount',
      'transaction_amount',
    ] as const
  ).forEach((key) => {
    test(`applies currency preprocessor to ${key}`, () => {
      expect(preprocessTransaction(testTransaction)[key]).toBe(
        preprocessCurrencyAmount(testTransaction[key])
      )
    })
  })

  test('removes slashes from expiry date', () => {
    expect(preprocessTransaction({ exp_date: '11/22' } as any).exp_date).toBe(
      '1122'
    )
  })

  test('returns undefined for expiry date if date is undefined', () => {
    expect(preprocessTransaction({ exp_date: undefined } as any).exp_date).toBe(
      undefined
    )
  })
})
