import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { RecurringBillingDecline } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    'recurring-billing-declines': ApiService<RecurringBillingDecline>
  }
}

export { RecurringBillingDecline }

export const recurringBillingDeclines = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'recurring-billing-declines',
    connection.service(
      'reporting/summary/transactions/recurring/declined'
    ) as ApiService<any>
  )

  app.service('recurring-billing-declines').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
