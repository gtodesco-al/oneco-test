import { feathers } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'

import { authentication, Storage } from './authentication'
import { Application } from './declarations'

import { onError } from './hooks/on-error'
import { refreshToken } from './hooks/refresh-token'
import { setHeaders } from './hooks/set-headers'
import { services } from './services/index'

export * from '@feathersjs/errors'
export * from '@feathersjs/schema'

export * from './schemas/types'
export * from './schemas/schemas'

type InitOptions = {
  root: string
  fetch: any
  apiDomain: string
  developerId: string
  storage?: Storage
}

export const init = ({
  root,
  fetch,
  developerId,
  apiDomain,
  storage,
}: InitOptions) => {
  const client = rest(root)
  const app: Application = feathers()

  app.set('headers', {
    'developer-id': developerId,
  })
  app.set('apiDomain', apiDomain)

  const connection = client.fetch(fetch)
  app.set('connection', connection)
  app.configure(connection)

  app.configure(authentication(storage))
  app.configure(services)
  app.hooks([setHeaders()])
  app.hooks({
    after: {
      all: [refreshToken],
    },
    error: {
      all: [onError],
    },
  })
  return app
}
