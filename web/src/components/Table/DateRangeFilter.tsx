import { isEmpty } from 'lodash'
import { Fragment, useCallback, useEffect, useState } from 'react'
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  isBefore,
  isAfter,
  startOfToday,
  startOfYesterday,
} from 'date-fns'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'
import { Transition, Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import Portal from '../Portal/Portal'

import {
  CurrentCalendarProps,
  currentMonth,
  getCalendarMonth,
  getCalendar,
  getLastMonth,
  getNextMonth,
} from '../../utils/date'

import Button from '../Button/Button'
import Input from '../Input/Input'
import IsFiltered from './IsFiltered/IsFiltered'
import { RadioGroup } from '../RadioGroup/RadioGroup'

import { SelectedFilters } from './Table'

type DateRangeFilterProps = {
  header: string
  column: string
  filter?: Partial<{ $gte: number; $lte: number }>
  sort?: string
  onFilterChanged: (filters: SelectedFilters) => void
}

type SelectedMonth = {
  date: Date
  calendarMonth: string
}

type DateRangeOption = {
  label: string
  startDate?: number
  endDate?: number
}

const dateRangeOptions: DateRangeOption[] = [
  { label: 'All Time' },
  {
    label: 'Today',
    startDate: startOfToday().getTime(),
  },
  {
    label: 'Yesterday',
    startDate: startOfYesterday().getTime(),
  },
  {
    label: 'This week',
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }).getTime(),
    endDate: endOfWeek(new Date(), { weekStartsOn: 1 }).getTime(),
  },
  {
    label: 'Last week',
    startDate: startOfWeek(subWeeks(new Date(), 1), {
      weekStartsOn: 1,
    }).getTime(),
    endDate: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }).getTime(),
  },
  {
    label: 'Last 30 Days',
    startDate: subDays(new Date(), 30).getTime(),
    endDate: new Date().getTime(),
  },
  {
    label: 'Last 90 Days',
    startDate: subDays(new Date(), 90).getTime(),
    endDate: new Date().getTime(),
  },
  {
    label: 'This Month',
    startDate: startOfMonth(new Date()).getTime(),
    endDate: endOfMonth(new Date()).getTime(),
  },
  {
    label: 'Last Month',
    startDate: startOfMonth(subMonths(new Date(), 1)).getTime(),
    endDate: endOfMonth(subMonths(new Date(), 1)).getTime(),
  },
]

const DateRangeFilter = ({
  header,
  column,
  sort = '',
  filter = {},
  onFilterChanged,
}: DateRangeFilterProps) => {
  const [datesOfMonth, setDatesOfMonth] = useState<CurrentCalendarProps[]>([])
  const [selectedMonth, setSelectedMonth] = useState<SelectedMonth>(
    {} as SelectedMonth
  )

  const [sortedBy, setSortedBy] = useState(sort)
  const [startDate, setStartDate] = useState<number>(0)
  const [endDate, setEndDate] = useState<number>(0)
  const [dateRangeText, setDateRangeText] = useState<string>('All Time')
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
    setDatesOfMonth(getCalendar(currentMonth))
    setSelectedMonth({
      date: currentMonth,
      calendarMonth: getCalendarMonth(currentMonth),
    })
  }, [])

  const handlePreviousMonth = useCallback((date: Date) => {
    const lastMonth = getLastMonth(date)
    setSelectedMonth({
      date: lastMonth,
      calendarMonth: getCalendarMonth(lastMonth),
    })
    setDatesOfMonth(getCalendar(lastMonth))
  }, [])

  const handleNextMonth = useCallback((date: Date) => {
    const nextMonth = getNextMonth(date)
    setSelectedMonth({
      date: nextMonth,
      calendarMonth: getCalendarMonth(nextMonth),
    })
    setDatesOfMonth(getCalendar(nextMonth))
  }, [])

  const selectDateRange = useCallback((range: DateRangeOption) => {
    setStartDate(range.startDate || 0)
    setEndDate(range.endDate || 0)
  }, [])

  useEffect(() => {
    const startDate = filter && filter?.$gte ? filter.$gte * 1000 : 0
    setStartDate(startDate)

    const endDate = filter && filter?.$lte ? filter.$lte * 1000 : 0
    setEndDate(endDate)
  }, [filter.$gte, filter.$lte])

  useEffect(() => {
    if (!startDate) {
      setDateRangeText('All Time')
      return
    }

    const start = format(startDate, 'MM/dd/yyyy')
    if (endDate) {
      const end = format(endDate, 'MM/dd/yyyy')
      setDateRangeText(`${start} - ${end}`)
    } else {
      setDateRangeText(start)
    }
  }, [startDate, endDate])

  useEffect(() => {
    let selected = {}
    if (sortedBy) {
      selected = { ...selected, sort: { [column]: sortedBy } }
    }

    let filtered = {}
    if (startDate > 0) {
      filtered = {
        ...filtered,
        $gte: parseInt(`${startDate / 1000}`),
      }
    }
    if (endDate > 0) {
      filtered = {
        ...filtered,
        $lte: parseInt(`${endDate / 1000}`),
      }
    }

    selected = { ...selected, filter: { [column]: filtered } }
    setSelectedFilter(selected)
  }, [sortedBy, startDate, endDate])

  function selectDate(date: Date): void {
    const selected = date.getTime()
    if (selected === startDate) {
      setStartDate(0)
      setEndDate(0)
      return
    }

    if (startDate && endDate) {
      setStartDate(selected)
      setEndDate(0)
      return
    }

    if (!startDate) {
      setStartDate(selected)
    } else {
      if (isBefore(selected, startDate)) {
        const endOfStart = endOfDay(new Date(startDate)).getTime()
        setEndDate(endOfStart)
        setStartDate(selected)
      } else {
        const endOfSelected = endOfDay(date).getTime()
        setEndDate(endOfSelected)
      }
    }
  }

  function isSelectedDate(date: Date): boolean {
    const time = date.getTime()
    if (startDate === time) return true
    if (endDate === time) return true
    if (isAfter(time, startDate) && isBefore(time, endDate)) return true
    return false
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
            setStartDate(0)
            setEndDate(0)
            setDateRangeText('All Time')
          }
        }, [open])

        return (
          <>
            <Popover.Button
              ref={setReferenceElement}
              as="div"
              className="bg-transparent rounded-full flex focus:outline-none cursor-pointer"
            >
              <div className="py-3">{header}</div>
              <IsFiltered
                filtered={isEmpty(filter) ? '' : 'filtered'}
                sorted={sort}
              />
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
                  <Popover.Panel className="origin-top-right absolute right-0 mt-2 p-4 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="flex flex-col">
                      <Input
                        placeholder={dateRangeText}
                        className="mb-2"
                        disabled
                        value={dateRangeText}
                      />
                      <div className="flex flex-row py-4">
                        <div className="flex flex-col justify-between pr-4 w-[160]">
                          {dateRangeOptions.map((dateRange) => (
                            <div
                              key={dateRange.label}
                              className={classNames(
                                'relative flex items-center justify-between cursor-pointer rounded-md',
                                'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                                'group flex items-center text-left text-sm font-medium section child'
                              )}
                            >
                              <Button
                                onClick={() => selectDateRange(dateRange)}
                                className="relative hover:bg-transparent"
                                buttonType="outline"
                              >
                                {dateRange.label}
                              </Button>
                              <ChevronRightIcon className="w-5 h-5 text-gray-500 hover:text-gray-900 text-right hidden group-hover:block" />
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                              onClick={() =>
                                handlePreviousMonth(selectedMonth.date)
                              }
                            >
                              <span className="sr-only">Previous month</span>
                              <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                            <h2 className="font-semibold text-gray-900">
                              {selectedMonth.calendarMonth}
                            </h2>
                            <button
                              type="button"
                              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                              onClick={() =>
                                handleNextMonth(selectedMonth.date)
                              }
                            >
                              <span className="sr-only">Next month</span>
                              <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <div className="mt-4 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                            <div>S</div>
                          </div>
                          <div className="mt-2 grid grid-cols-7 text-sm">
                            {datesOfMonth.map((day, dayIdx) => (
                              <div
                                key={day.dateFormat}
                                className={classNames(
                                  dayIdx > 6 && 'border-t border-gray-200',
                                  'py-2'
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => selectDate(day.date)}
                                  className={classNames(
                                    day.isCurrentMonth && 'text-gray-900',
                                    !day.isCurrentMonth && 'text-gray-400',
                                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200',
                                    isSelectedDate(day.date)
                                      ? 'bg-blue-300'
                                      : ''
                                  )}
                                >
                                  <time dateTime={day.dateFormat}>
                                    {day.dateFormat
                                      .split('-')
                                      .pop()
                                      ?.replace(/^0/, '')}
                                  </time>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="-mb-4 normal-case">
                      <RadioGroup
                        name={column}
                        options={[
                          {
                            label: 'Sort Newest - Oldest',
                            value: 'DESC',
                          },
                          {
                            label: 'Sort Oldest - Newest',
                            value: 'ASC',
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

export default DateRangeFilter
