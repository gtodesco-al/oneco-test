import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createLocationForTesting } from '../testing/locations'
import {
  createUserForTesting,
  createUserResourceForTesting,
} from '../../../../utils/testing/users'
import { getDefaultProcessMethod } from './getDefaultProcessMethod'

describe('getDefaultProcessMethod', () => {
  test('set process_method to terminal if ui_prefs.process_method is physical_terminal and terminal is available', () => {
    const location = createLocationForTesting({
      terminals: [
        {
          id: '0',
          terminal_manufacturer_id: '0',
          title: '',
        },
      ],
    })

    const depositAccount = createDepositAccountForTesting()

    const user = createUserForTesting({
      ui_prefs: {
        process_method: 'physical_terminal',
      },
      resources: {
        '1': createUserResourceForTesting('v2.routertransactions.post'), //required for terminal option to show
      },
    })

    expect(getDefaultProcessMethod(location, depositAccount, user)).toBe(
      'terminal'
    )
  })

  test('set process_method to manual if ui_prefs.process_method is manual', () => {
    const location = createLocationForTesting({
      terminals: [
        {
          id: '0',
          terminal_manufacturer_id: '0',
          title: '',
        },
      ],
    })

    const depositAccount = createDepositAccountForTesting()

    const user = createUserForTesting({
      ui_prefs: {
        process_method: 'virtual_terminal',
      },
      resources: {
        '1': createUserResourceForTesting('v2.routertransactions.post'), //required for terminal option to show
      },
    })

    expect(getDefaultProcessMethod(location, depositAccount, user)).toBe(
      'manual'
    )
  })

  test('set process_method to manual if ui_prefs.process_method is terminal but terminal is not available', () => {
    const user = createUserForTesting({
      ui_prefs: {
        process_method: 'physical_terminal',
      },
    })

    expect(
      getDefaultProcessMethod(
        createLocationForTesting(),
        createDepositAccountForTesting(),
        user
      )
    ).toBe('manual')
  })
})
