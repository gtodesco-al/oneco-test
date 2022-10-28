import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { chargebacks } from '../../../mocks/charts/Chargebacks'
import Chargebacks from './Chargebacks'

export default {
  title: 'Chargebacks',
  component: Chargebacks,
} as ComponentMeta<typeof Chargebacks>

const Template: ComponentStory<typeof Chargebacks> = (args) => (
  <BrowserRouter>
    <Chargebacks {...args} />
  </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {
  transactions: chargebacks,
}

export const NoCcAccounts = Template.bind({})
NoCcAccounts.args = {
  hasCCAccounts: false,
}
