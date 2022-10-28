import { ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { Token } from './tokens.service'

declare module '../declarations' {
  interface ServiceTypes {
    'ach-tokens': ServiceInterface<Token>
  }
}

export const achTokens = (app: Application) => {
  const connection = app.get('connection')
  app.use('ach-tokens', connection.service('tokens/ach'))

  app.service('ach-tokens').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
