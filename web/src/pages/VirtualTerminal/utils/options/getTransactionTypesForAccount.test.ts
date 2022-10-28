import { createUserWithTransactionPermissions } from '../../../../utils/testing/users'
import { getTransactionTypesForAccount } from './getTransactionTypesForAccount'
import { createDepositAccountForTesting } from '../testing/depositAccounts'

describe('getTransactionTypesForAccount', () => {
  const baseUser = createUserWithTransactionPermissions()

  const baseAccount = createDepositAccountForTesting()

  test('Returns an empty array if account is undefined', () => {
    expect(getTransactionTypesForAccount(undefined, baseUser)).toEqual([])
  })

  test('Returns an empty array if account is provided but user has no resources', () => {
    expect(getTransactionTypesForAccount(baseAccount, baseUser)).toEqual([])
  })

  test('Includes only resources the user has permission for', () => {
    expect(
      getTransactionTypesForAccount(
        baseAccount,
        createUserWithTransactionPermissions('sale', 'authonly')
      )
    ).toEqual([
      {
        label: 'sale',
        value: 'sale',
      },
      {
        label: 'auth only',
        value: 'authonly',
      },
    ])
  })

  test('ACH does not include debit if ach_allow_debit is false', () => {
    expect(
      getTransactionTypesForAccount(
        createDepositAccountForTesting({
          ach_allow_debit: false,
          payment_method: 'ach',
        }),
        createUserWithTransactionPermissions('debit', 'credit')
      )
    ).toEqual([
      {
        label: 'send (credit)',
        value: 'credit',
      },
    ])
  })

  test('ACH does not include debit if ach_allow_debit is false', () => {
    expect(
      getTransactionTypesForAccount(
        createDepositAccountForTesting({
          ach_allow_credit: false,
          payment_method: 'ach',
        }),
        createUserWithTransactionPermissions('debit', 'credit')
      )
    ).toEqual([
      {
        label: 'collect (debit)',
        value: 'debit',
      },
    ])
  })
})
