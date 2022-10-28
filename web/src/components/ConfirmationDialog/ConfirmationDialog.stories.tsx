import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ConfirmationDialog } from './ConfirmationDialog'

export default {
  component: ConfirmationDialog,
  argTypes: {
    onCancel: {
      action: true,
    },
    onConfirm: {
      action: true,
    },
  },
} as ComponentMeta<typeof ConfirmationDialog>

export const Default: ComponentStory<typeof ConfirmationDialog> = (args) => (
  <ConfirmationDialog {...args} />
)

Default.args = {
  title: 'This is a title',
  body: 'This is a body',
  confirmText: 'Yes',
  cancelText: 'No',
}
