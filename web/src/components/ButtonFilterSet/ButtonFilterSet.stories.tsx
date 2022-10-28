import { ComponentMeta, ComponentStory } from '@storybook/react'
import ButtonFilterSet from './ButtonFilterSet'

export default {
  title: 'Button Filter Set',
  component: ButtonFilterSet,
  argTypes: {
    onSelect: {
      action: true,
    },
  },
} as ComponentMeta<typeof ButtonFilterSet>

export const Default: ComponentStory<typeof ButtonFilterSet> = (args) => (
  <div className="bg-white p-3">
    <ButtonFilterSet {...args} />
  </div>
)

Default.args = {
  options: ['Today', 'Yesterday', 'Last 30 Days'],
  selectedOption: 'Yesterday',
}
