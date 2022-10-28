import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../FormContainer/FormContainer'
import FormCurrencyInput from './FormCurrencyInput'

export default {
  title: 'FormCurrencyInput',
  component: FormCurrencyInput,
} as ComponentMeta<typeof FormCurrencyInput>

export const Default: ComponentStory<typeof FormCurrencyInput> = (args) => (
  <FormContainer onSubmit={() => undefined} initialValues={{ test: '' }}>
    <FormCurrencyInput {...args} />
  </FormContainer>
)

Default.args = {
  name: 'test',
  label: 'Test Label',
  placeholder: 'Test Placeholder',
  currency: 'USD',
}

export const NoCurrency = Default.bind({})
NoCurrency.args = {
  ...Default.args,
  currency: undefined,
}
