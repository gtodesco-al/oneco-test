import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createUserForTesting } from '../../../utils/testing/users'
import { createCustomerForTesting } from '../../../utils/testing/customers'
import { createLocationForTesting } from '../utils/testing/locations'
import { UnboundViewCustomer } from './ViewCustomer'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Customers/View Customer',
  component: UnboundViewCustomer,
  argTypes: {
    setShowActivationModal: {
      action: true,
    },
  },
} as ComponentMeta<typeof UnboundViewCustomer>

export const Default: ComponentStory<typeof UnboundViewCustomer> = (args) => (
  <MemoryRouter>
    <UnboundViewCustomer {...args} />
  </MemoryRouter>
)

Default.args = {
  user: createUserForTesting(),
  location: createLocationForTesting({ product_accountvault: {} }),
  customer: createCustomerForTesting({
    first_name: 'John',
    last_name: 'Smith',
    account_number: '12345678',
    date_of_birth: '11/11/2001',
    email: 'test@email.com',
    home_phone: '1-555-555-5555',
    cell_phone: '1-444-444-4444',
    address: {
      street: '123 Fake Street',
      city: 'New York',
      state: 'NY',
      country: 'US',
      postal_code: '12345',
    },
  }),
}
