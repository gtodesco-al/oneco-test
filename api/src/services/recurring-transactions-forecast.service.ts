import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { RecurringTransactionsForecast } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    'recurring-transactions-forecast': ApiService<RecurringTransactionsForecast>
  }
}

export { RecurringTransactionsForecast }

export const recurringTransactionsForecast = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'recurring-transactions-forecast',
    connection.service(
      'reporting/summary/transactions/recurring/forecast'
    ) as ApiService<any>
  )

  app.service('recurring-transactions-forecast').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
