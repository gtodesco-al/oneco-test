import type { Application } from '../declarations'
import { expandQuery } from '../hooks/expand-query'
import { mapResult } from '../hooks/map-result'
import { User } from '../schemas/types'

declare module '../declarations' {
  interface ServiceTypes {
    users: ApiService<User>
  }
}

export { User }

export const users = (app: Application) => {
  const service = app.service('users')

  // Hooks for all methods
  service.hooks({
    around: {
      all: [mapResult()],
      get: [expandQuery('resources')],
    },
  })
}
