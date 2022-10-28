import { ServiceInterface } from '@feathersjs/feathers'
import { FetchClient } from '@feathersjs/rest-client'

import { convertError } from '../hooks/on-error'
import type { Application } from '../declarations'

export type PasswordReset = {
  id: string
  username: string
  password: string
  terms_condition_code: string
  email: string
  code: string
  newPassword: string
  url: string
}

export type StatusMessage = {
  type: string
  data: {
    ok: boolean
  }
}

export type PasswordResetService = ServiceInterface<PasswordReset> & {
  check_code(email: string, code: string): Promise<StatusMessage>
  create_code(email: string): Promise<StatusMessage>
  update_password(
    email: string,
    code: string,
    new_password: string
  ): Promise<StatusMessage>
  reset_password(
    email: string,
    password: string,
    terms_condition_code: string,
    url: string
  ): Promise<StatusMessage>
}

declare module '../declarations' {
  interface ServiceTypes {
    'public/users': PasswordResetService
  }
}

export const passwordResetCode = (app: Application) => {
  const service = app.service('public/users')
  const handleError = (error: unknown) => {
    const converted = convertError(error)

    app.emit('apiError', converted)
    throw converted
  }

  service.check_code = async function (
    this: FetchClient,
    email: string,
    code: string
  ) {
    return this.request(
      {
        body: { email, code },
        url: `${this.base}/password-reset-code`,
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          //'access-token': accessToken,
          ...app.get('headers'),
        },
      },
      {}
    ).catch(handleError)
  }

  service.create_code = async function (this: FetchClient, email: string) {
    return this.request(
      {
        body: { email },
        url: `${this.base}/password-reset-code`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // 'access-token': accessToken,
          ...app.get('headers'),
        },
      },
      {}
    ).catch(handleError)
  }

  service.update_password = async function (
    this: FetchClient,
    email: string,
    code: string,
    new_password: string
  ) {
    return this.request(
      {
        body: { email, code, new_password },
        url: `${this.base}/password-reset-code`,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          //'access-token': accessToken,
          ...app.get('headers'),
        },
      },
      {}
    ).catch(handleError)
  }
}
