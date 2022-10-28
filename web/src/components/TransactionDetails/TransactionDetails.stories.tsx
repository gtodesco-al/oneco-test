import { Transaction } from '@fortis/api'
import { ComponentMeta, Story } from '@storybook/react'
import TransactionDetails, {
  TransactionDetailsProps,
} from './TransactionDetails'

export default {
  title: 'Transaction Details',
  component: TransactionDetails,
  argTypes: {
    onClickVoid: { action: true },
  },
} as ComponentMeta<typeof TransactionDetails>

const Template: Story<TransactionDetailsProps> = ({ ...rest }) => (
  <div className="bg-gray-100">
    <TransactionDetails {...rest} />
  </div>
)

const baseTransaction: Transaction = {
  id: '12314124',
  created_ts: 0,
  modified_ts: 0,
  payment_method: 'cc',
  type_id: 20,
  status_code: 101,
  tax: 10,
  surcharge_amount: 20,
  tip_amount: 1.5,
  transaction_amount: 40,
  transaction_c1: 'Test 1',
  transaction_c2: 'Test 2',
  transaction_c3: 'Test 3',
  transaction_c4: 'Test 4',
  verbiage: 'Test Verbiage',
  auth_code: '12354',
  account_holder_name: 'Test Name',
  last_four: '1234',
  account_type: 'mc',
  entry_mode_id: 'S',
  description: 'Test Description',
  product_transaction: {
    title: '',
    id: '',
    mcc: '',
    location_id: '',
    payment_method: 'cc',
    vt_show_custom_fields: true,
  },
  transaction_histories: [
    {
      id: '12345',
      event_ts: 123141,
      status: 'Accepted',
      created_ts: 0,
      modified_ts: 0,
      transaction_id: '',
    },
  ],
}

export const CCTransaction: Story<TransactionDetailsProps> = Template.bind({})
CCTransaction.args = {
  transaction: { ...baseTransaction, payment_method: 'cc' },
}

export const ACHTransaction: Story<TransactionDetailsProps> = Template.bind({})
ACHTransaction.args = {
  transaction: { ...baseTransaction, payment_method: 'ach' },
}
