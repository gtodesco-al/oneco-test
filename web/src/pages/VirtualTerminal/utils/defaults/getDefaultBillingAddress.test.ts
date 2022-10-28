import { BillingAddress, DepositAccount } from '../../virtualTerminalTypes'
import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { getDefaultBillingAddress } from './getDefaultBillingAddress'

describe('getDefaultBillingAddress', () => {
  test('returns undefined if account is undefined', () => {
    const address = getDefaultBillingAddress(undefined, 'manual')
    expect(address).toBeUndefined()
  })

  test('returns undefined if process method is terminal', () => {
    const address = getDefaultBillingAddress(
      createDepositAccountForTesting(),
      'terminal'
    )
    expect(address).toBeUndefined()
  })

  const getAddressWithAccount = (account: Partial<DepositAccount> = {}) =>
    getDefaultBillingAddress(createDepositAccountForTesting(account), 'manual')

  interface TestCase {
    account?: Partial<DepositAccount>
    field: keyof BillingAddress
    expectedValue: unknown
  }

  ;(
    [
      {
        field: 'city',
        expectedValue: '',
      },

      {
        field: 'state',
        expectedValue: '',
      },

      {
        account: { vt_street: false },
        field: 'street',
        expectedValue: undefined,
      },

      {
        account: { vt_street: true },
        field: 'street',
        expectedValue: '',
      },

      {
        account: { vt_zip: false },
        field: 'postal_code',
        expectedValue: undefined,
      },

      {
        account: { vt_zip: true },
        field: 'postal_code',
        expectedValue: '',
      },

      {
        account: { vt_billing_phone: false },
        field: 'phone',
        expectedValue: undefined,
      },

      {
        account: { vt_billing_phone: true },
        field: 'phone',
        expectedValue: '',
      },
    ] as TestCase[]
  ).forEach(({ account = {}, field, expectedValue }) => {
    test(`given ${JSON.stringify(
      account
    )}, ${field} is "${expectedValue}"`, () => {
      const address = getAddressWithAccount(account)
      expect(address?.[field]).toBe(expectedValue)
    })
  })
})
