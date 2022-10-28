import { User } from '@fortis/api'
import {
  DepositAccount,
  VirtualTerminalTransaction,
} from '../../virtualTerminalTypes'
import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createLocationForTesting } from '../testing/locations'
import { createUserForTesting } from '../../../../utils/testing/users'
import { calculateInitialVirtualTerminalValues } from './calculateInitialVirtualTerminalValues'

describe('calculateInitialVirtualTerminalValues', () => {
  interface TestProps {
    user?: User
    account?: DepositAccount | undefined
  }
  const calculateValues = ({
    user = createUserForTesting(),
    account = undefined,
  }: TestProps = {}) =>
    calculateInitialVirtualTerminalValues(
      createLocationForTesting(),
      user,
      account,
      'manual',
      'sale',
      'personal'
    )

  const calculateValuesWithAccount = (account: Partial<DepositAccount> = {}) =>
    calculateValues({ account: createDepositAccountForTesting(account) })

  test('sets product_transaction_id to the deposit account ID if one is provided', () => {
    const expectedId = 'testid'
    const { product_transaction_id } = calculateValues({
      account: createDepositAccountForTesting({ id: expectedId }),
    })

    expect(product_transaction_id).toBe(expectedId)
  })

  test('sets product_transaction_id to undefined if no account is provided', () => {
    const { product_transaction_id } = calculateValues({ account: undefined })

    expect(product_transaction_id).toBeUndefined()
  })

  interface TestCase {
    /**
     * Provides the fields specific to the test case.
     */
    account: Partial<DepositAccount>

    /**
     * Indicates the field to be asserted against.
     */
    field: keyof VirtualTerminalTransaction

    /**
     * Indicates what the field value should bne.
     */
    expectedValue: unknown
  }

  const cases = [
    {
      account: {},
      field: 'description',
      expectedValue: '',
    },

    {
      account: { vt_clerk_number: false, payment_method: 'cc' },
      field: 'clerk_number',
      expectedValue: undefined,
    },

    {
      account: { vt_clerk_number: true, payment_method: 'ach' },
      field: 'clerk_number',
      expectedValue: undefined,
    },

    {
      account: { vt_clerk_number: true, payment_method: 'cc' },
      field: 'clerk_number',
      expectedValue: '',
    },

    {
      account: { vt_order_number: false, payment_method: 'cc' },
      field: 'order_number',
      expectedValue: undefined,
    },

    {
      account: { vt_order_number: true, payment_method: 'ach' },
      field: 'order_number',
      expectedValue: undefined,
    },

    {
      account: { vt_order_number: true, payment_method: 'cc' },
      field: 'order_number',
      expectedValue: '',
    },
    {
      account: { vt_show_custom_fields: false },
      field: 'transaction_c1',
      expectedValue: undefined,
    },
    {
      account: { vt_show_custom_fields: false },
      field: 'transaction_c2',
      expectedValue: undefined,
    },
    {
      account: { vt_show_custom_fields: false },
      field: 'transaction_c3',
      expectedValue: undefined,
    },
    {
      account: { vt_show_custom_fields: false },
      field: 'transaction_c4',
      expectedValue: undefined,
    },
    {
      account: { vt_show_custom_fields: true },
      field: 'transaction_c1',
      expectedValue: '',
    },
    {
      account: { vt_show_custom_fields: true },
      field: 'transaction_c2',
      expectedValue: '',
    },
    {
      account: { vt_show_custom_fields: true },
      field: 'transaction_c3',
      expectedValue: '',
    },
    {
      account: { vt_show_custom_fields: true },
      field: 'transaction_c4',
      expectedValue: '',
    },
    {
      account: {},
      field: 'terminal_id',
      expectedValue: undefined,
    },
  ] as TestCase[]

  cases.forEach(({ account, field, expectedValue }) => {
    test(`given ${JSON.stringify(account)}, ${String(
      field
    )} is ${expectedValue}`, () => {
      const results = calculateValuesWithAccount(account)
      expect(results[field]).toBe(expectedValue)
    })
  })
})
