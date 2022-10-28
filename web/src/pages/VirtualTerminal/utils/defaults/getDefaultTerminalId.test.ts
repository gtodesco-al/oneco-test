import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createLocationForTesting } from '../testing/locations'
import {
  createUserForTesting,
  createUserResourceForTesting,
} from '../../../../utils/testing/users'
import { getDefaultTerminalId } from './getDefaultTerminalId'

describe('getDefaultTerminal', () => {
  const bluetoothTerminal = {
    id: '1',
    title: 'Bluetooth',
    terminal_manufacturer_id: '4',
  }

  const fakeTerminal = {
    id: '2',
    title: 'Fake',
    terminal_manufacturer_id: '100',
  }

  const validTerminal = {
    id: '3',
    title: 'Valid',
    terminal_manufacturer_id: '1',
  }

  const location = createLocationForTesting({
    terminals: [bluetoothTerminal, fakeTerminal, validTerminal],
  })

  test('returns undefined if no valid terminals are available', () => {
    expect(
      getDefaultTerminalId(
        createLocationForTesting(),
        createDepositAccountForTesting(),
        createUserForTesting()
      )
    ).toBe(undefined)
  })

  test('returns ui_prefs.default_terminal if it is in the valid list of terminals', () => {
    const user = createUserForTesting({
      ui_prefs: {
        default_terminal: '3',
      },
      resources: {
        '1': createUserResourceForTesting('v2.terminaltransactions.post'),
      },
    })

    expect(
      getDefaultTerminalId(location, createDepositAccountForTesting(), user)
    ).toBe('3')
  })

  test('returns the first terminal in the list if the default terminal is not in the valid list of terminals', () => {
    const user = createUserForTesting({
      ui_prefs: {
        default_terminal: '2',
      },
      resources: {
        '1': createUserResourceForTesting('v2.terminaltransactions.post'),
      },
    })

    expect(
      getDefaultTerminalId(location, createDepositAccountForTesting(), user)
    ).toBe('3')
  })

  test('returns the first terminal in the list if there is no default terminal', () => {
    const user = createUserForTesting({
      resources: {
        '1': createUserResourceForTesting('v2.terminaltransactions.post'),
      },
    })

    expect(
      getDefaultTerminalId(location, createDepositAccountForTesting(), user)
    ).toBe('3')
  })
})
