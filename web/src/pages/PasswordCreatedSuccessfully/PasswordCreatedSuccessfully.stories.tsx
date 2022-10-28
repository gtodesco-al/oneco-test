import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { PasswordCreatedSuccessfully } from './PasswordCreatedSuccessfully'

export default {
  title: 'Password Created Successfully',
  component: PasswordCreatedSuccessfully,
} as ComponentMeta<typeof PasswordCreatedSuccessfully>

export const Primary: ComponentStory<
  typeof PasswordCreatedSuccessfully
> = () => (
  <BrowserRouter>
    <div className="bg-white">
      <PasswordCreatedSuccessfully />
    </div>
  </BrowserRouter>
)
