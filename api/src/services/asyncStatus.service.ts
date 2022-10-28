import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { AsyncStatus } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    'async-status': ApiService<AsyncStatus>
  }
}

export { AsyncStatus }

export const asyncStatus = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'async-status',
    connection.service('async/status') as ApiService<AsyncStatus>
  )

  app.service('async-status').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
