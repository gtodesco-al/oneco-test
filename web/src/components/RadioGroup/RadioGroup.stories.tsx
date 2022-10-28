import { ComponentMeta, ComponentStory } from '@storybook/react'
import { RadioGroup } from './RadioGroup'

export default {
  component: RadioGroup,
  argTypes: {
    onChange: { action: true },
  },
} as ComponentMeta<typeof RadioGroup>

const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
)

export const StandardGroup = Template.bind({})

StandardGroup.args = {
  label: 'Test Group',
  name: 'testgroup',
  options: [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
  ],
  selectedValue: '2',
}

export const VerticalAlign = Template.bind({})

VerticalAlign.args = {
  label: 'Test Group',
  name: 'testgroup',
  options: [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
  ],
  verticalOptions: true,
  selectedValue: '2',
}
