import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createWalletItemForTesting } from '../../../utils/testing/wallet'
import { EditCreditCard } from './EditCreditCard'

export default {
  title: 'Customers/Edit Credit Card',
  argTypes: {
    onSubmit: {
      action: true,
    },
    onCancel: {
      action: true,
    },
  },
} as ComponentMeta<typeof EditCreditCard>

const Template: ComponentStory<typeof EditCreditCard> = (args) => (
  <EditCreditCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  card: createWalletItemForTesting(),
}
