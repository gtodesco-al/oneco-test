import { DepositAccount } from '../../virtualTerminalTypes'

const baseAccount: DepositAccount = {
  id: '',
  payment_method: 'cc',
  title: '',
  vt_enable: true,
  default_transaction_type: 'credit',
  vt_enable_sales_tax: false,
  vt_override_sales_tax_allowed: false,
  ach_allow_credit: true,
  ach_allow_debit: true,
  industry_type: 'retail',
}

export const createDepositAccountForTesting = (
  props: Partial<DepositAccount> = {}
): DepositAccount => ({
  ...baseAccount,
  ...props,
})
