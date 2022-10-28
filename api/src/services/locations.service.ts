import type { Application } from '../declarations'
import { expandQuery } from '../hooks/expand-query'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'
import { Location } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    locations: ApiService<Location>
  }
}

export { Location }

export const locations = (app: Application) => {
  const service = app.service('locations')

  service.hooks({
    around: {
      all: [paginationQuery(), mapResult()],
      find: [expandQuery('terminals', 'product_transactions')],
      get: [expandQuery('terminals', 'product_transactions')],
    },
  })
}
