import {
  BillingAddress,
  Location,
  CreditCardTransactionData,
  User,
} from '@fortis/api'

/**
 * The types for the VT aren't currently complete in the API, so this provides some placeholders while they're fleshed out.
 */

export type PaymentMethod = 'cc' | 'ach'

export type TransactionType =
  | 'sale'
  | 'authonly'
  | 'avsonly'
  | 'force'
  | 'refund'
  | 'debit'
  | 'credit'

export type ProcessMethod = 'manual' | 'terminal' | 'wallet'

export interface Surcharge {
  surcharge_fee?: number
  surcharge_rate?: number
  min_fee_amount?: number
  max_fee_amount?: number
  refund_surcharges?: boolean
  surcharge_label?: string
  apply_to_user_type_id?: User['user_type_id']
}

export interface DepositAccount {
  id: string
  payment_method: PaymentMethod
  title: string
  vt_enable: boolean
  vt_enable_tip?: boolean
  vt_enable_sales_tax?: boolean
  vt_override_sales_tax_allowed?: boolean
  vt_street?: boolean
  vt_require_street?: boolean
  vt_zip?: boolean
  vt_require_zip?: boolean
  vt_billing_phone?: boolean
  vt_clerk_number?: boolean
  vt_order_number?: boolean
  vt_show_custom_fields?: boolean
  vt_cvv?: boolean
  default_transaction_type: TransactionType
  ach_allow_debit?: boolean
  ach_allow_credit?: boolean
  industry_type: string
  partner?: string
  surcharge?: Surcharge
  tax_surcharge_config?: 2 | 3
  location_api_id?: string
}

export interface Terminal {
  id: string
  title: string
  terminal_manufacturer_id: string
}

export interface LocationWithDepositAccounts extends Location {
  product_transactions?: DepositAccount[]
  terminals?: Terminal[]
}

export type AccountType = 'personal' | 'business'
export { BillingAddress }

export type VirtualTerminalTransaction = CreditCardTransactionData
