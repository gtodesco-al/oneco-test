import { ComponentMeta, ComponentStory } from '@storybook/react'
import InfoTip from './InfoTip'

export default {
  title: 'InfoTip',
  component: InfoTip,
} as ComponentMeta<typeof InfoTip>

export const Default: ComponentStory<typeof InfoTip> = (args) => (
  <InfoTip {...args} />
)

Default.args = {
  className: 'w-48',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
}
