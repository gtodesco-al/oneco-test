import { getVirtualTerminalDepositAccounts } from './getVirtualTerminalDepositAccounts'
import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createLocationForTesting } from '../testing/locations'

describe('getVtDepositAccounts', () => {
  const vtAccount = createDepositAccountForTesting({ vt_enable: true })

  const noVtAccount = createDepositAccountForTesting({ vt_enable: false })

  const depositAccounts = [noVtAccount, vtAccount]

  const baseLocation = createLocationForTesting()

  test('Returns an empty array if location has no accounts', () => {
    expect(getVirtualTerminalDepositAccounts(baseLocation)).toEqual([])
  })

  test('Returns only vt_enable accounts if location has any', () => {
    expect(
      getVirtualTerminalDepositAccounts(
        createLocationForTesting({ product_transactions: depositAccounts })
      )
    ).toEqual([vtAccount])
  })
})
