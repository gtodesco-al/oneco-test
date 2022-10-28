import { ComponentMeta, ComponentStory } from '@storybook/react'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import { createCustomerForTesting } from '../../../utils/testing/customers'
import { createLocationForTesting } from '../utils/testing/locations'
import { UnboundEditCustomer } from './EditCustomer'

export default {
  title: 'Customers/Edit Customer',
  component: UnboundEditCustomer,
  argTypes: {
    onSubmit: {
      action: true,
    },
    onClickDeactivate: {
      action: true,
    },
    setShowActivationModal: {
      action: true,
    },
    onClickAddCreditCard: {
      action: true,
    },
  },
} as ComponentMeta<typeof UnboundEditCustomer>

export const WalletShown: ComponentStory<typeof UnboundEditCustomer> = (
  args
) => <UnboundEditCustomer {...args} />

WalletShown.args = {
  user: createUserForPermissionTesting(),
  customer: createCustomerForTesting({
    first_name: 'Test',
    last_name: 'Name',
    active: true,
  }),
  location: createLocationForTesting({
    product_accountvault: {},
  }),
}

export const WalletHidden = WalletShown.bind({})

WalletHidden.args = {
  ...WalletShown.args,
  location: createLocationForTesting({}),
}
