import { ServiceInterface } from '@feathersjs/feathers'
import { FetchClient } from '@feathersjs/rest-client'
import { convert } from '@feathersjs/errors'
import type { Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { CreditCardToken } from '../schemas/types'
import { Token } from './tokens.service'

declare module '../declarations' {
  interface ServiceTypes {
    //CreditCardToken type is incorrect in the schema, so this uses the standard Token type defined in the app
    'credit-card-tokens': ServiceInterface<Token>
  }
}

export { CreditCardToken }

export const creditCardTokens = (app: Application) => {
  const connection = app.get('connection')
  app.use('credit-card-tokens', connection.service('tokens/cc'))

  app.service('credit-card-tokens').update = async function (
    this: FetchClient,
    tokenId: string,
    payload: Token
  ) {
    const { accessToken } = await app.get('authentication')

    return this.request(
      {
        body: payload,
        url: `tokens/${tokenId}/cc`,
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'access-token': accessToken,
          ...app.get('headers'),
        },
      },
      {}
    ).catch((error: unknown) => {
      throw convert(error)
    })
  }

  app.service('credit-card-tokens').hooks({
    around: {
      all: [mapResult()],
    },
  })
}
