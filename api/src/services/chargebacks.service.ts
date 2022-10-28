import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { Chargeback } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    chargebacks: ApiService<Chargeback>
  }
}

export { Chargeback }

export const chargebacks = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'chargebacks',
    connection.service(
      'reporting/summary/transactions/chargeback'
    ) as ApiService<any>
  )

  app.service('chargebacks').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
