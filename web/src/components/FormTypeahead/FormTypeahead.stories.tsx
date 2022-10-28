import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../FormContainer/FormContainer'
import { FormTypeahead } from './FormTypeahead'

export default {
  component: FormTypeahead,
} as ComponentMeta<typeof FormTypeahead>

export const Default: ComponentStory<typeof FormTypeahead> = (args) => (
  <FormContainer initialValues={{}} onSubmit={() => undefined}>
    <FormTypeahead {...args} />
  </FormContainer>
)

Default.args = {
  label: 'Test Input',
  ariaClearLabel: 'Clear',
  name: 'testname',
  placeholder: 'Enter a value',
  source: ['test1', 'test2', 'test3', 'test4'],
}
