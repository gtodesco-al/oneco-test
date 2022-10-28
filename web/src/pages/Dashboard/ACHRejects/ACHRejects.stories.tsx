import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { achRejects } from '../../../mocks/charts/ACHRejects'
import ACHRejects from './ACHRejects'

export default {
  title: 'ACHRejects',
  component: ACHRejects,
} as ComponentMeta<typeof ACHRejects>

const Template: ComponentStory<typeof ACHRejects> = (args) => (
  <BrowserRouter>
    <ACHRejects {...args} />
  </BrowserRouter>
)

export const ACHRejectsWidget = Template.bind({})
ACHRejectsWidget.args = {
  transactions: achRejects,
}

export const NoAchAccounts = Template.bind({})
NoAchAccounts.args = {
  hasACHAccounts: false,
}
