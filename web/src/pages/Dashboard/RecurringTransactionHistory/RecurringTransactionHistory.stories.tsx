import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { recurringTransactionHistory } from '../../../mocks/charts/RecurringTransactionHistory'
import RecurringTransactionHistory from './RecurringTransactionHistory'

export default {
  title: 'RecurringTransactionHistory',
  component: RecurringTransactionHistory,
} as ComponentMeta<typeof RecurringTransactionHistory>

const Template: ComponentStory<typeof RecurringTransactionHistory> = (args) => (
  <BrowserRouter>
    <RecurringTransactionHistory {...args} />
  </BrowserRouter>
)

export const WithTransactions = Template.bind({})
WithTransactions.args = {
  transactions: recurringTransactionHistory,
}

export const NoTransactions = Template.bind({})
NoTransactions.args = {
  transactions: [],
}

export const NoCcAccounts = Template.bind({})
NoCcAccounts.args = {
  ...WithTransactions.args,
  hasCCAccounts: false,
}
