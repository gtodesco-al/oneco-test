import { Token } from '@fortis/api/src/services/tokens.service'

export const createWalletItemForTesting = (item: Partial<Token> = {}): Token =>
  ({
    title: '',
    account_holder_name: '',
    billing_address: {
      state: '',
      city: '',
      street: '',
      postal_code: '',
    },
    contact_id: '',
    location_id: '',
    account_number: '',
    ...item,
  } as any)
