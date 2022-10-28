import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'

declare module '../declarations' {
  interface ServiceTypes {
    'chargebacks-reports': ApiService<any>
  }
}

export const chargebackReports = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'chargebacks-reports',
    connection.service('reporting/reports/chargebacks') as ApiService<any>
  )

  app.service('chargebacks-reports').hooks({
    around: {
      all: [paginationQuery(), mapResult()],
    },
  })
}
