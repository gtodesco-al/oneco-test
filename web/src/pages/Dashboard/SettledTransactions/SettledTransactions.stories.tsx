import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { SettledTransactionsRaw } from '../../../mocks/charts/Transactions'
import SettledTransactions from './SettledTransactions'

export default {
  title: 'SettledTransactions',
  component: SettledTransactions,
} as ComponentMeta<typeof SettledTransactions>

const Template: ComponentStory<typeof SettledTransactions> = (args) => (
  <BrowserRouter>
    <SettledTransactions {...args} />
  </BrowserRouter>
)

export const WithTransactions = Template.bind({})
WithTransactions.args = {
  transactions: SettledTransactionsRaw,
}

export const NoTransactions = Template.bind({})
NoTransactions.args = {
  transactions: [],
}
