import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import type { ACHReject } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    'ach-rejects': ApiService<ACHReject>
  }
}

export { ACHReject }

export const achRejects = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'ach-rejects',
    connection.service(
      'reporting/summary/transactions/ach-reject'
    ) as ApiService<any>
  )

  app.service('ach-rejects').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
