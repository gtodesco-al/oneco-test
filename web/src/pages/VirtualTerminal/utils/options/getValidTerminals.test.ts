import { User } from '@fortis/api'
import {
  DepositAccount,
  LocationWithDepositAccounts,
} from '../../virtualTerminalTypes'
import { createDepositAccountForTesting } from '../testing/depositAccounts'
import { createLocationForTesting } from '../testing/locations'
import {
  createUserForTesting,
  createUserResourceForTesting,
} from '../../../../utils/testing/users'
import { getValidTerminals } from './getValidTerminals'

describe('getValidTerminals', () => {
  interface TestProps {
    location: LocationWithDepositAccounts
    account: DepositAccount
    user: User
  }

  const fakeTerminal = {
    id: '1',
    title: 'terminal 1',
    terminal_manufacturer_id: '100',
  }

  const bluetoothTerminal = {
    id: '2',
    title: 'terminal 2',
    terminal_manufacturer_id: '4',
  }

  const validTerminal = {
    id: '3',
    title: 'terminal 3',
    terminal_manufacturer_id: '',
  }

  //Test defaults to valid args so that tests can easily check against individual invalid values
  const getTerminals = ({
    location = createLocationForTesting({
      terminals: [fakeTerminal, bluetoothTerminal, validTerminal],
    }),
    account = createDepositAccountForTesting({ payment_method: 'cc' }),
    user = createUserForTesting({
      resources: {
        '1': createUserResourceForTesting('v2.terminaltransactions.post'),
      },
    }),
  }: Partial<TestProps> = {}) => getValidTerminals(location, account, user)

  test('includes no terminals if account is ACH', () => {
    expect(
      getTerminals({
        account: createDepositAccountForTesting({ payment_method: 'ach' }),
      })
    ).toHaveLength(0)
  })

  test('includes no terminals if deposit account industry_type is moto', () => {
    expect(
      getTerminals({
        account: createDepositAccountForTesting({
          payment_method: 'cc',
          industry_type: 'moto',
        }),
      })
    ).toHaveLength(0)
  })

  test('includes no terminals if deposit account industry_type is ecommerce', () => {
    expect(
      getTerminals({
        account: createDepositAccountForTesting({
          payment_method: 'cc',
          industry_type: 'ecommerce',
        }),
      })
    ).toHaveLength(0)
  })

  test('includes no terminals if user has no permissions', () => {
    expect(getTerminals({ user: createUserForTesting() })).toHaveLength(0)
  })

  test('includes only terminals that are bluetooth or fake', () => {
    expect(getTerminals()).toEqual([validTerminal])
  })

  test('includes only non-bluetooth and non-fake terminals if user has v2.terminaltransactions.post', () => {
    expect(
      getTerminals({
        user: createUserForTesting({
          resources: {
            '1': createUserResourceForTesting('v2.terminaltransactions.post'),
          },
        }),
      })
    ).not.toHaveLength(0)
  })

  test('includes only non-bluetooth and non-fake terminals if user has v2.routertransactions.post', () => {
    expect(
      getTerminals({
        user: createUserForTesting({
          resources: {
            '1': createUserResourceForTesting('v2.routertransactions.post'),
          },
        }),
      })
    ).not.toHaveLength(0)
  })
})
