import { ComponentMeta, ComponentStory } from '@storybook/react'
import VirtualTerminalSection from './VirtualTerminalSection'

export default {
  title: 'Virtual Terminal/Virtual Terminal Section',
  component: VirtualTerminalSection,
} as ComponentMeta<typeof VirtualTerminalSection>

export const Default: ComponentStory<typeof VirtualTerminalSection> = (
  args
) => (
  <VirtualTerminalSection {...args}>
    <p>Placeholder</p>
  </VirtualTerminalSection>
)

Default.args = {
  header: 'Test Header',
}

export const WithSubheader = Default.bind({})

WithSubheader.args = {
  ...Default.args,
  subheader: 'Test Subheader',
}
