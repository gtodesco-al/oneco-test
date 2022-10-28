import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import PasswordResetCode from './PasswordResetCode'

export default {
  title: 'Password Reset Code',
  component: PasswordResetCode,
  argTypes: {
    onSubmit: {
      action: true,
    },
  },
} as ComponentMeta<typeof PasswordResetCode>

export const Primary: ComponentStory<typeof PasswordResetCode> = (args) => (
  <BrowserRouter>
    <div className="bg-white">
      <PasswordResetCode {...args} />
    </div>
  </BrowserRouter>
)
