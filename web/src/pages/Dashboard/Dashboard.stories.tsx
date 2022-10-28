import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'

export default {
  title: 'Dashboard',
  component: Dashboard,
} as ComponentMeta<typeof Dashboard>

const Template: ComponentStory<typeof Dashboard> = () => (
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>
)

export const Primary = Template.bind({})
Primary.args = {
  merchantAccounts: [
    {
      id: '1',
      title: 'CC account 1',
      paymentMethod: 'cc',
    },
    {
      id: '2',
      title: 'CC account 2',
      paymentMethod: 'cc',
    },
    {
      id: '3',
      title: 'ACH account 3',
      paymentMethod: 'ach',
    },
    {
      id: '4',
      title: 'ACH account 4',
      paymentMethod: 'ach',
    },
  ],
}
