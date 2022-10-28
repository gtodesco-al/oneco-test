import { ComponentMeta, ComponentStory } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { createCustomerForTesting } from '../../../utils/testing/customers'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import CustomerSelector from './CustomerSelector'

export default {
  title: 'Virtual Terminal/Customer Selector',
  component: CustomerSelector,
  argTypes: {
    onChange: {
      action: true,
    },
  },
} as ComponentMeta<typeof CustomerSelector>

const customers = [
  createCustomerForTesting({
    first_name: 'John',
    last_name: 'Doe',
    account_number: '12345',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'New York',
    },
    cell_phone: '1-000-000-0000',
    email: 'test@email.com',
    contact_api_id: '1',
  }),
  createCustomerForTesting({
    first_name: 'Jane',
    last_name: 'Doe',
    account_number: '54321',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'New York',
    },
    cell_phone: '1-000-000-0000',
    email: 'test@email.com',
    contact_api_id: '1',
  }),
]

export const NoCustomer: ComponentStory<typeof CustomerSelector> = (args) => (
  <I18nextProvider i18n={i18n}>
    <CustomerSelector {...args} />
  </I18nextProvider>
)

NoCustomer.args = {
  source: customers,
}

export const CustomerSelected = NoCustomer.bind({})

CustomerSelected.args = {
  user: createUserForPermissionTesting('v2.contacts.post'),
  customer: createCustomerForTesting({
    first_name: 'John',
    last_name: 'Smith',
    account_number: '12345',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'New York',
    },
    cell_phone: '1-000-000-0000',
    email: 'test@email.com',
    contact_api_id: '1',
  }),
}
