import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../../components/FormContainer/FormContainer'
import { calculateInitialVirtualTerminalValues } from './utils/defaults/calculateInitialVirtualTerminalValues'
import { createDepositAccountForTesting } from './utils/testing/depositAccounts'
import { createLocationForTesting } from './utils/testing/locations'
import { createUserForPermissionTesting } from '../../utils/testing/users'
import { VirtualTerminalFrame } from './VirtualTerminal'
import { createCustomerForTesting } from '../../utils/testing/customers'

export default {
  title: 'Virtual Terminal/Virtual Terminal',
  component: VirtualTerminalFrame,
  argTypes: {
    onSubmit: { action: true },
    onAddCustomer: { action: true },
  },
} as ComponentMeta<typeof VirtualTerminalFrame>

export const Default: ComponentStory<typeof VirtualTerminalFrame> = (args) => (
  <FormContainer
    initialValues={calculateInitialVirtualTerminalValues(
      args.location,
      args.user,
      args.depositAccount,
      args.processMethod,
      args.transactionType,
      args.accountType
    )}
    onSubmit={() => undefined}
  >
    <VirtualTerminalFrame {...args} />
  </FormContainer>
)

Default.args = {
  location: createLocationForTesting({
    terminals: [
      {
        id: '',
        title: '',
        terminal_manufacturer_id: '',
      },
    ],
    product_transactions: [
      createDepositAccountForTesting({
        id: '1',
        payment_method: 'cc',
        title: 'Test CC Account',
        vt_enable: true,
      }),
      createDepositAccountForTesting({
        id: '2',
        payment_method: 'ach',
        title: 'Test ACH Account',
        ach_allow_credit: true,
        ach_allow_debit: true,
        vt_enable: true,
      }),
    ],
    customerSource: [
      createCustomerForTesting({
        first_name: 'Test',
        last_name: 'Name',
        account_number: '12345',
      }),
    ],
  }),
  user: createUserForPermissionTesting(
    'v2.transactions.post.avsonly',
    'v2.transactions.post.sale',
    'v2.transactions.post.authonly',
    'v2.transactions.post.refund',
    'v2.transactions.post.debit',
    'v2.transactions.post.credit',
    'v2.terminaltransactions.post',
    'v2.contacts.post',
    'v2.accountvaults.post'
  ),
}
