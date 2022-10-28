import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { GatewayTransaction } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    'gateway-transactions': ApiService<GatewayTransaction>
  }
}

export { GatewayTransaction }

export const gatewayTransactions = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'gateway-transactions',
    connection.service(
      'reporting/summary/transactions/gateway'
    ) as ApiService<any>
  )

  app.service('gateway-transactions').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
