import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { CashInfoPanel } from './CashInfoPanel'

export default {
  title: 'CashInfoPanel',
  component: CashInfoPanel,
} as ComponentMeta<typeof CashInfoPanel>

export const Default: ComponentStory<typeof CashInfoPanel> = (args) => (
  <BrowserRouter>
    <div className="w-52">
      <CashInfoPanel {...args} />
    </div>
  </BrowserRouter>
)

Default.args = {
  title: 'Today',
  cashAmount: 80,
  details: '12 Declines',
  to: '/',
}
