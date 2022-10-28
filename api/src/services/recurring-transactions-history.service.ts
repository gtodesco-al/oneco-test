import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { RecurringTransactionsHistory } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    'recurring-transactions-history': ApiService<RecurringTransactionsHistory>
  }
}

export { RecurringTransactionsHistory }

export const recurringTransactionsHistory = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'recurring-transactions-history',
    connection.service(
      'reporting/summary/transactions/recurring/history'
    ) as ApiService<any>
  )

  app.service('recurring-transactions-history').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
