import type { ApiService, Application } from '../declarations'
import { expandQuery } from '../hooks/expand-query'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'
// import { GatewayTransactionsReport } from '../schemas/gateway-transactions-report.schema'

declare module '../declarations' {
  interface ServiceTypes {
    'gateway-transactions-reports': ApiService<any>
    // 'gateway-transactions-reports': ApiService<GatewayTransactionsReport>
  }
}

// export { GatewayTransactionsReport }

export const gatewayTransactionsReports = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'gateway-transactions-reports',
    connection.service('transactions') as ApiService<any>
  )

  app.service('gateway-transactions-reports').hooks({
    around: {
      all: [paginationQuery(), mapResult()],
      find: [expandQuery('contact', 'product_transaction', 'quick_invoice')],
    },
  })
}
