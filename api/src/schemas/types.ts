import type { FromSchema } from '@feathersjs/schema'
import type { OpenApiSpec } from './types.oas'

export type RecurringBillingDecline = FromSchema<
  OpenApiSpec['responseReportingSummaryTransactionsRecurringDeclinedsCollection']['properties']['list']['items']
>

export type Resource = {
  id: number
  title: string
  priv: string
  resource_name: string
  last_used_date: string | null
  created_ts: number
  modified_ts: number
}

export type User = FromSchema<
  OpenApiSpec['responseUser']['properties']['data']
> & {
  resources?: {
    [key: string]: Resource
  }
}

export type Transaction = FromSchema<
  OpenApiSpec['responseTransaction']['properties']['data']
>

export type DataTypes = {
  'transactions/cc/auth-only/keyed': FromSchema<
    OpenApiSpec['/v1/transactions/cc/auth-only/keyed']
  >
  'transactions/cc/avs-only/keyed': FromSchema<
    OpenApiSpec['/v1/transactions/cc/avs-only/keyed']
  >
  'transactions/cc/force/keyed': FromSchema<
    OpenApiSpec['/v1/transactions/cc/force/keyed']
  >
  'transactions/cc/refund/keyed': FromSchema<
    OpenApiSpec['/v1/transactions/cc/refund/keyed']
  >
  'transactions/cc/sale/keyed': FromSchema<
    OpenApiSpec['/v1/transactions/cc/sale/keyed']
  >
  'transactions/ach/credit/keyed': FromSchema<
    OpenApiSpec['/v1/transactions/ach/credit/keyed']
  >
  'transactions/ach/debit/keyed': FromSchema<
    OpenApiSpec['/v1/transactions/ach/debit/keyed']
  >
  'transactions/cc/sale/token': FromSchema<
    OpenApiSpec['/v1/transactions/cc/sale/token']
  >
}

export type CreditCardTransactionData =
  DataTypes['transactions/cc/auth-only/keyed']

export type ACHTransactionData = DataTypes['transactions/ach/credit/keyed']

export interface BillingAddress {
  street?: string
  city?: string
  state?: string
  postal_code?: string
  phone?: string
}

//Transaction post types need to be defined manually due to issues with schema
export type SECCode = 'PPD' | 'TEL' | 'WEB' | 'CCD'

/**
 * Used for terminal transactions
 */
export interface TerminalTransactionResponse {
  async: {
    code: string
    link: string
  }
}

export type CreditCardToken = FromSchema<
  OpenApiSpec['responseToken']['properties']['data']
> & {
  exp_date?: string
  routing_number?: string
}

export type Token = CreditCardToken

// const token: Token = {} as any

// token.active

export type SettledTransaction = FromSchema<
  OpenApiSpec['responseReportingSummaryTransactionsSettledsCollection']['properties']['list']['items']
>

export type RecurringTransactionsHistory = FromSchema<
  OpenApiSpec['responseReportingSummaryTransactionsRecurringHistorysCollection']['properties']['list']['items']
>

export type RecurringTransactionsForecast = FromSchema<
  OpenApiSpec['responseReportingSummaryTransactionsRecurringForecastsCollection']['properties']['list']['items']
>

export type Location = FromSchema<
  OpenApiSpec['responseLocation']['properties']['data']
>

export type GatewayTransaction = FromSchema<
  OpenApiSpec['responseReportingSummaryTransactionsGatewaysCollection']['properties']['list']['items']
>

export type Contact = FromSchema<
  OpenApiSpec['responseContact']['properties']['data']
>

export type Chargeback = FromSchema<
  OpenApiSpec['responseReportingSummaryTransactionsChargebacksCollection']['properties']['list']['items']
>

export type ACHReject = FromSchema<
  OpenApiSpec['responseReportingSummaryTransactionsAchRejectsCollection']['properties']['list']['items']
>

export type AsyncStatus = FromSchema<
  OpenApiSpec['responseAsyncStatus']['properties']['data']
>

export type RoutingNumber = FromSchema<
  OpenApiSpec['responseRoutingNumber']['properties']['data']
>

export type SalesTax = FromSchema<
  OpenApiSpec['responseSalesTax']['properties']['data']
>
