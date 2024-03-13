import { Calendar, Days, Holiday, Month, Months, Year } from '../models'
import { nanoid } from '@reduxjs/toolkit'

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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
        monthName: monthNames[month],
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
          holidays: [] as Holiday[],
          monthId: monthData.id,
          yearId: yearData.id,
          id: nanoid()
        }
      }

      yearData.months[month + 1] = monthData
    }

    calendar[yearData.value] = yearData
  }

  return calendar;
}

export default generateCalendar
