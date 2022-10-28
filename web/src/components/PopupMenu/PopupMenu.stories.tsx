import { ComponentMeta, ComponentStory } from '@storybook/react'
import { PopupMenu } from './PopupMenu'

export default {
  component: PopupMenu,
} as ComponentMeta<typeof PopupMenu>

const Template: ComponentStory<typeof PopupMenu> = () => (
  <PopupMenu button={<button>Click me</button>}>
    <PopupMenu.Item>Test</PopupMenu.Item>
    <PopupMenu.Item>Value</PopupMenu.Item>
  </PopupMenu>
)

export const Default = Template.bind({})
