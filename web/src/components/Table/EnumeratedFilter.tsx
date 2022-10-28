import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { usePopper } from 'react-popper'
import Portal from '../Portal/Portal'

import { dottedStringToObject } from '../../utils/object'

import Button from '../Button/Button'
import Input from '../Input/Input'
import { RadioGroup } from '../RadioGroup/RadioGroup'
import IsFiltered from './IsFiltered/IsFiltered'
import { SelectedFilters } from './Table'
import Checkbox from '../Checkbox/Checkbox'

export type EnumeratedFilterOptions = { label: string; value: string }[]

type EnumeratedFilterProps = {
  header: string
  options: EnumeratedFilterOptions
  column: string
  filter: string[] | undefined
  onFilterChanged: (filters: SelectedFilters) => void
  sort: string | undefined
}

export function EnumeratedFilter({
  header,
  options,
  column,
  filter = [],
  sort = '',
  onFilterChanged,
}: EnumeratedFilterProps) {
  const [sortedBy, setSortedBy] = useState(sort)
  const [filteredBy, setFilteredBy] = useState(filter)
  const [searchBy, setSearchBy] = useState<string>('')
  const [searchedOptions, setSearchedOptions] = useState(options)
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilters>({})

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
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
    const searched = !searchBy
      ? options
      : options.filter((o) =>
          o.label.toLowerCase().includes(searchBy.toLowerCase())
        )
    setSearchedOptions(searched)
  }, [searchBy])

  useEffect(() => {
    let updated: any = {}
    if (sortedBy) {
      const sort = dottedStringToObject(column, sortedBy)
      updated = { ...updated, sort }
    }
    if (filteredBy) {
      const filter = dottedStringToObject(column, filteredBy.join(','))
      updated = { ...updated, filter }
    }
    setSelectedFilter(updated)
  }, [sortedBy, filteredBy])

  function toggleFilterValue(value: string, to: boolean): void {
    let updated = []
    if (filteredBy.length === 0 && !to) {
      updated = [value]
    } else {
      updated = to
        ? [...filteredBy, value]
        : filteredBy.filter((f) => f !== value)
    }
    setFilteredBy(updated)
  }

  function selectAllSearched(
    searchedOptions: EnumeratedFilterOptions,
    to: boolean
  ): void {
    const values = searchedOptions.map((o) => o.value)
    const updated = to
      ? [...filteredBy, ...values.filter((v) => !filteredBy.includes(v))]
      : filteredBy.filter((f) => !values.includes(f))
    setFilteredBy(updated)
  }

  return (
    <Popover className="relative">
      {({ close, open }) => {
        useEffect(() => {
          if (!open) {
            // If the filter is closed without applying any filters, we do not want to hold
            // onto any state changed when it was opened. So reset the state to the the
            // defaults when the filter is closed.
            setSortedBy(sort)
            setFilteredBy(filter)
            setSearchBy('')
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
              <IsFiltered filtered={filter.join(',')} sorted={sort} />
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
                        value={searchBy}
                        onChange={(event) => setSearchBy(event.target.value)}
                        autoFocus
                      />
                      <div className="max-h-[220] w-full p-1 flex flex-col overflow-y-auto">
                        <div className="mb-2">
                          <Checkbox
                            id="select-all"
                            label="Select All"
                            name="Select All"
                            onChange={(v) =>
                              selectAllSearched(searchedOptions, v)
                            }
                            checked={searchedOptions.every(
                              (o) =>
                                filteredBy.includes(o.value) ||
                                filteredBy.length === 0
                            )}
                          />
                        </div>
                        {searchedOptions.map((option, i) => (
                          <div className="mb-2" key={`${option.value}${i}`}>
                            <Checkbox
                              id={`${option.value}`}
                              label={option.label}
                              name={`${option.value}`}
                              onChange={(v) =>
                                toggleFilterValue(option.value, v)
                              }
                              checked={
                                filteredBy.includes(option.value) ||
                                filteredBy.length === 0
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <hr />
                      <div className="-mb-4">
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
                      </div>
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

export default EnumeratedFilter
