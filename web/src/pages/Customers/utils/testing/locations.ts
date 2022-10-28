import { Location } from '@fortis/api'

export const createLocationForTesting = (
  location: Partial<Location> = {}
): Location => ({
  id: '',
  created_ts: 0,
  modified_ts: 0,
  name: '',
  ...location,
})
