import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../FormContainer/FormContainer'
import { FormRadioGroup } from './FormRadioGroup'

export default {
  title: 'FormRadioGroup',
  component: FormRadioGroup,
} as ComponentMeta<typeof FormRadioGroup>

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

export const Default: ComponentStory<typeof FormRadioGroup> = (args) => (
  <FormContainer
    initialValues={{ test: options[1].value }}
    onSubmit={() => Promise.resolve()}
  >
    <FormRadioGroup {...args} />
  </FormContainer>
)

Default.args = {
  name: 'test',
  label: 'Test Label',
  options,
}
