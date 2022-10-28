import { User } from '@fortis/api'
import { DepositAccount, TransactionType } from '../../virtualTerminalTypes'
import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createUserForTesting } from '../../../../utils/testing/users'
import { calculateTransactionTotals } from './calculateTransactionTotals'

describe('calculateTransactionTotals', () => {
  interface TestCase {
    description: string
    expectedTotals?: ReturnType<typeof calculateTransactionTotals>
    user?: User
    account?: DepositAccount
    transactionType?: TransactionType
    taxRate?: number
    subtotal?: number
    taxOverride?: number
  }

  const defaultTestCase = {
    user: createUserForTesting(),
    account: createDepositAccountForTesting({
      vt_enable_sales_tax: true,
      tax_surcharge_config: 3,
      surcharge: { surcharge_fee: 3 },
    }),
    transactionType: 'sale' as const,
    taxRate: 10,
    subtotal: 1,
    expectedTotals: {
      tax: 0.1,
      surcharge_amount: 3,
      transaction_amount: 4.1,
    },
  }

  ;[
    {
      description:
        'calculates the proper values including surcharge with tax first if all values are provided and tax_surcharge_config is 3',
      account: {
        ...defaultTestCase.account,
        tax_surcharge_config: 3 as const,
      },
    },
    {
      description:
        'calculates the proper values including surcharge with surcharge first if all values are provided and tax_surcharge_config is 3',
      account: {
        ...defaultTestCase.account,
        tax_surcharge_config: 2 as const,
      },
      expectedTotals: {
        surcharge_amount: 3,
        tax: 0.4,
        transaction_amount: 4.4,
      },
    },
    {
      description: 'ignores tax is vt_enable_sales_tax is false',
      account: createDepositAccountForTesting({
        vt_enable_sales_tax: false,
        tax_surcharge_config: 3,
        surcharge: { surcharge_fee: 3 },
      }),
      expectedTotals: {
        tax: undefined,
        surcharge_amount: 3,
        transaction_amount: 4,
      },
    },
    {
      description:
        'includes surcharge if refund_surcharges is true and type is refund',
      account: {
        ...defaultTestCase.account,
        surcharge: {
          surcharge_fee: 3,
          refund_surcharges: true,
        },
      },
      transactionType: 'refund' as const,
    },
    {
      description: 'does not include surcharge if refund_surcharges is false',
      account: {
        ...defaultTestCase.account,
        surcharge: {
          surcharge_fee: 3,
          refund_surcharges: false,
        },
      },
      transactionType: 'refund' as const,
      expectedTotals: {
        tax: 0.1,
        surcharge_amount: undefined,
        transaction_amount: 1.1,
      },
    },
    {
      description:
        'does not include surcharge if apply_to_user_type_id does not match user_type_id',
      account: {
        ...defaultTestCase.account,
        surcharge: {
          surcharge_fee: 3,
          apply_to_user_type_id: 200 as const,
        },
      },
      expectedTotals: {
        tax: 0.1,
        surcharge_amount: undefined,
        transaction_amount: 1.1,
      },
    },
    {
      description:
        'includes surcharge if apply_to_user_type_id matches user_type_id',
      account: {
        ...defaultTestCase.account,
        surcharge: {
          surcharge_fee: 3,
          apply_to_user_type_id: 200 as const,
        },
      },
      user: createUserForTesting({ user_type_id: 200 }),
    },
    {
      description: 'uses tax override for tax if provided',
      ...defaultTestCase,
      taxOverride: 10,
      expectedTotals: {
        tax: 10,
        surcharge_amount: 3,
        transaction_amount: 14,
      },
    },
  ].forEach(
    ({
      //Defaults are provided for "happy path" tests where all fields are provided and valid and totals match expected results
      description,
      ...testCaseProps
    }: TestCase) => {
      test(description, () => {
        const {
          user,
          account,
          transactionType,
          subtotal,
          taxRate,
          expectedTotals,
          taxOverride,
        } = { ...defaultTestCase, ...testCaseProps }
        expect(
          calculateTransactionTotals(
            user,
            account,
            transactionType,
            subtotal,
            taxRate,
            taxOverride
          )
        ).toEqual(expectedTotals)
      })
    }
  )
})
