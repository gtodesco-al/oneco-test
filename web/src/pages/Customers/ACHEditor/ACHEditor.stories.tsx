import { ComponentMeta, ComponentStory } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'
import FormContainer from '../../../components/FormContainer/FormContainer'
import i18n from '../../../i18n'
import { UnboundACHEditor as ACHEditor } from './ACHEditor'

export default {
  title: 'Customers/ACH Editor',
  argTypes: {
    setAccountType: {
      action: true,
    },
  },
} as ComponentMeta<typeof ACHEditor>

const Template: ComponentStory<typeof ACHEditor> = (args) => (
  <I18nextProvider i18n={i18n}>
    <FormContainer
      initialValues={{
        ach_sec_code: 'PPD',
        account_type: 'checking',
        routing_number: '12314',
        account_number: '1231341',
      }}
      onSubmit={() => undefined}
    >
      <div className="bg-white w-[40rem] p-5">
        <ACHEditor {...args} />
      </div>
    </FormContainer>
  </I18nextProvider>
)

export const Personal = Template.bind({})
Personal.args = {
  accountType: 'personal',
}

export const Business = Template.bind({})
Business.args = {
  accountType: 'business',
}

export const ReadOnlyAccount = Template.bind({})
ReadOnlyAccount.args = {
  ...Personal.args,
  readOnlyBankInfo: true,
}
