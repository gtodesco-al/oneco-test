import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createWalletItemForTesting } from '../../../utils/testing/wallet'
import { ViewCreditCard } from './ViewCreditCard'

export default {
  title: 'Customers/View Credit Card',
  component: ViewCreditCard,
} as ComponentMeta<typeof ViewCreditCard>

export const Default: ComponentStory<typeof ViewCreditCard> = (args) => (
  <div className="bg-white p-4 w-[40rem]">
    <ViewCreditCard {...args} />
  </div>
)

Default.args = {
  card: createWalletItemForTesting({
    title: 'Test Title',
    account_holder_name: 'John Smith',
    account_type: 'visa',
    last_four: '1234',
    exp_date: '1123',
    billing_address: {
      street: '123 Test Street',
      city: 'New York',
      state: 'NY',
      postal_code: '12345',
    },
  }),
}
