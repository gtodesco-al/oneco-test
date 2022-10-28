import { Story, Meta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Link, LinkProps } from './Link'

export default {
  title: 'Link',
  component: Link,
} as Meta

const Template: Story<LinkProps> = ({ ...args }) => (
  <BrowserRouter>
    <Link {...args} />
  </BrowserRouter>
)

export const Primary = Template.bind({})
Primary.args = {
  text: 'Link text',
}
