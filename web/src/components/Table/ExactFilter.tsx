import { Fragment, useEffect, useState } from 'react'
import { Transition, Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { usePopper } from 'react-popper'

import { dottedStringToObject } from '../../utils/object'

import Portal from '../Portal/Portal'
import Button from '../Button/Button'
import Input from '../Input/Input'
import IsFiltered from './IsFiltered/IsFiltered'
import { RadioGroup } from '../RadioGroup/RadioGroup'
import { SelectedFilters } from './Table'

type ExactFilterProps = {
  header: string
  column: string
  filter: string | undefined
  onFilterChanged: (filters: SelectedFilters) => void
  sort: string | undefined
}

export function ExactFilter({
  header,
  column,
  filter = '',
  sort = '',
  onFilterChanged,
}: ExactFilterProps) {
  const [sortedBy, setSortedBy] = useState(sort)
  const [filteredBy, setFilteredBy] = useState(filter)
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilters>({})

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [40, 0],
        },
      },
    ],
  })

  useEffect(() => {
    let updated: any = {}
    if (sortedBy) {
      const sort = dottedStringToObject(column, sortedBy)
      updated = { ...updated, sort }
    }
    if (filteredBy) {
      const filter = dottedStringToObject(column, filteredBy)
      updated = { ...updated, filter }
    }
    setSelectedFilter(updated)
  }, [sortedBy, filteredBy])

  // We use this to indicate the user has clicked 'Clear Filters' at a higher level
  useEffect(() => {
    if (!sort) setSortedBy('')
    if (!filter) setFilteredBy('')
  }, [filter, sort])

  return (
    <Popover className="relative mr-2">
      {({ close, open }) => {
        useEffect(() => {
          // If the filter is closed without applying any filters, we do not want to hold
          // onto any state changed when it was opened. So reset the state to the the
          // defaults when the filter is closed.
          if (!open) {
            setFilteredBy(filter)
            setSortedBy(sort)
          }
        }, [open])

        return (
          <>
            <Popover.Button
              className="bg-transparent rounded-full flex focus:outline-none cursor-pointer"
              ref={setReferenceElement}
              as="div"
            >
              <div className="py-3">{header}</div>
              <IsFiltered filtered={filter} sorted={sort} />
              <Button
                buttonType="outline"
                className="p-0 bg-transparent hover:bg-transparent"
                icon={<ChevronDownIcon className="w-6 ml-3" />}
              />
            </Popover.Button>
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
                  <Popover.Panel className="origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="bg-white p-4 rounded min-w-[260]">
                      <Input
                        placeholder="Search"
                        className="mb-2"
                        value={filteredBy}
                        onChange={(event) => setFilteredBy(event.target.value)}
                      />

                      <RadioGroup
                        name={column}
                        options={[
                          {
                            label: 'SORT A - Z',
                            value: 'ASC',
                          },
                          {
                            label: 'SORT Z - A',
                            value: 'DESC',
                          },
                        ]}
                        outline
                        verticalOptions
                        selectedValue={sortedBy}
                        onChange={(value) => setSortedBy(value)}
                      />
                      <hr />
                      <div className="flex w-full mt-4">
                        <Button
                          className="bg-gray-50 hover:bg-gray-200 border border-gray-200 w-full mr-2 text-gray-900"
                          onClick={() => {
                            close()
                            onFilterChanged({})
                          }}
                        >
                          Clear
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => {
                            close()
                            onFilterChanged(selectedFilter)
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            </Portal>
          </>
        )
      }}
    </Popover>
  )
}

export default ExactFilter
