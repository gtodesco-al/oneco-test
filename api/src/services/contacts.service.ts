import { FetchClient } from '@feathersjs/rest-client'
import { convert } from '@feathersjs/errors'

import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'
import { Contact } from '../schemas/types'

export type ContactService = ApiService<Contact, ContactPost> & {
  activate(contactId: string): Promise<Contact>
  update(contactId: string, payload: Contact): any
}

declare module '../declarations' {
  interface ServiceTypes {
    contacts: ContactService
  }
}

export { Contact }

export type ContactPost = Omit<
  Contact,
  | 'id'
  | 'last_name'
  | 'created_ts'
  | 'modified_ts'
  | 'email_trx_receipt'
  | 'header_message_type'
>

export const contacts = (app: Application) => {
  const service = app.service('contacts')

  service.activate = async function (this: FetchClient, contactId: string) {
    const { accessToken } = await app.get('authentication')

    return this.request(
      {
        body: {},
        url: `${this.base}/${contactId}/activate`,
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

  service.update = async function (
    this: FetchClient,
    contactId: string,
    payload: Contact
  ) {
    const { accessToken } = await app.get('authentication')

    return this.request(
      {
        body: payload,
        url: `${this.base}/${contactId}`,
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
      all: [paginationQuery(), mapResult()],
    },
  })
}
