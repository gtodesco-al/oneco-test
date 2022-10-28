import { Transaction } from '@fortis/api'
import { ComponentMeta, Story } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import {
  PaymentConfirmationProps,
  UnwrappedPaymentConfirmation,
} from './PaymentConfirmation'

export default {
  title: 'Payment Confirmation / Payment Confirmation',
  component: UnwrappedPaymentConfirmation,
  argTypes: {
    onClickVoid: { action: true },
  },
} as ComponentMeta<typeof UnwrappedPaymentConfirmation>

const Template: Story<PaymentConfirmationProps> = ({ ...rest }) => (
  <BrowserRouter>
    <div className="bg-gray-100">
      <UnwrappedPaymentConfirmation {...rest} />
    </div>
  </BrowserRouter>
)

const baseTransaction: Transaction = {
  id: '',
  created_ts: 0,
  modified_ts: 0,
  payment_method: 'cc',
}

export const CCConfirmation: Story<PaymentConfirmationProps> = Template.bind({})
CCConfirmation.args = {
  transaction: {
    ...baseTransaction,
    payment_method: 'cc',
    terminal_id: '12345',
  },
}

export const ACHConfirmation: Story<PaymentConfirmationProps> = Template.bind(
  {}
)
ACHConfirmation.args = {
  transaction: {
    ...baseTransaction,
    payment_method: 'ach',
    terminal_id: '12345',
  },
}

export const NoTerminal: Story<PaymentConfirmationProps> = Template.bind({})
NoTerminal.args = {
  transaction: {
    ...baseTransaction,
    payment_method: 'cc',
  },
}

export const PaymentInProcess: Story<PaymentConfirmationProps> = Template.bind(
  {}
)
PaymentInProcess.args = {
  transaction: baseTransaction,
}
