import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import ButtonFilterSet from './ButtonFilterSet'

describe('ButtonFilterSet', () => {
  const option1 = 'option 1'
  const option2 = 'option 2'
  const option3 = 'option 3'

  const options = [option1, option2, option3]

  const renderFilterSet = ({
    selectedOption = options[0],
    onSelect = () => undefined,
  }) =>
    render(
      <ButtonFilterSet
        options={options}
        selectedOption={selectedOption}
        onSelect={onSelect}
      />
    )

  test('Clicking the button for an option calls onSelect with that option.', async () => {
    const submitHandler = jest.fn()
    const { getByRole } = renderFilterSet({
      onSelect: submitHandler,
      selectedOption: option1,
    })

    const button3 = getByRole('button', { name: option3 })

    await user.click(button3)

    await waitFor(() => expect(submitHandler).toBeCalledWith(option3))
  })

  test('Clicking the button for previous filter goes to the previous option in the list.', async () => {
    const submitHandler = jest.fn()
    const { getByRole } = renderFilterSet({
      onSelect: submitHandler,
      selectedOption: option3,
    })

    const backButton = getByRole('button', { name: 'previous filter' })

    await user.click(backButton)

    await waitFor(() => expect(submitHandler).toBeCalledWith(option2))
  })

  test('Clicking the button for next filter goes to the next option in the list.', async () => {
    const submitHandler = jest.fn()
    const { getByRole } = renderFilterSet({
      onSelect: submitHandler,
      selectedOption: option1,
    })

    const nextButton = getByRole('button', { name: 'next filter' })

    await user.click(nextButton)

    await waitFor(() => expect(submitHandler).toBeCalledWith(option2))
  })

  test('The previous button is disabled if the list is on the first item.', () => {
    const { getByRole } = renderFilterSet({ selectedOption: options.at(0) })

    expect(getByRole('button', { name: 'previous filter' })).toBeDisabled()
  })

  test('The next button is disabled if the list is on the last item.', () => {
    const { getByRole } = renderFilterSet({ selectedOption: options.at(-1) })

    expect(getByRole('button', { name: 'next filter' })).toBeDisabled()
  })
})
