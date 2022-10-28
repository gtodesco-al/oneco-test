import { render } from '@testing-library/preact'
import user from '@testing-library/user-event'

import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  interface TestProps {
    onChange?: (val: string) => undefined
  }

  const selectedOption = {
    label: 'Selected',
    value: 'selected',
  }

  const unselectedOption = {
    label: 'Unselected',
    value: 'unselected',
  }

  const options = [selectedOption, unselectedOption]

  const labelText = 'Test Label'
  const nameText = 'testname'

  const renderGroup = ({ onChange = () => undefined }: TestProps = {}) =>
    render(
      <RadioGroup
        label={labelText}
        name={nameText}
        options={options}
        selectedValue={selectedOption.value}
        onChange={onChange}
      />
    )

  test('calls onChange with the value of the clicked option', async () => {
    const onChange = jest.fn()
    const { getByLabelText } = renderGroup({ onChange })

    await user.click(getByLabelText(unselectedOption.label))

    expect(onChange).toHaveBeenCalledWith(unselectedOption.value)
  })

  test('renders the provided label', () => {
    const { getByText } = renderGroup()
    expect(getByText(labelText)).toBeInTheDocument()
  })

  test('renders each option with the correct label, value and name', () => {
    const { getByLabelText } = renderGroup()

    for (const { label, value } of options) {
      const button = getByLabelText(label)
      expect(button).toHaveAttribute('name', nameText)
      expect(button).toHaveAttribute('value', value)
    }
  })

  test('sets the option matching the selectedValue as checked', () => {
    const { getByLabelText } = renderGroup()

    expect(getByLabelText(selectedOption.label)).toBeChecked()
  })

  test('does not check unselected options', () => {
    const { getByLabelText } = renderGroup()

    expect(getByLabelText(unselectedOption.label)).not.toBeChecked()
  })
})
