import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import { createWalletItemForTesting } from '../../../utils/testing/wallet'
import WalletItemSelector from './WalletItemSelector'

export default {
  title: 'Virtual Terminal/Wallet Item Selector',
  component: WalletItemSelector,
  argTypes: {
    onChangeWalletItem: { action: true },
    onCreateBankAccount: { action: true },
    onCreateCreditCard: { action: true },
  },
} as ComponentMeta<typeof WalletItemSelector>

export const Default: ComponentStory<typeof WalletItemSelector> = (args) => (
  <WalletItemSelector {...args} />
)

const walletItems = [
  createWalletItemForTesting({
    title: 'Test Title',
    account_type: 'mc',
    payment_method: 'cc',
    account_number: '12345',
  }),
]

Default.args = {
  walletItems,
  user: createUserForPermissionTesting('v2.accountvaults.post'),
  selectedWalletItem: walletItems[0],
}
