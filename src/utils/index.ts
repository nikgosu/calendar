import { Calendar, Day, Month, Year } from '../models'
import { nanoid } from '@reduxjs/toolkit'

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateCalendar = (startYear: number, endYear: number) => {

  const calendar: any = {}

  for (let year = startYear; year <= endYear; year++) {
    const yearData: any = {
      value: year,
      months: {} as any,
    };

    const yearId = nanoid()

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const monthId = nanoid()

      const monthData: any = {
        value: month + 1,
        monthName: monthNames[month],
        days: {} as any,
        yearValue: yearData.value,
        yearId
      };

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })

        const dayId = nanoid()

        monthData.days[dayId] = {
          value: day,
          dayOfWeek: dayOfWeek,
          holidays: [],
          monthId,
          yearId
        }
      }

      yearData.months[monthId] = monthData
    }

    calendar[yearId] = yearData
  }

  return calendar;
}

export default generateCalendar
