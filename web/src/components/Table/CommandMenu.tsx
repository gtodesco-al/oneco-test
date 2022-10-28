import { Fragment, useState } from 'react'
import classNames from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import Portal from '../Portal/Portal'
import Button from '../Button/Button'
import { usePopper } from 'react-popper'

import { OptionsColumnOption, TableColumn, TableRow } from './Table'

export type CommandMenu = {
  column: TableColumn
  rowIndex: number
  row: TableRow
  setActiveRow: (arg0: any) => void
}

const CommandMenu = ({ column, rowIndex, row, setActiveRow }: CommandMenu) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [20, 0],
        },
      },
    ],
  })

  function shouldDisplayOption(
    option: OptionsColumnOption,
    row: TableRow
  ): boolean {
    if (option.active) {
      return typeof option.active === 'function'
        ? option.active(row)
        : option.active
    }
    return false
  }

  return (
    <div className="md:flex-shrink-0 md:flex md:items-center">
      <Menu as="div" className="">
        <div>
          <Menu.Button
            className="bg-white rounded-full flex text-sm focus:outline-none"
            onClick={() => setActiveRow(rowIndex)}
            ref={setReferenceElement}
          >
            <DotsHorizontalIcon className="w-4 text-primary-700" />
          </Menu.Button>
        </div>
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  {column.options?.map(
                    (option: OptionsColumnOption, index: number) =>
                      shouldDisplayOption(option, row) && (
                        <Menu.Item key={`col-menu-item-${index}`}>
                          {({ active }) => (
                            <Button
                              onClick={() => option.onOptionClick(row)}
                              buttonType="outline"
                              className={classNames(
                                'flex px-4 py-2 text-sm w-full text-gray-700',
                                {
                                  'bg-gray-100': active,
                                }
                              )}
                            >
                              {typeof option.text === 'function'
                                ? option.text(row)
                                : option.text}
                              <ChevronRightIcon className="ml-auto h-5 w-5 section-icon" />
                            </Button>
                          )}
                        </Menu.Item>
                      )
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Portal>
      </Menu>
    </div>
  )
}

export default CommandMenu
