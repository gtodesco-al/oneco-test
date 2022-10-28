import { LocationWithDepositAccounts } from '../../virtualTerminalTypes'

const baseLocation: LocationWithDepositAccounts = {
  created_ts: 0,
  id: '',
  modified_ts: 0,
  name: '',
  parent_id: '',
  terminals: [],
}

export const createLocationForTesting = (
  props: Partial<LocationWithDepositAccounts> = {}
): LocationWithDepositAccounts => ({
  ...baseLocation,
  ...props,
})
