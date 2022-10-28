import { fireEvent, render } from '@testing-library/preact'
import { ComponentChild } from 'preact'
import { MultipleSelect, MultipleSelectProps } from './MultipleSelect'

describe('MultipleSelect', () => {
  function MultiTest<T>(props: Partial<MultipleSelectProps<T>>) {
    return (
      <MultipleSelect
        allItems={props.allItems ?? []}
        selectedItems={props.selectedItems ?? []}
        onChangeSelections={props.onChangeSelections ?? (() => undefined)}
        defaultText={props.defaultText}
        itemToString={props.itemToString}
      />
    )
  }

  const renderAndOpen = (component: ComponentChild) => {
    const output = render(component)
    fireEvent.click(output.getByRole('button'))
    return output
  }

  const getButtonText = (component: ComponentChild) =>
    render(component).getByRole('button').textContent

  test('renders default text with no items', () => {
    const expectedDefaultText = 'This is a test for default text'

    const actualText = getButtonText(
      <MultiTest defaultText={expectedDefaultText} />
    )

    expect(actualText).toMatch(expectedDefaultText)
  })

  test('renders name of first selected item if there are any selected items.', () => {
    const selectedItem = 'selected item'

    const actualText = getButtonText(
      <MultiTest selectedItems={[selectedItem]} />
    )

    expect(actualText).toMatch(selectedItem)
  })

  test('renders name of first selected item "+2" if there are three selected items.', () => {
    const selectedItem = 'selected item'
    const expectedText = 'selected item +2'

    const actualText = getButtonText(
      <MultiTest selectedItems={[selectedItem, selectedItem, selectedItem]} />
    )

    expect(actualText).toMatch(expectedText)
  })

  test('renders name of first selected item "+2" if there are three selected items, using custom mapper', () => {
    const selectedItem = 'selected item'
    const expectedText = 'test +2'

    const actualText = getButtonText(
      <MultiTest
        selectedItems={[selectedItem, selectedItem, selectedItem]}
        itemToString={() => 'test'}
      />
    )

    expect(actualText).toMatch(expectedText)
  })

  test('does not render options if menu is not opened', () => {
    const item1 = 'item one'
    const item2 = 'item two'

    const { queryByRole } = render(<MultiTest allItems={[item1, item2]} />)

    expect(queryByRole('option')).toBe(null)
  })

  const getOptions = (component: ComponentChild) =>
    renderAndOpen(component).getAllByRole('option')

  test('renders all items as options in opened menu', () => {
    const item1 = 'item one'
    const item2 = 'item two'

    const itemOptions = getOptions(<MultiTest allItems={[item1, item2]} />)

    expect(itemOptions.map((item) => item.textContent)).toEqual([item1, item2])
  })

  test('renders items using custom mapper if provided', () => {
    const item1 = 'item one'
    const item2 = 'item two'

    const expectedText = 'test'

    const itemOptions = getOptions(
      <MultiTest allItems={[item1, item2]} itemToString={() => expectedText} />
    )

    expect(itemOptions.map((item) => item.textContent)).toEqual([
      expectedText,
      expectedText,
    ])
  })

  test('passes updated selections to onChangeSelections when clicking an unselected item', () => {
    const unselectedItem = 'item 3'

    const selectedItems = ['item 1', 'item 2']

    const allItems = [...selectedItems, unselectedItem]

    const changeHandler = jest.fn()

    const itemOptions = getOptions(
      <MultiTest
        allItems={allItems}
        selectedItems={selectedItems}
        onChangeSelections={changeHandler}
      />
    )

    fireEvent.click(itemOptions.at(-1) as HTMLElement)

    expect(changeHandler.mock.calls[0][0]).toEqual(allItems)
  })

  test('passes updated selections to onChangeSelections when clicking a selected item', () => {
    const allItems = ['item 1', 'item 2', 'item 3']

    const expectedSelections = ['item 1', 'item 2']

    const changeHandler = jest.fn()

    const itemOptions = getOptions(
      <MultiTest
        allItems={allItems}
        selectedItems={allItems}
        onChangeSelections={changeHandler}
      />
    )

    fireEvent.click(itemOptions.at(-1) as HTMLElement)

    expect(changeHandler.mock.calls[0][0]).toEqual(expectedSelections)
  })
})
