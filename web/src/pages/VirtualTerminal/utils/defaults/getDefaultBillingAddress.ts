import { DepositAccount, ProcessMethod } from '../../virtualTerminalTypes'

export const getDefaultBillingAddress = (
  account: DepositAccount | undefined,
  processMethod: ProcessMethod
) => {
  if (account === undefined || processMethod !== 'manual') {
    return undefined
  }

  return {
    city: '',
    state: '',
    street: account.vt_street ? '' : undefined,
    postal_code: account.vt_zip ? '' : undefined,
    phone: account.vt_billing_phone ? '' : undefined,
  }
}
