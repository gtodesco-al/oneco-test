import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import FormContainer from '../FormContainer/FormContainer'
import FormCurrencyInput from './FormCurrencyInput'

describe('FormCurrencyInput', () => {
  type SubmitFunc = (value: { testField: string }) => void

  const fieldName = 'testField'
  const fieldLabel = 'Test Label'
  const fieldPlaceholder = 'Test Placeholder'

  interface RenderProps {
    onSubmit?: SubmitFunc
    currency?: string
  }

  const renderElement = ({
    onSubmit = () => undefined,
    currency = undefined,
  }: RenderProps = {}) =>
    render(
      <FormContainer initialValues={{ [fieldName]: '' }} onSubmit={onSubmit}>
        <FormCurrencyInput
          name={fieldName}
          label={fieldLabel}
          currency={currency}
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
    const { getByLabelText, getByRole } = renderElement({ onSubmit: mock })

    const expectedInput = '12345.00'

    await user.type(getByLabelText(fieldLabel), expectedInput)

    await user.click(getByRole('button'))

    await waitFor(() =>
      expect(mock).toHaveBeenCalledWith({ [fieldName]: expectedInput })
    )
  })

  test('shows currency if provided', () => {
    const currency = 'USD'
    const { getByLabelText } = renderElement({ currency })

    expect(getByLabelText('currency')).toHaveTextContent(currency)
  })

  test('does not show currency if not provided', () => {
    const { queryByLabelText } = renderElement()

    expect(queryByLabelText('currency')).not.toBeInTheDocument()
  })
})
