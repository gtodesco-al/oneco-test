import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormContainer from '../../../components/FormContainer/FormContainer'
import CustomerEditor from './CustomerEditor'

export default {
  title: 'Customers/Customer Editor',
} as ComponentMeta<typeof CustomerEditor>

const Template: ComponentStory<typeof CustomerEditor> = () => (
  <FormContainer initialValues={{}} onSubmit={console.log}>
    <CustomerEditor />
    <button type="submit">Submit</button>
  </FormContainer>
)

export const defaultEditor = Template.bind({})
