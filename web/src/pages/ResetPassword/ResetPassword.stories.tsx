import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import ResetPassword from './ResetPassword'

export default {
  title: 'Reset Password',
  component: ResetPassword,
  argTypes: {
    onSubmit: {
      action: true,
    },
  },
} as ComponentMeta<typeof ResetPassword>

export const Primary: ComponentStory<typeof ResetPassword> = (args) => (
  <BrowserRouter>
    <div className="bg-white">
      <ResetPassword {...args} />
    </div>
  </BrowserRouter>
)
