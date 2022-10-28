import { FetchClient } from '@feathersjs/rest-client/lib'
import { convert } from '@feathersjs/errors'

import { expandQuery } from '../hooks/expand-query'
import { mapResult } from '../hooks/map-result'
import { paginationQuery } from '../hooks/pagination-query'
import {
  CreditCardTransactionData,
  DataTypes,
  Transaction,
  TerminalTransactionResponse,
} from '../schemas/types'

import type { ApiService, Application, ServiceTypes } from '../declarations'

export type TransactionsService = ApiService<Transaction> & {
  void(transactionID: string, description: string | null): Promise<Transaction>
}

declare module '../declarations' {
  interface ServiceTypes {
    transactions: TransactionsService
    'transaction-cc-authonly': ApiService<
      Transaction,
      DataTypes['transactions/cc/auth-only/keyed']
    >
    'transaction-cc-avsonly': ApiService<
      Transaction,
      DataTypes['transactions/cc/avs-only/keyed']
    >
    'transaction-cc-force': ApiService<
      Transaction,
      DataTypes['transactions/cc/force/keyed']
    >
    'transaction-cc-refund': ApiService<
      Transaction,
      DataTypes['transactions/cc/refund/keyed']
    >
    'transaction-cc-sale': ApiService<
      Transaction,
      DataTypes['transactions/cc/sale/keyed']
    >

    'transaction-cc-authonly-token': ApiService<
      Transaction,
      DataTypes['transactions/cc/sale/token']
    >
    'transaction-cc-avsonly-token': ApiService<
      Transaction,
      DataTypes['transactions/cc/sale/token']
    >
    'transaction-cc-force-token': ApiService<
      Transaction,
      DataTypes['transactions/cc/sale/token']
    >
    'transaction-cc-refund-token': ApiService<
      Transaction,
      DataTypes['transactions/cc/sale/token']
    >
    'transaction-cc-sale-token': ApiService<
      Transaction,
      DataTypes['transactions/cc/sale/token']
    >

    'transaction-ach-debit-token': ApiService<
      Transaction,
      DataTypes['transactions/cc/sale/token']
    >

    'transaction-ach-credit-token': ApiService<
      Transaction,
      DataTypes['transactions/cc/sale/token']
    >

    'transaction-cc-authonly-terminal': ApiService<
      TerminalTransactionResponse,
      CreditCardTransactionData
    >
    'transaction-cc-avsonly-terminal': ApiService<
      TerminalTransactionResponse,
      CreditCardTransactionData
    >
    'transaction-cc-force-terminal': ApiService<
      TerminalTransactionResponse,
      CreditCardTransactionData
    >
    'transaction-cc-refund-terminal': ApiService<
      TerminalTransactionResponse,
      CreditCardTransactionData
    >
    'transaction-cc-sale-terminal': ApiService<
      TerminalTransactionResponse,
      CreditCardTransactionData
    >

    'transaction-ach-credit': ApiService<
      Transaction,
      DataTypes['transactions/ach/credit/keyed']
    >

    'transaction-ach-debit': ApiService<
      Transaction,
      DataTypes['transactions/ach/debit/keyed']
    >
  }
}

export { Transaction, CreditCardTransactionData, DataTypes }

export const transactions = (app: Application) => {
  const connection = app.get('connection')
  const service = app.service('transactions')

  service.hooks({
    around: {
      all: [paginationQuery(), mapResult()],
      get: [expandQuery('product_transaction', 'transaction_histories', 'is_voidable')],
    },
  })

  const addPostService = (path: keyof ServiceTypes, endpoint: string) => {
    app.use(path, connection.service(endpoint) as any)

    app.service(path).hooks({
      around: {
        all: [mapResult()],
      },
    })
  }

  addPostService('transaction-cc-authonly', 'transactions/cc/auth-only/keyed')

  addPostService('transaction-cc-avsonly', 'transactions/cc/avs-only/keyed')
  addPostService('transaction-cc-force', 'transactions/cc/force/keyed')
  addPostService('transaction-cc-refund', 'transactions/cc/refund/keyed')
  addPostService('transaction-cc-sale', 'transactions/cc/sale/keyed?expand=is_voidable')

  addPostService(
    'transaction-cc-authonly-terminal',
    'transactions/cc/auth-only/terminal'
  )
  addPostService(
    'transaction-cc-avsonly-terminal',
    'transactions/cc/avs-only/terminal'
  )
  addPostService(
    'transaction-cc-force-terminal',
    'transactions/cc/force/terminal'
  )
  addPostService(
    'transaction-cc-refund-terminal',
    'transactions/cc/refund/terminal'
  )
  addPostService(
    'transaction-cc-sale-terminal',
    'transactions/cc/sale/terminal'
  )

  addPostService(
    'transaction-cc-authonly-token',
    'transactions/cc/auth-only/token'
  )
  addPostService(
    'transaction-cc-avsonly-token',
    'transactions/cc/avs-only/token'
  )

  addPostService('transaction-cc-force-token', 'transactions/cc/force/token')
  addPostService('transaction-cc-refund-token', 'transactions/cc/refund/token')
  addPostService('transaction-cc-sale-token', 'transactions/cc/sale/token')
  addPostService(
    'transaction-ach-credit-token',
    'transactions/ach/credit/token'
  )
  addPostService('transaction-ach-debit-token', 'transactions/ach/debit/token')

  addPostService('transaction-ach-credit', 'transactions/ach/credit/keyed')
  addPostService('transaction-ach-debit', 'transactions/ach/debit/keyed')

  service.void = async function (this: FetchClient, transactionID: string, description: string | null = null) {
    const { accessToken } = await app.get('authentication')
    return this.request(
      {
        url: `${this.base}/${transactionID}/void`,
        method: 'PATCH',
        headers: {
          'access-token': accessToken,
          ...app.get('headers'),
        },
        body: {
          description
        }
      },
      {}
    ).catch((error: unknown) => {
      throw convert(error)
    })
  }
}
