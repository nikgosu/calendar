import { Calendar, Day, Month, Year } from '../models'
import { nanoid } from '@reduxjs/toolkit'

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateCalendar = (startYear: number, endYear: number) => {

  const calendar: Calendar = [];

  for (let year = startYear; year <= endYear; year++) {
    const yearData: Year = {
      value: year,
      months: [] as Month[],
      id: nanoid()
    };

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const monthData: Month = {
        value: month + 1,
        monthName: monthNames[month],
        days: [] as Day[],
        id: nanoid(),
        yearValue: yearData.value,
        yearId: yearData.id
      };

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

        monthData.days.push({
          value: day,
          dayOfWeek: dayOfWeek,
          holidays: [],
          id: nanoid(),
          monthId: monthData.id,
          yearId: yearData.id
        });
      }

      yearData.months.push(monthData);
    }

    calendar.push(yearData);
  }

  return calendar;
}

export default generateCalendar
