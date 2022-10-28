import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { getDefaultSECCode } from './getDefaultSECCode'

describe('getDefaultSecCode', () => {
  test('returns undefined for CC accounts', () => {
    const code = getDefaultSECCode(
      createDepositAccountForTesting({ payment_method: 'cc' }),
      'personal'
    )

    expect(code).toBeUndefined()
  })
})
