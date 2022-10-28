import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { CcAccountPlaceholder } from './CcAccountPlaceholder'

export default {
  title: 'CC Account Placeholder',
  component: CcAccountPlaceholder,
} as ComponentMeta<typeof CcAccountPlaceholder>

const Template: ComponentStory<typeof CcAccountPlaceholder> = (args) => (
  <BrowserRouter>
    <CcAccountPlaceholder {...args} />
  </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {
  widgetName: 'Test Widgets',
}
