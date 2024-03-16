import { Calendar, Days, Holiday, Month, Months, Year } from '../models'
import { nanoid } from '@reduxjs/toolkit'
import { MONTH_NAMES, WEEKDAY_NAMES } from '../consts'

const generateCalendar = (startYear: number, endYear: number): Calendar => {

  const calendar: Calendar = {}

  for (let year = startYear; year <= endYear; year++) {
    const yearData: Year = {
      value: year,
      months: {} as Months,
      id: nanoid()
    };

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate()

      const monthData: Month = {
        value: month + 1,
        monthName: MONTH_NAMES[month],
        days: {} as Days,
        yearValue: yearData.value,
        yearId: yearData.id,
        id: nanoid()
      };

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })

        monthData.days[day] = {
          value: day,
          dayOfWeek: dayOfWeek,
          dayOfWeekNumber: WEEKDAY_NAMES.indexOf(dayOfWeek) + 1,
          holidays: [] as Holiday[],
          tasks: [] as any,
          monthId: monthData.id,
          monthValue: monthData.value,
          yearId: yearData.id,
          yearValue: yearData.value,
          id: nanoid(),
          isFirst: day === 1,
          isLast: day === daysInMonth,
          disabled: false
        }
      }

      yearData.months[month + 1] = monthData
    }

    calendar[yearData.value] = yearData
  }

  return calendar;
}

export default generateCalendar
