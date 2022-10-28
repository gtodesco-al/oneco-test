import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { createDepositAccountForTesting } from '../utils/testing/depositAccounts'
import { VirtualTerminalBillingInformation } from './VirtualTerminalBillingInformation'

export default {
  title: 'Virtual Terminal/Billing Information',
} as ComponentMeta<typeof VirtualTerminalBillingInformation>

export const Default: ComponentStory<
  typeof VirtualTerminalBillingInformation
> = (args) => (
  <FormContainer
    onSubmit={() => undefined}
    initialValues={{}}
    className="bg-white p-6"
  >
    <VirtualTerminalBillingInformation {...args} />
  </FormContainer>
)

Default.args = {
  account: createDepositAccountForTesting(),
}
