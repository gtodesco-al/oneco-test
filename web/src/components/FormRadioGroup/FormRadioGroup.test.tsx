import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import FormContainer from '../FormContainer/FormContainer'
import { FormRadioGroup } from './FormRadioGroup'

describe('FormRadioGroup', () => {
  const testValues = [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
  ]

  const fieldLabel = 'Test Field'

  interface FormFields {
    testField: string
  }

  interface TestProps {
    onSubmit?: (value: FormFields) => Promise<void>
  }

  const renderElement = ({
    onSubmit = () => Promise.resolve(),
  }: TestProps = {}) =>
    render(
      <FormContainer initialValues={{ testField: '2' }} onSubmit={onSubmit}>
        <FormRadioGroup
          name={'testField'}
          label={fieldLabel}
          options={testValues}
        />

        <button type="submit">Submit</button>
      </FormContainer>
    )

  test('renders the label', () => {
    const { getByText } = renderElement()

    expect(getByText(fieldLabel)).toBeInTheDocument()
  })

  test('respects the default value provided by Formik', async () => {
    const mock = jest.fn()

    const { getByRole } = renderElement({ onSubmit: mock })

    await user.click(getByRole('button'))

    await waitFor(() => expect(mock).toHaveBeenCalledWith({ testField: '2' }))
  })

  test('Updates value when an option is clicked', async () => {
    const mock = jest.fn()

    const { getByLabelText, getByRole } = renderElement({ onSubmit: mock })
    await user.click(getByLabelText('Option 1'))
    await user.click(getByRole('button'))

    await waitFor(() => expect(mock).toHaveBeenCalledWith({ testField: '1' }))
  })
})
