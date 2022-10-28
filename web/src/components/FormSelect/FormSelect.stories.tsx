import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../FormContainer/FormContainer'
import FormSelect from './FormSelect'

export default {
  title: 'FormSelect',
  component: FormSelect,
} as ComponentMeta<typeof FormSelect>

const options = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
]

export const Default: ComponentStory<typeof FormSelect> = (args) => (
  <FormContainer
    initialValues={{ test: undefined }}
    onSubmit={() => Promise.resolve()}
  >
    <FormSelect {...args} />
  </FormContainer>
)

Default.args = {
  name: 'test',
  label: 'Test Label',
  placeholder: 'Pick an Option',
  options,
}
