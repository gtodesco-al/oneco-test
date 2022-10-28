import { Token } from '@fortis/api/src/services/tokens.service'
import { omit } from 'lodash'
import { api } from '../../../../api'
import { PaymentMethod } from '../../../VirtualTerminal/virtualTerminalTypes'

export const getWalletByCustomerId = async (
  customerId: string,
  excludeInactive = false,
  paymentMethod: PaymentMethod = 'cc'
) => {
  const service = api.service('tokens')

  const wallet = await service.find({
    query: Object.assign(
      {
        'filter[contact_id]': customerId,
        'filter[payment_method]': paymentMethod,
        'page[size]': 100, //arbitrary large value to ensure fetching all records
      },
      excludeInactive ? {} : { 'filter[active]': '0,1' }
    ),
  })

  return wallet as Token[]
}

export const updateCreditCard = async (card: Token) =>
  api
    .service('tokens')
    .update_cc(
      card.id ?? '',
      omit(card, [
        'id',
        'payment_method',
        'first_six',
        'last_four',
        'account_type',
        'created_ts',
        'modified_ts',
        'expiring_in_months',
        'has_recurring',
        'active',
        'cau_summary_status_id',
        'cau_last_updated_ts',
        'routing_number',
        'token_api_id',
      ]) as Token
    )

export const updateACH = async (account: Token) =>
  api
    .service('tokens')
    .update_ach(
      account.id ?? '',
      omit(account, [
        'id',
        'payment_method',
        'first_six',
        'last_four',
        'account_type',
        'created_ts',
        'modified_ts',
        'expiring_in_months',
        'exp_date',
        'has_recurring',
        'active',
        'cau_summary_status_id',
        'cau_last_updated_ts',
        'routing_number',
        'token_api_id',
      ]) as Token
    )

export const deactivateWalletItem = async (item: Token) =>
  api.service('tokens').remove(item.id ?? '')

export const activateWalletItem = async (item: Token) =>
  api.service('tokens').activate(item.id ?? '')
