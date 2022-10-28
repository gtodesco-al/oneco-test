import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import SignIn from './SignIn'

export default {
  title: 'SignIn',
  component: SignIn,
} as ComponentMeta<typeof SignIn>

const Template: ComponentStory<typeof SignIn> = () => (
  <BrowserRouter>
    <SignIn />
  </BrowserRouter>
)

export const Primary = Template.bind({})
