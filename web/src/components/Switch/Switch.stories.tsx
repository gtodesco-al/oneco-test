import { ComponentMeta, Story } from '@storybook/react'
import Switch, { SwitchProps } from './Switch'

export default {
  title: 'Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: Story<SwitchProps> = ({ ...args }) => {
  return (
    <div className="bg-gray-100">
      <Switch {...args} />
    </div>
  )
}

export const Default: Story<SwitchProps> = Template.bind({})
Default.args = {
  active: false,
}
export const ActiveTrue: Story<SwitchProps> = Template.bind({})
ActiveTrue.args = {
  active: true,
}
