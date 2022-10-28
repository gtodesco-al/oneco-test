import { ServiceInterface } from '@feathersjs/feathers'
import { FetchClient } from '@feathersjs/rest-client'

import { convertError } from '../hooks/on-error'
import type { Application } from '../declarations'

export type DepositReports = {
  date_effective_ts: number;
  bank_account_number: string;
  amount: number;
  merchant_name: string;
}

export type StatusMessage = {
  type: string,
  data: {
    ok: boolean
  }
}

export type ReportsService = ServiceInterface<DepositReports> & {
  get_deposits (): Promise<StatusMessage> 
}

declare module '../declarations' {
  interface ServiceTypes {
    'reporting/reports': ReportsService
  }
}

export const passwordResetCode = (app: Application) => {
  const service = app.service('reporting/reports')
  const handleError = (error: unknown) => {
    const converted = convertError(error)
    
    app.emit('apiError', converted)
    throw converted
  }

  service.get_deposits = async function (this: FetchClient) {
    return this.request({
        body: {},
        url: `${this.base}/deposits`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          //'access-token': accessToken,
          ...app.get('headers')
        }
      }, {}).catch(handleError)
  }
}
