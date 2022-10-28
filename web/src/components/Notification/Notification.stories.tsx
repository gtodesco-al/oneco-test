import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Notification } from './Notification'

export default {
  title: 'Notification',
  component: Notification,
  parameters: {},
} as ComponentMeta<typeof Notification>

const Template: ComponentStory<typeof Notification> = () => (
  <div className="w-full">
    <Notification timeout={20000} type="success">
      Notification toast
    </Notification>
  </div>
)

export const NotificationExample = Template.bind({})
