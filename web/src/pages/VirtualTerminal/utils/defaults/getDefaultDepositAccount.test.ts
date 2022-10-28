import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createLocationForTesting } from '../testing/locations'
import { getDefaultDepositAccount } from './getDefaultDepositAccount'

const ccAccount = createDepositAccountForTesting({
  id: '1',
  payment_method: 'cc',
  vt_enable: true,
  default_transaction_type: 'sale',
})

const achAccount = createDepositAccountForTesting({
  id: '2',
  payment_method: 'ach',
  vt_enable: true,
  default_transaction_type: 'debit',
})

const noVtAccount = createDepositAccountForTesting({
  id: '3',
  payment_method: 'ach',
  vt_enable: false,
})

const baseLocation = createLocationForTesting({
  product_transactions: [noVtAccount, achAccount, ccAccount],
})

describe('getDefaultDepositAccount', () => {
  test('Does not default to a deposit account with vt_enable set to false', () => {
    expect(
      getDefaultDepositAccount(
        createLocationForTesting({ product_transactions: [noVtAccount] })
      )
    ).toBeUndefined()
  })

  test('Returns the account matching default_cc if default_cc and default_ach are provided', () => {
    expect(
      getDefaultDepositAccount({
        ...baseLocation,
        default_cc: ccAccount.id,
        default_ach: achAccount.id,
      })
    ).toBe(ccAccount)
  })

  test('Uses the account ID matching the default_ach if the default_ach is provided and the default_cc is not', () => {
    expect(
      getDefaultDepositAccount({
        ...baseLocation,
        default_ach: achAccount.id,
      })
    ).toBe(achAccount)
  })

  test('Ignores default_ach and uses first vt_enable=true account if default_ach is not vt_enable', () => {
    expect(
      getDefaultDepositAccount({
        ...baseLocation,
        default_ach: noVtAccount.id,
        product_transactions: [noVtAccount, ccAccount],
      })
    ).toBe(ccAccount)
  })
})
