import { Story, Meta } from '@storybook/react'
import { InputProps, Input } from './Input'

export default {
  title: 'Input',
  component: Input,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: 'white',
        },
      ],
    },
  },
} as Meta

const Template: Story<InputProps> = ({ ...rest }) => <Input {...rest} />

export const Primary: Story<InputProps> = Template.bind({})
Primary.args = {
  label: 'Input label',
}
