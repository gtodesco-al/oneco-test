import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../FormContainer/FormContainer'
import FormTextInput from './FormTextInput'

export default {
  title: 'FormTextInput',
  component: FormTextInput,
} as ComponentMeta<typeof FormTextInput>

export const Default: ComponentStory<typeof FormTextInput> = (args) => (
  <FormContainer
    onSubmit={() => undefined}
    initialValues={{ test: 'Test Value' }}
  >
    <FormTextInput {...args} />
  </FormContainer>
)

Default.args = {
  name: 'test',
  label: 'Test Label',
  placeholder: 'Test Placeholder',
}
