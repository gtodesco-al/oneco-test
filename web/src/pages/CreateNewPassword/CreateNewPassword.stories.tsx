import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import CreateNewPassword from './CreateNewPassword'

export default {
  title: 'Create New Password',
  component: CreateNewPassword,
  argTypes: {
    onSubmit: {
      action: true,
    },
  },
} as ComponentMeta<typeof CreateNewPassword>

export const Primary: ComponentStory<typeof CreateNewPassword> = (args) => (
  <BrowserRouter>
    <div className="bg-white">
      <CreateNewPassword {...args} />
    </div>
  </BrowserRouter>
)

Primary.args = {}
