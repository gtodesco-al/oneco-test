import type { ApiService, Application } from '../declarations'
import { expandQuery } from '../hooks/expand-query'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'

declare module '../declarations' {
  interface ServiceTypes {
    'recurring-billing-declines-reports': ApiService<any>
  }
}

export const recurringBillingDeclinesReports = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'recurring-billing-declines-reports',
    connection.service(
      'reporting/reports/recurring-billing-declines'
    ) as ApiService<any>
  )

  app.service('recurring-billing-declines-reports').hooks({
    around: {
      all: [paginationQuery(), mapResult()],
      find: [expandQuery('recurring')],
    },
  })
}
