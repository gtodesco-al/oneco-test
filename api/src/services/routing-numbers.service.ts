import { Application } from '../declarations'
import { RoutingNumber } from '../schemas/types'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'

declare module '../declarations' {
  interface ServiceTypes {
    'routing-numbers': ApiService<RoutingNumber>
  }
}

export const routingNumbers = (app: Application) => {
  const service = app.service('routing-numbers')
  service.hooks({
    around: {
      all: [paginationQuery(), mapResult()],
    },
  })
}
