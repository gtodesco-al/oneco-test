import { ComponentMeta, ComponentStory } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { createCustomerForTesting } from '../../../utils/testing/customers'
import CustomerPanel from './CustomerPanel'

export default {
  title: 'Virtual Terminal/Customer Panel',
  component: CustomerPanel,
} as ComponentMeta<typeof CustomerPanel>

export const Default: ComponentStory<typeof CustomerPanel> = (args) => (
  <I18nextProvider i18n={i18n}>
    <CustomerPanel {...args} />
  </I18nextProvider>
)

Default.args = {
  customer: createCustomerForTesting({
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'New York',
    },
    email: 'test@email.com',
    cell_phone: '1-000-000-0000',
  }),
}

export const WithAPIId = Default.bind({})

WithAPIId.args = {
  customer: createCustomerForTesting({
    ...Default.args.customer,
    contact_api_id: '1234567890',
  }),
}
