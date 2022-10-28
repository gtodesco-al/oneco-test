import {
  AccountType,
  DepositAccount,
  ProcessMethod,
  VirtualTerminalTransaction,
} from '../../virtualTerminalTypes'
import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createLocationForTesting } from '../testing/locations'
import { createUserForTesting } from '../../../../utils/testing/users'
import { getDefaultPaymentDetails } from './getDefaultPaymentDetails'

describe('getDefaultPaymentDetails', () => {
  interface TestProps {
    account?: Partial<DepositAccount>
    processMethod?: ProcessMethod
    accountType?: AccountType
  }

  const getDetails = ({
    account = {},
    processMethod = 'manual',
    accountType = 'personal',
  }: TestProps) =>
    getDefaultPaymentDetails(
      createLocationForTesting(),
      createUserForTesting(),
      createDepositAccountForTesting(account),
      processMethod,
      accountType
    )

  test('all values are undefined if processMethod is terminal', () => {
    const values = getDetails({ processMethod: 'terminal' })

    expect(values).toEqual({
      terminal_id: undefined,
      account_holder_name: undefined,
      account_number: undefined,
      exp_date: undefined,
      cvv: undefined,
      ach_sec_code: undefined,
      account_type: undefined,
      routing_number: undefined,
    })
  })

  interface ManualProcessTestCase {
    props: Partial<TestProps>
    field: keyof VirtualTerminalTransaction
    expectedValue: unknown
  }

  //Manual process tests
  ;(
    [
      {
        props: {},
        field: 'account_holder_name',
        expectedValue: '',
      },

      {
        props: {},
        field: 'account_number',
        expectedValue: '',
      },

      {
        props: { account: { payment_method: 'ach' } },
        field: 'exp_date',
        expectedValue: undefined,
      },

      {
        props: { account: { payment_method: 'cc' } },
        field: 'exp_date',
        expectedValue: '',
      },

      {
        props: { account: { payment_method: 'ach', vt_cvv: true } },
        field: 'cvv',
        expectedValue: undefined,
      },

      {
        props: { account: { payment_method: 'cc', vt_cvv: false } },
        field: 'cvv',
        expectedValue: undefined,
      },

      {
        props: { account: { payment_method: 'cc', vt_cvv: true } },
        field: 'cvv',
        expectedValue: '',
      },

      {
        props: { account: { payment_method: 'cc' } },
        field: 'account_type',
        expectedValue: undefined,
      },

      {
        props: { account: { payment_method: 'ach' } },
        field: 'account_type',
        expectedValue: 'checking',
      },

      {
        props: { account: { payment_method: 'cc' } },
        field: 'routing_number',
        expectedValue: undefined,
      },

      {
        props: { account: { payment_method: 'ach' } },
        field: 'routing_number',
        expectedValue: '',
      },
    ] as ManualProcessTestCase[]
  ).forEach(({ props, field, expectedValue }) => {
    test(`given ${JSON.stringify(props)}, ${String(
      field
    )} is ${expectedValue}`, () => {
      const values = getDetails(props)

      expect(values[field]).toEqual(expectedValue)
    })
  })
})
