import type { ApiService, Application } from '../declarations'
import { expandQuery } from '../hooks/expand-query'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'

declare module '../declarations' {
  interface ServiceTypes {
    'ach-rejects-reports': ApiService<any>
  }
}

export const achRejectsReports = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'ach-rejects-reports',
    connection.service('reporting/reports/ach-rejects') as ApiService<any>
  )

  app.service('ach-rejects-reports').hooks({
    around: {
      all: [paginationQuery(), mapResult()],
      find: [expandQuery('transaction_history')],
    },
  })
}
