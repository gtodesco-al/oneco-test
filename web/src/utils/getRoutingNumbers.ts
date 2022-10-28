import { api } from '../api'

/**
 * Provides a simple service for providing and filtering routing numbers for the typeahead.
 */
export const getRoutingNumbers = async (partialNumber: string) => {
  const numberRecords = await api.service('routing-numbers').find({
    query: {
      'filter[routing]': `"${partialNumber}"`,
    },
  })

  return numberRecords.map((r) => r.routing)
}
