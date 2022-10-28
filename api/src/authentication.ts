import { NotAuthenticated } from '@feathersjs/errors'
import { FetchClient } from '@feathersjs/rest-client'
import authenticationClient, {
  Storage,
} from '@feathersjs/authentication-client'

import { Application } from './declarations'

export { Storage }

export type AuthenticationRequest = {
  strategy?: string
  username: string
  password: string
}

export class AuthenticationService {
  constructor(public app: Application) {}

  async create(data: AuthenticationRequest) {
    if (data.strategy === 'token') {
      return data
    }

    try {
      const { data: token } = await this.app.service('users/login').create({
        ...data,
      })
      return { token, accessToken: token.access_token }
    } catch (e: any) {
      throw new NotAuthenticated(e.message)
    }
  }

  async remove(accessToken: string) {
    return { accessToken }
  }
}

export const authentication = (storage?: Storage) => (app: Application) => {
  app.use('authentication', new AuthenticationService(app))
  app.configure(
    authenticationClient({
      storageKey: 'token',
      header: 'access-token',
      jwtStrategy: 'token',
      scheme: '',
      ...(storage && { storage }),
    })
  )
}

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
    'users/login': FetchClient
  }
}
