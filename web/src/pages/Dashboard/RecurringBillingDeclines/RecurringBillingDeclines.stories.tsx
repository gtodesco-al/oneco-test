import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { recurringBillingDeclines } from '../../../mocks/charts/RecurringBillingDeclines'
import RecurringBillingDeclines from './RecurringBillingDeclines'

export default {
  title: 'RecurringBillingDeclines',
  component: RecurringBillingDeclines,
} as ComponentMeta<typeof RecurringBillingDeclines>

const Template: ComponentStory<typeof RecurringBillingDeclines> = (args) => (
  <BrowserRouter>
    <RecurringBillingDeclines {...args} />
  </BrowserRouter>
)

export const RecurringBillingDeclinesWidget = Template.bind({})
RecurringBillingDeclinesWidget.args = {
  transactions: recurringBillingDeclines,
}

export const NoCCAccounts = Template.bind({})
NoCCAccounts.args = {
  hasCCAccounts: false,
}
