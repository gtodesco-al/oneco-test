import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { createUserWithTransactionPermissions } from '../../../utils/testing/users'
import {
  DepositAccount,
  LocationWithDepositAccounts,
} from '../virtualTerminalTypes'
import TransactionInformation from './TransactionInformation'

export default {
  title: 'Virtual Terminal/Transaction Information',
} as ComponentMeta<typeof TransactionInformation>

const Template: ComponentStory<typeof TransactionInformation> = (args) => (
  <FormContainer
    onSubmit={() => undefined}
    initialValues={{}}
    className="bg-white p-6"
  >
    <TransactionInformation {...args} />
  </FormContainer>
)

const ccAccount: DepositAccount = {
  id: '',
  payment_method: 'cc',
  title: 'CC Account',
  vt_enable: true,
  default_transaction_type: 'avsonly',
  vt_enable_sales_tax: false,
  vt_override_sales_tax_allowed: false,
  industry_type: 'retail',
}

const achAccount: DepositAccount = {
  id: '',
  payment_method: 'ach',
  title: 'ACH Account',
  vt_enable: true,
  default_transaction_type: 'credit',
  vt_enable_sales_tax: false,
  vt_override_sales_tax_allowed: false,
  industry_type: 'retail',
}

const location: LocationWithDepositAccounts = {
  created_ts: 0,
  id: '',
  modified_ts: 0,
  name: '',
  parent_id: '',
  product_transactions: [ccAccount, achAccount],
}

export const WithCcAccount = Template.bind({})

WithCcAccount.args = {
  location,
  user: createUserWithTransactionPermissions(
    'sale',
    'authonly',
    'avsonly',
    'refund'
  ),
  depositAccount: ccAccount,
}

export const WithAchAccount = Template.bind({})

WithAchAccount.args = {
  location,
  user: createUserWithTransactionPermissions('debit', 'credit'),
  depositAccount: achAccount,
}
