import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createUserWithTransactionPermissions } from '../../../../utils/testing/users'
import { getDefaultTransactionType } from './getDefaultTransactionType'

const ccAccount = createDepositAccountForTesting({
  payment_method: 'cc',
  default_transaction_type: 'sale',
})

const achAccount = createDepositAccountForTesting({
  payment_method: 'ach',
  default_transaction_type: 'debit',
})

describe('getDefaultTransactionType', () => {
  test('Defaults to sale if the user does not have the resource for default transaction type.', () => {
    const expectedAction = 'refund'

    expect(
      getDefaultTransactionType(
        createUserWithTransactionPermissions('avsonly', 'sale'),

        {
          ...ccAccount,
          default_transaction_type: expectedAction,
        }
      )
    ).toBe('sale')
  })

  test('Defaults to default_transaction_type on deposit account if provided and available to the user.', () => {
    const expectedAction = 'refund'

    expect(
      getDefaultTransactionType(
        createUserWithTransactionPermissions(expectedAction),
        {
          ...ccAccount,
          default_transaction_type: expectedAction,
        }
      )
    ).toBe(expectedAction)
  })

  test('Defaults to first allowed cc transaction type if account is cc and default is unavailable', () => {
    expect(
      getDefaultTransactionType(
        createUserWithTransactionPermissions('avsonly', 'authonly'),
        ccAccount
      )
    ).toBe('authonly')
  })

  test('Defaults to first allowed ach transaction type if account is ach and no default is provided', () => {
    expect(
      getDefaultTransactionType(
        createUserWithTransactionPermissions('credit'),
        achAccount
      )
    ).toBe('credit')
  })
})
