import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UnboundPopupCustomerEditor } from './PopupCustomerEditor'

export default {
  title: 'Virtual Terminal/Popup Customer Editor',
  component: UnboundPopupCustomerEditor,
  argTypes: {
    onClose: { action: true },
    onSubmit: { action: true },
  },
} as ComponentMeta<typeof UnboundPopupCustomerEditor>

export const Default: ComponentStory<typeof UnboundPopupCustomerEditor> = (
  args
) => <UnboundPopupCustomerEditor {...args} />

Default.args = {
  locationId: '1',
  isOpen: true,
}
