import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { AchAccountPlaceholder } from './AchAccountPlaceholder'

export default {
  title: 'ACH Account Placeholder',
  component: AchAccountPlaceholder,
} as ComponentMeta<typeof AchAccountPlaceholder>

const Template: ComponentStory<typeof AchAccountPlaceholder> = (args) => (
  <BrowserRouter>
    <AchAccountPlaceholder {...args} />
  </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {
  widgetName: 'Test Widgets',
}
