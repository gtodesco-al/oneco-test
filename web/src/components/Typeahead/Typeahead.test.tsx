import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import Typeahead from './Typeahead'

describe('Typeahead', () => {
  const options = ['Test Value 1', 'Test 2', 'Test Value 3']

  const renderTypeahead = ({
    label = '',
    ariaClearLabel = 'clear selection',
    source = options,
    value = undefined,
    onChange = () => undefined,
  }: Partial<Parameters<typeof Typeahead>[0]> = {}) =>
    render(
      <Typeahead
        label={label}
        source={source}
        value={value}
        onChange={onChange}
        ariaClearLabel={ariaClearLabel}
      />
    )

  test('renders the label', () => {
    const expectedLabel = 'Test Label'
    const { getByText } = renderTypeahead({ label: expectedLabel })

    expect(getByText(expectedLabel)).toBeInTheDocument()
  })

  test('renders no options before user interaction', () => {
    const { queryByRole } = renderTypeahead()

    expect(queryByRole('option')).not.toBeInTheDocument()
  })

  test('renders options matching typed search text', async () => {
    const { getByRole, getAllByRole } = renderTypeahead()

    await user.type(getByRole('combobox'), 'Value')

    await waitFor(() => expect(getAllByRole('option')).toHaveLength(2))
  })

  test('calls onChange when the user clicks an option', async () => {
    const changeHandler = jest.fn()
    const { getByRole, getAllByRole } = renderTypeahead({
      onChange: changeHandler,
    })

    await user.type(getByRole('combobox'), 'Value')
    await user.click(getAllByRole('option')[0])

    expect(changeHandler).toHaveBeenCalledWith(options[0])
  })

  test('Calls onChange when the user clicks the clear button', async () => {
    const changeHandler = jest.fn()
    const { getByLabelText } = renderTypeahead({
      onChange: changeHandler,
      value: options[0],
    })

    await user.click(getByLabelText('clear selection'))

    expect(changeHandler).toHaveBeenCalledWith(undefined)
  })
})
