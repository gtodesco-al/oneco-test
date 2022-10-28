import { ServiceInterface } from '@feathersjs/feathers'
import { FetchClient } from '@feathersjs/rest-client'

import type { Application } from '../declarations'
import { mapResult } from '../hooks/map-result'

import { convert } from '@feathersjs/errors'
import { CreditCardToken, Token } from '../schemas/types'

export type { Token }

export type TokenService = ServiceInterface<CreditCardToken> & {
  activate(tokenId: string): Promise<CreditCardToken>
  update_ach(
    tokenId: string,
    payload: CreditCardToken
  ): Promise<CreditCardToken>
  update_cc(tokenId: string, payload: CreditCardToken): Promise<CreditCardToken>
}

declare module '../declarations' {
  interface ServiceTypes {
    tokens: TokenService
  }
}

export const tokens = (app: Application) => {
  const service = app.service('tokens')

  service.activate = async function (this: FetchClient, tokenId: string) {
    const { accessToken } = await app.get('authentication')

    return this.request(
      {
        body: {},
        url: `${this.base}/${tokenId}/activate`,
        method: 'PUT',
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

  service.update_ach = async function (
    this: FetchClient,
    tokenId: string,
    payload: Token
  ) {
    const { accessToken } = await app.get('authentication')

    return this.request(
      {
        body: payload,
        url: `${this.base}/${tokenId}/ach`,
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

  service.update_cc = async function (
    this: FetchClient,
    tokenId: string,
    payload: CreditCardToken
  ) {
    const { accessToken } = await app.get('authentication')

    return this.request(
      {
        body: payload,
        url: `${this.base}/${tokenId}/cc`,
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

  service.hooks({
    around: {
      all: [mapResult()],
    },
  })
}
