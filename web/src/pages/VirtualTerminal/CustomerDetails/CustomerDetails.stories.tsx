import { ComponentMeta, ComponentStory } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { createCustomerForTesting } from '../../../utils/testing/customers'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import CustomerDetails from './CustomerDetails'

export default {
  title: 'Virtual Terminal/Customer Details',
  component: CustomerDetails,
  argTypes: {
    onChange: { action: true },
    onAddNew: { action: true },
    onClickOpen: { action: true },
  },
} as ComponentMeta<typeof CustomerDetails>

export const Default: ComponentStory<typeof CustomerDetails> = (args) => (
  <div className="bg-white p-6">
    <I18nextProvider i18n={i18n}>
      <CustomerDetails {...args} />
    </I18nextProvider>
  </div>
)

Default.args = {
  user: createUserForPermissionTesting('v2.contacts.post'),
  customer: createCustomerForTesting({
    first_name: 'John',
    last_name: 'Smith',
    account_number: '12345',
  }),
  source: [],
  isOpen: true,
}

export const Closed = Default.bind({})

Closed.args = {
  ...Default.args,
  isOpen: false,
}
