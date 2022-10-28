import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { Fragment } from 'react'

export interface MultipleSelectProps<T> {
  defaultText?: string
  allItems: Array<T>
  selectedItems: Array<T>
  onChangeSelections: (newSelections: Array<T>) => void
  itemToString?: (value: T) => string
}

function selectedItemsToString<T>(
  defaultText: string,
  selectedItems: T[],
  toString: (item: T) => string
) {
  if (selectedItems.length === 0) {
    return defaultText
  }

  const firstItem = toString(selectedItems[0])

  if (selectedItems.length === 1) {
    return firstItem
  }

  return `${firstItem} +${selectedItems.length - 1}`
}

const defaultToString = (value: { toString?: () => string }) =>
  value.toString ? value.toString() : JSON.stringify(value)

export function MultipleSelect<T>({
  defaultText = 'Make a Selection',
  allItems,
  selectedItems,
  onChangeSelections,
  itemToString = defaultToString,
}: MultipleSelectProps<T>) {
  const selectedItemsName = selectedItemsToString(
    defaultText,
    selectedItems,
    itemToString
  )

  return (
    <Listbox
      as="div"
      className="text-sm font-medium text-gray-900 relative"
      value={selectedItems}
      onChange={onChangeSelections}
      multiple
    >
      {({ open }) => (
        <>
          <Listbox.Button className="w-full h-11 bg-white border border-gray-300 rounded-md p-3 flex justify-between items-center cursor-default">
            <span
              className={classNames('truncate', {
                'text-gray-500': selectedItems.length === 0,
              })}
            >
              {selectedItemsName}
            </span>

            <ChevronDownIcon className="text-gray-500 h-full" />
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full z-10 mt-2 bg-white border border-gray-50 shadow-lg max-h-60 rounded-md p-2 flex flex-col cursor-default select-none">
              {allItems.map((item, i) => (
                <Listbox.Option
                  key={i}
                  className="p-3 h-11 flex justify-between rounded-md hover:bg-gray-100"
                  value={item}
                >
                  {itemToString(item)}

                  <span
                    className={classNames(
                      'h-4 w-4 border bg-white text-white rounded-[0.25rem]',
                      {
                        'border-blue-700 bg-blue-700':
                          selectedItems.includes(item),
                      }
                    )}
                    aria-hidden
                  >
                    <CheckIcon />
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  )
}
