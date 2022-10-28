import { ComponentMeta, ComponentStory } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'
import FormContainer from '../../../components/FormContainer/FormContainer'
import i18n from '../../../i18n'
import { CreditCardEditor } from './CreditCardEditor'

export default {
  title: 'Customers/Credit Card Editor',
} as ComponentMeta<typeof CreditCardEditor>

const Template: ComponentStory<typeof CreditCardEditor> = (args) => (
  <I18nextProvider i18n={i18n}>
    <FormContainer initialValues={{}} onSubmit={() => undefined}>
      <div className="bg-white w-[40rem] p-5">
        <CreditCardEditor {...args} />
      </div>
    </FormContainer>
  </I18nextProvider>
)

export const Default = Template.bind({})

export const ReadOnlyCardFields = Template.bind({})
ReadOnlyCardFields.args = {
  readOnlyAccountNumber: true,
}
