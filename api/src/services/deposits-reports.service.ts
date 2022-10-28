import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'

declare module '../declarations' {
  interface ServiceTypes {
    'deposits-reports': ApiService<any>
  }
}

export const depositsReports = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'deposits-reports',
    connection.service('reporting/reports/deposits') as ApiService<any>
  )

  app.service('deposits-reports').hooks({
    around: {
      all: [paginationQuery(), mapResult()],
    },
  })
}
