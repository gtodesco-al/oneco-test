import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createWalletItemForTesting } from '../../../utils/testing/wallet'
import { ViewACHAccount } from './ViewACHAccount'

export default {
  title: 'Customers/View ACH Account',
  component: ViewACHAccount,
} as ComponentMeta<typeof ViewACHAccount>

export const Default: ComponentStory<typeof ViewACHAccount> = (args) => (
  <div className="bg-white p-4 w-[40rem]">
    <ViewACHAccount {...args} />
  </div>
)

Default.args = {
  account: createWalletItemForTesting({
    title: 'Test Title',
    account_holder_name: 'John Smith',
    ach_sec_code: 'PPD',
    account_type: 'checking',
    routing_number: '12345',
    account_number: '5534131',
    billing_address: {
      street: '123 Test Street',
      city: 'New York',
      state: 'NY',
      postal_code: '12345',
    },
  }),
}
