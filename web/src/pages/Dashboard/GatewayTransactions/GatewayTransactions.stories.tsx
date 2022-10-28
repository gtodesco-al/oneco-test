import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { GatewayTransactionsRaw } from '../../../mocks/charts/Transactions'
import GatewayTransactions from './GatewayTransactions'

export default {
  title: 'GatewayTransactions',
  component: GatewayTransactions,
} as ComponentMeta<typeof GatewayTransactions>

const Template: ComponentStory<typeof GatewayTransactions> = (args) => (
  <BrowserRouter>
    <GatewayTransactions {...args} />
  </BrowserRouter>
)

export const WithTransactions = Template.bind({})
WithTransactions.args = {
  transactions: GatewayTransactionsRaw,
}

export const NoTransactions = Template.bind({})
NoTransactions.args = {
  transactions: [],
}
