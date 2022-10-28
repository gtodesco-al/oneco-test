import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { recurringTransactionForecast } from '../../../mocks/charts/RecurringTransactionForecast'
import RecurringTransactionForecast from './RecurringTransactionForecast'

export default {
  title: 'RecurringTransactionForecast',
  component: RecurringTransactionForecast,
} as ComponentMeta<typeof RecurringTransactionForecast>

const Template: ComponentStory<typeof RecurringTransactionForecast> = (
  args
) => (
  <BrowserRouter>
    <RecurringTransactionForecast {...args} />
  </BrowserRouter>
)

export const WithTransactions = Template.bind({})
WithTransactions.args = {
  transactions: recurringTransactionForecast,
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
