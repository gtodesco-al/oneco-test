import { Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'
import { SalesTax } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    'sales-taxes': ApiService<SalesTax>
  }
}

export const salesTaxes = (app: Application) => {
  const service = app.service('sales-taxes')
  service.hooks({
    around: {
      all: [paginationQuery(), mapResult()],
    },
  })
}
