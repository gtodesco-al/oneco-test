import { DepositAccount, TransactionType } from '../../virtualTerminalTypes'
import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { getDefaultTransactionAmounts } from './getDefaultTransactionAmounts'

describe('getDefaultTransactionAmounts', () => {
  interface TestCase {
    /**
     * Provides the fields specific to the test case.
     */
    account?: Partial<DepositAccount>

    /**
     * Provides the test case transaction type
     */
    transactionType?: TransactionType

    /**
     * Indicates the field to be asserted against.
     */
    field: keyof ReturnType<typeof getDefaultTransactionAmounts>

    /**
     * Indicates what the field value should bne.
     */
    expectedValue: unknown
  }

  ;(
    [
      {
        account: {},
        field: 'subtotal_amount',
        expectedValue: 0,
      },

      {
        account: {},
        field: 'transaction_amount',
        expectedValue: 0,
      },

      {
        account: { vt_enable_sales_tax: false },
        field: 'tax',
        expectedValue: undefined,
      },

      {
        account: { vt_enable_sales_tax: true },
        field: 'tax',
        expectedValue: 0,
      },

      {
        account: { vt_enable_tip: false },
        field: 'tip_amount',
        expectedValue: undefined,
      },

      {
        account: { vt_enable_tip: true },
        field: 'tip_amount',
        expectedValue: 0,
      },

      {
        account: { surcharge: undefined },
        field: 'surcharge_amount',
        expectedValue: undefined,
      },

      {
        account: { surcharge: {} },
        field: 'surcharge_amount',
        expectedValue: 0,
      },

      {
        account: { surcharge: { refund_surcharges: false } },
        transactionType: 'refund',
        field: 'surcharge_amount',
        expectedValue: undefined,
      },

      {
        account: { surcharge: { refund_surcharges: true } },
        transactionType: 'refund',
        field: 'surcharge_amount',
        expectedValue: 0,
      },

      {
        account: { surcharge: {} },
        transactionType: 'avsonly',
        field: 'surcharge_amount',
        expectedValue: undefined,
      },

      {
        account: { vt_enable_tip: true },
        transactionType: 'avsonly',
        field: 'tip',
        expectedValue: undefined,
      },

      {
        account: { vt_enable_sales_tax: true },
        transactionType: 'avsonly',
        field: 'tax_amount',
        expectedValue: undefined,
      },
    ] as TestCase[]
  ).forEach(
    ({
      account = {},
      transactionType = 'sale',
      field,
      expectedValue,
    }: TestCase) => {
      test(`given ${JSON.stringify(
        account
      )} and transaction type ${transactionType}, ${String(
        field
      )} is ${expectedValue}`, () => {
        const amounts = getDefaultTransactionAmounts(
          createDepositAccountForTesting(account),
          transactionType
        )

        expect(amounts[field]).toBe(expectedValue)
      })
    }
  )
})
