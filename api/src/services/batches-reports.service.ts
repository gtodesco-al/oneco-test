import { FetchClient } from '@feathersjs/rest-client/lib'
import { convert } from '@feathersjs/errors'

import type { ApiService, Application } from '../declarations'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'

export type BatchesReportsService = ApiService<any> & {
  close(batchID: string): Promise<any>
}

declare module '../declarations' {
  interface ServiceTypes {
    'batches-reports': BatchesReportsService
  }
}

export const batchesReports = (app: Application) => {
  const connection = app.get('connection')
  app.use(
    'batches-reports',
    connection.service('batches') as BatchesReportsService
  )

  const service = app.service('batches-reports')

  service.close = async function (this: FetchClient, batchID: string) {
    const { accessToken } = await app.get('authentication')
    return this.request(
      {
        url: `${this.base}/${batchID}/settle`,
        method: 'PUT',
        headers: {
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
