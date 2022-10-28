import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'
import { SettledTransaction } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    'settled-transactions': ApiService<SettledTransaction>
  }
}

export { SettledTransaction }

export const settledTransactions = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'settled-transactions',
    connection.service(
      'reporting/summary/transactions/settled'
    ) as ApiService<any>
  )

  app.service('settled-transactions').hooks({
    around: {
      all: [paginationQuery(), mapResult()],
    },
  })
}
