import { Contact } from '@fortis/api/src/services/contacts.service'

export const createCustomerForTesting = (
  props: Partial<Contact> = {}
): Contact => ({
  id: '',
  last_name: '',
  created_ts: 0,
  modified_ts: 0,
  active: true,
  location_id: '',
  email_trx_receipt: false,
  header_message_type: 0,
  ...props,
})
