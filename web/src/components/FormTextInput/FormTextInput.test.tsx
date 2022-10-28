import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import FormContainer from '../FormContainer/FormContainer'
import FormTextInput from './FormTextInput'

describe.skip('FormTextInput', () => {
  type SubmitFunc = (value: { testField: string }) => void

  const fieldName = 'testField'
  const fieldLabel = 'Test Label'
  const fieldPlaceholder = 'Test Placeholder'

  const renderElement = (onSubmit: SubmitFunc = () => undefined) =>
    render(
      <FormContainer initialValues={{ [fieldName]: '' }} onSubmit={onSubmit}>
        <FormTextInput
          name={fieldName}
          label={fieldLabel}
          placeholder={fieldPlaceholder}
        />

        <button type="submit">Submit</button>
      </FormContainer>
    )

  test('renders the label', () => {
    const { getByText } = renderElement()

    expect(getByText(fieldLabel)).toBeInTheDocument()
  })

  test('renders the placeholder', () => {
    const { getByPlaceholderText } = renderElement()

    expect(getByPlaceholderText(fieldPlaceholder)).toBeInTheDocument()
  })

  test('binds inputs to form', async () => {
    const mock = jest.fn()
    const { getByLabelText, getByRole } = renderElement(mock)

    const expectedInput = 'Test Input'

    await user.type(getByLabelText(fieldLabel), expectedInput)

    await user.click(getByRole('button'))

    await waitFor(() =>
      expect(mock).toHaveBeenCalledWith({ [fieldName]: expectedInput })
    )
  })
})
