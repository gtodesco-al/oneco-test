import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createUserForTesting } from '../../../utils/testing/users'
import { createWalletItemForTesting } from '../../../utils/testing/wallet'
import { UnboundWallet } from './Wallet'

export default {
  title: 'Customers/Wallet',
  component: UnboundWallet,
  argTypes: {
    onToggleShowActive: {
      action: true,
    },
    onClickEdit: {
      action: true,
    },
  },
} as ComponentMeta<typeof UnboundWallet>

const Template: ComponentStory<typeof UnboundWallet> = (args) => (
  <UnboundWallet {...args} />
)

export const Default = Template.bind({})

Default.args = {
  user: createUserForTesting(),
  items: [
    createWalletItemForTesting({
      id: '1',
      active: true,
      payment_method: 'cc',
      account_type: 'visa',
      last_four: '1234',
      expiring_in_months: -2,
    }),
    createWalletItemForTesting({
      id: '2',
      active: true,
      payment_method: 'cc',
      account_type: 'mc',
      last_four: '4321',
      expiring_in_months: 3,
    }),
    createWalletItemForTesting({
      id: '2',
      active: true,
      payment_method: 'cc',
      account_type: 'mc',
      last_four: '9823',
      expiring_in_months: 12,
    }),
    createWalletItemForTesting({
      id: '3',
      active: true,
      payment_method: 'ach',
      account_type: 'savings',
      last_four: '5678',
    }),
    createWalletItemForTesting({
      id: '4',
      active: false,
      payment_method: 'ach',
      account_type: 'savings',
      last_four: '5678',
    }),
  ],
  showActive: true,
}
