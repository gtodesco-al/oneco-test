import { ComponentMeta, ComponentStory } from '@storybook/react'

import { createUserForTesting } from '../../../utils/testing/users'

import TransactionSummary from './TransactionSummary'

export default {
  title: 'Virtual Terminal/TransactionSummary',
  component: TransactionSummary,
  argTypes: {
    subtotal: {
      type: 'number',
      defaultValue: 100,
    },
    tax: {
      type: 'number',
    },
    tip: {
      type: 'number',
    },
    surcharge: {
      type: 'number',
    },
  },
} as ComponentMeta<typeof TransactionSummary>

const Template: ComponentStory<typeof TransactionSummary> = (args) => (
  <div className="bg-white p-4">
    <TransactionSummary {...args} />
  </div>
)

export const SubtotalOnly = Template.bind({})

export const AllValues = Template.bind({})
AllValues.args = {
  account: undefined,
  transactionType: 'sale',
  user: createUserForTesting({}),
}
