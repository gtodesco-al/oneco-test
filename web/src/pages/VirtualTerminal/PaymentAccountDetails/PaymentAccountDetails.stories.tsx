import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { createDepositAccountForTesting } from '../utils/testing/depositAccounts'
import { createLocationForTesting } from '../utils/testing/locations'
import { createUserForTesting } from '../../../utils/testing/users'
import { UnboundPaymentAccountDetails } from './PaymentAccountDetails'
import { createCustomerForTesting } from '../../../utils/testing/customers'
import { createWalletItemForTesting } from '../../../utils/testing/wallet'

export default {
  title: 'Virtual Terminal/Payment Account Details',
  argTypes: {
    setProcessMethod: { action: true },
    processMethod: {
      options: ['manual', 'terminal', 'wallet'],
      control: { type: 'radio' },
    },
    onChangeWalletItem: { action: true },
    onCreateBankAccount: { action: true },
    onCreateCreditCard: { action: true },
  },
} as ComponentMeta<typeof UnboundPaymentAccountDetails>

//Stories use unbound version so that they don't rely on the API.
export const CC: ComponentStory<typeof UnboundPaymentAccountDetails> = (
  args
) => (
  <FormContainer
    onSubmit={() => undefined}
    initialValues={{}}
    className="bg-white p-6"
  >
    <UnboundPaymentAccountDetails {...args} />
  </FormContainer>
)

CC.args = {
  user: createUserForTesting(),
  account: createDepositAccountForTesting(),
  location: createLocationForTesting(),
  processMethod: 'manual',
}

export const CCWithCVV = CC.bind({})

CCWithCVV.args = {
  ...CC.args,
  account: createDepositAccountForTesting({ vt_cvv: true }),
}

export const ACH = CC.bind({})

ACH.args = {
  ...CC.args,
  account: createDepositAccountForTesting({ payment_method: 'ach' }),
}

export const Customer = CC.bind({})
Customer.args = {
  ...CC.args,
  customer: createCustomerForTesting(),
  walletItems: [createWalletItemForTesting({})],
  processMethod: 'wallet',
}
