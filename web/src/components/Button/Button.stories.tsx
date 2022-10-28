import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { Story, Meta } from '@storybook/react'
import Button, { ButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button,
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

const commonProps = {
  children: 'Button',
}

const Template: Story<ButtonProps> = ({ children, ...rest }) => (
  <Button {...rest}>{children}</Button>
)

export const Primary: Story<ButtonProps> = Template.bind({})
Primary.args = {
  ...commonProps,
}
export const PrimaryWithIcon: Story<ButtonProps> = Template.bind({})
PrimaryWithIcon.args = {
  ...commonProps,
  icon: <ArrowNarrowRightIcon className="ml-2 w-5" />,
}
export const Outline: Story<ButtonProps> = Template.bind({})
Outline.args = {
  ...commonProps,
  buttonType: 'outline',
}
export const OutlineEnabled: Story<ButtonProps> = Template.bind({})
OutlineEnabled.args = {
  ...commonProps,
  buttonType: 'outline',
  isEnabled: true,
}
export const OutlineWithIcon: Story<ButtonProps> = Template.bind({})
OutlineWithIcon.args = {
  ...commonProps,
  buttonType: 'outline',
  icon: <ArrowNarrowRightIcon className="ml-2 w-5" />,
}
export const OutlineWithIconEnabled: Story<ButtonProps> = Template.bind({})
OutlineWithIconEnabled.args = {
  ...commonProps,
  isEnabled: true,
  buttonType: 'outline',
  icon: <ArrowNarrowRightIcon className="ml-2 w-5" />,
}

export const Link: Story<ButtonProps> = Template.bind({})
Link.args = {
  ...commonProps,
  isLink: true,
}
