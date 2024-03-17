import { Calendar, Day, Holiday } from '../models'
import { nanoid } from '@reduxjs/toolkit'

export const getGhostDays = (amount: number, monthValue: number) => {
  return Array.from({ length: amount }, () => new Day(true, nanoid(), monthValue))
}
const getDaysRows = (arr: any[], daysPerRow: number) => {
  let result = [];
  for (let i = 0; i < arr.length; i += daysPerRow) {
    result.push(arr.slice(i, i + daysPerRow));
  }
  return result;
}

export const getTasks = (calendar: Calendar, year: number, month: number, day: number) => {
  return calendar[year].months[month].days[day].tasks
}

export const getComputedHolidays = (holidays: Holiday[]): Holiday[] => {
  return holidays.filter((holiday: Holiday) => holiday.global).map((holiday: Holiday) => {

    const month = +holiday.date?.split('-')?.[1]
    const day = +holiday.date?.split('-')?.[2]

    return { ...holiday, month, day: day, id: nanoid() }
  })
}

export const getComputedCalendar = (calendar: Calendar, year: number, holidays: Holiday[]) => {
  const tempCalendar: Calendar = calendar
  const tempYear = tempCalendar[year]

  holidays.forEach((holiday) => {

    if (holiday.month && holiday.day) {
      const tempDay = tempYear.months[holiday.month].days[holiday.day]

      if (!tempDay?.holidays?.length && Array.isArray(tempDay.holidays)) {
        tempDay.holidays = [...tempDay.holidays, holiday]
      }
    }
  })
  return tempCalendar
}

export const getMonthDays = (calendar: Calendar, year: number, selectedMonth: number) => {
  const prevMonthDays: Day[] = Object.values((calendar[year].months[selectedMonth - 1]?.days ?? calendar[year - 1]?.months?.[12]?.days) ?? {})
  const currentMonthDays: Day[] = Object.values(calendar[year].months[selectedMonth]?.days ?? {})
  const nextMonthDays: Day[] = Object.values((calendar[year].months[selectedMonth + 1]?.days ?? calendar[year + 1]?.months?.[1]?.days) ?? {})

  return [prevMonthDays, currentMonthDays, nextMonthDays]
}

export const getDaysForView = (prevMonthDays: Day[], currentMonthDays: Day[], nextMonthDays: Day[], month: number, daysPerRow: number) => {
  let tempDaysForView = [...currentMonthDays]

  const missingDaysBeforeAmount = currentMonthDays[0]?.dayOfWeekNumber - 1
  const missingDaysAfterAmount = 7 - currentMonthDays[currentMonthDays.length - 1]?.dayOfWeekNumber

  if (missingDaysBeforeAmount) {
    const missingDaysBefore = prevMonthDays.slice(prevMonthDays.length - missingDaysBeforeAmount)
    const fillerDays = getGhostDays(missingDaysBeforeAmount, month - 1)

    tempDaysForView = [...(missingDaysBefore.length ? missingDaysBefore : fillerDays), ...tempDaysForView]
  }

  if (missingDaysAfterAmount) {
    const missingDaysAfter = nextMonthDays.slice(0, missingDaysAfterAmount)
    const fillerDays = getGhostDays(missingDaysAfterAmount, month - 1)

    tempDaysForView = [...tempDaysForView, ...(missingDaysAfter.length ? missingDaysAfter : fillerDays)]
  }

  return getDaysRows(tempDaysForView, daysPerRow)
}

export const getFilteredDaysForView = (daysForView: Day[][], query: string) => {
  return daysForView.map((week: Day[]) => week.map(day => ({
    ...day,
    tasks: day.tasks.filter(task => task.taskDescription?.includes(query))
  })));
}

export const getDragDropInfoString = (day: Day) => {
  return JSON.stringify({
    yearValue: day.yearValue,
    monthValue: day.monthValue,
    dayValue: day.value,
    dayId: day.id
  })
}
