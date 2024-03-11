import { Calendar, Day, Month, Year } from '../models'

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateCalendar = () => {
  const startYear = 2024;
  const endYear = 2030;

  const calendar: Calendar = [];

  for (let year = startYear; year <= endYear; year++) {
    const yearData: Year = {
      year: year,
      months: [] as Month[],
    };

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const monthData: Month = {
        month: month + 1,
        monthName: monthNames[month],
        days: [] as Day[],
      };

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

        monthData.days.push({
          day: day,
          dayOfWeek: dayOfWeek,
        });
      }

      yearData.months.push(monthData);
    }

    calendar.push(yearData);
  }

  return calendar;
}

export default generateCalendar
