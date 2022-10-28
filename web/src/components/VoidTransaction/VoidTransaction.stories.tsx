import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UnboundVoidTransaction } from './VoidTransaction'

export default {
  title: 'Payment Confirmation / Void Transaction',
  argTypes: {
    onClose: { action: true },
    onSubmit: { action: true },
  },
} as ComponentMeta<typeof UnboundVoidTransaction>

export const Default: ComponentStory<typeof UnboundVoidTransaction> = (
  args
) => <UnboundVoidTransaction {...args} />

Default.args = {
  transaction: {
    id: '1',
    created_ts: 1,
    modified_ts: 1,
    payment_method: 'cc',
    account_type: 'visa',
    last_four: '1234',
    transaction_amount: 123.45,
  },
  isOpen: true,
}
