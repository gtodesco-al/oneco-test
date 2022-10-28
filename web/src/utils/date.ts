import {
  getDaysInMonth,
  format,
  subMonths,
  addMonths,
  getMonth,
  getYear,
  isEqual,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  set,
  startOfMonth,
  subDays,
  getDate,
  addDays,
  endOfMonth,
} from 'date-fns'

export type CurrentCalendarProps = {
  dateFormat: string
  date: Date
  isToday: boolean
  isSelected: boolean
  isCurrentMonth: boolean
}

export const currentMonth = set(new Date(), {
  date: 1,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
})

export const isFirstDayOfMonthMonday = (date: Date) => {
  const startMonthDate = startOfMonth(date)

  return isMonday(startMonthDate)
}

export const isFirstDayOfMonthTuesday = (date: Date) => {
  const startMonthDate = startOfMonth(date)

  return isTuesday(startMonthDate)
}

export const isFirstDayOfMonthWednesday = (date: Date) => {
  const startMonthDate = startOfMonth(date)

  return isWednesday(startMonthDate)
}

export const isFirstDayOfMonthThursday = (date: Date) => {
  const startMonthDate = startOfMonth(date)

  return isThursday(startMonthDate)
}

export const isFirstDayOfMonthFriday = (date: Date) => {
  const startMonthDate = startOfMonth(date)

  return isFriday(startMonthDate)
}

export const isFirstDayOfMonthSaturday = (date: Date) => {
  const startMonthDate = startOfMonth(date)

  return isSaturday(startMonthDate)
}

export const isFirstDayOfMonthSunday = (date: Date) => {
  const startMonthDate = startOfMonth(date)

  return isSunday(startMonthDate)
}

export const isLastDayOfMonthMonday = (date: Date) => {
  const endMonthDate = endOfMonth(date)

  return isMonday(endMonthDate)
}

export const isLastDayOfMonthTuesday = (date: Date) => {
  const endMonthDate = endOfMonth(date)

  return isTuesday(endMonthDate)
}

export const isLastDayOfMonthWednesday = (date: Date) => {
  const endMonthDate = endOfMonth(date)

  return isWednesday(endMonthDate)
}

export const isLastDayOfMonthThursday = (date: Date) => {
  const endMonthDate = endOfMonth(date)

  return isThursday(endMonthDate)
}

export const isLastDayOfMonthFriday = (date: Date) => {
  const endMonthDate = endOfMonth(date)

  return isFriday(endMonthDate)
}

export const isLastDayOfMonthSaturday = (date: Date) => {
  const endMonthDate = endOfMonth(date)

  return isSaturday(endMonthDate)
}

export const isLastDayOfMonthSunday = (date: Date) => {
  const endMonthDate = endOfMonth(date)

  return isSunday(endMonthDate)
}

export const getDaysByMonth = (date: Date) => {
  const daysInMonth = getDaysInMonth(date)
  const daysInList = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return daysInList
}

export const getLastMonth = (date: Date) => {
  return subMonths(date, 1)
}

export const getLastMonthByDays = (date: Date, days: number) => {
  return subDays(date, days)
}

export const getNextMonth = (date: Date) => {
  return addMonths(date, 1)
}

export const getNextMonthByDays = (date: Date, days: number) => {
  return addDays(date, days)
}

export const getCalendarMonth = (date: Date) => {
  return format(date, 'MMMM yyyy')
}

export const getDaysBeforeMonth = (date: Date) => {
  if (isFirstDayOfMonthMonday(date)) {
    return 0
  }

  if (isFirstDayOfMonthTuesday(date)) {
    return 1
  }

  if (isFirstDayOfMonthWednesday(date)) {
    return 2
  }

  if (isFirstDayOfMonthThursday(date)) {
    return 3
  }

  if (isFirstDayOfMonthFriday(date)) {
    return 4
  }

  if (isFirstDayOfMonthSaturday(date)) {
    return 5
  }

  if (isFirstDayOfMonthSunday(date)) {
    return 6
  }

  return 0
}

export const getDaysAfterMonth = (date: Date) => {
  if (isLastDayOfMonthMonday(date)) {
    return 6
  }

  if (isLastDayOfMonthTuesday(date)) {
    return 5
  }

  if (isLastDayOfMonthWednesday(date)) {
    return 4
  }

  if (isLastDayOfMonthThursday(date)) {
    return 3
  }

  if (isLastDayOfMonthFriday(date)) {
    return 2
  }

  if (isLastDayOfMonthSaturday(date)) {
    return 1
  }

  if (isLastDayOfMonthSunday(date)) {
    return 0
  }

  return 6
}

export const getCalendar = (date: Date): CurrentCalendarProps[] => {
  const currentSelectedMonth = getMonth(date)
  const currentSelectedYear = getYear(date)
  const daysInMonth = getDaysByMonth(date)

  const daysBeforeMonth = getDaysBeforeMonth(date)
  const initialLastMonth = getLastMonthByDays(date, daysBeforeMonth)
  const previousDaysInMonth = getDaysByMonth(initialLastMonth).splice(
    getDate(initialLastMonth) - 1
  )

  const daysAfterMonth = getDaysAfterMonth(date)
  const initialNextMonth = getNextMonthByDays(endOfMonth(date), daysAfterMonth)
  const nextDaysInMonth = getDaysByMonth(initialNextMonth).slice(
    0,
    getDate(initialNextMonth)
  )

  const previousMonthCalendar = daysBeforeMonth
    ? previousDaysInMonth.map((day) => ({
        dateFormat: format(
          new Date(currentSelectedYear, currentSelectedMonth - 1, day),
          'yyyy-MM-dd'
        ),
        date: new Date(currentSelectedYear, currentSelectedMonth - 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      }))
    : []

  const currentMonthCalendar = daysInMonth.map((day) => {
    const date = new Date(currentSelectedYear, currentSelectedMonth, day)
    const isEqualDates = isEqual(date, currentMonth)

    return {
      dateFormat: format(date, 'yyyy-MM-dd'),
      date,
      isCurrentMonth: true,
      isToday: isEqualDates,
      isSelected: false,
    }
  })

  const nextMonthCalendar = daysAfterMonth
    ? nextDaysInMonth.map((day) => ({
        dateFormat: format(
          new Date(currentSelectedYear, currentSelectedMonth + 1, day),
          'yyyy-MM-dd'
        ),
        date: new Date(currentSelectedYear, currentSelectedMonth + 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      }))
    : []

  return [
    ...previousMonthCalendar,
    ...currentMonthCalendar,
    ...nextMonthCalendar,
  ]
}
