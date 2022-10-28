import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from '../Button/Button'
import { Modal } from './Modal'

export default {
  component: Modal,
  argTypes: {
    onClose: {
      action: true,
    },
  },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Default = Template.bind({})

Default.args = {
  title: 'Hello World',
  body: 'This is the body',
  isOpen: true,
  buttons: (
    <>
      <Button>Click Me</Button>
      <Button>Click Me</Button>
    </>
  ),
}

export const NoCloseButton = Template.bind({})
NoCloseButton.args = {
  ...Default.args,
  onClose: undefined,
}

export const NoTitle = Template.bind({})
NoTitle.args = {
  ...Default.args,
  title: undefined,
}

export const FormWithOverlay = Template.bind({})
FormWithOverlay.args = {
  ...Default.args,
  onClose: undefined,
}
