import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createCustomerForTesting } from '../../../utils/testing/customers'
import { UnboundCustomerActivationToggle } from './CustomerActivationToggle'

export default {
  title: 'Customers/Customer Activation Toggle',
  component: UnboundCustomerActivationToggle,
  argTypes: {
    onClose: {
      action: true,
    },
    onAccept: {
      action: true,
    },
  },
} as ComponentMeta<typeof UnboundCustomerActivationToggle>

export const Active: ComponentStory<typeof UnboundCustomerActivationToggle> = (
  args
) => <UnboundCustomerActivationToggle {...args} />

Active.args = {
  customer: createCustomerForTesting({
    first_name: 'John',
    last_name: 'Smith',
    active: true,
  }),
}

export const Inactive = Active.bind({})

Inactive.args = {
  customer: createCustomerForTesting({
    ...Active.args.customer,
    active: false,
  }),
}
