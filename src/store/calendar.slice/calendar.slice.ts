import { createSlice, current, nanoid } from '@reduxjs/toolkit';
import { Calendar, Holiday, SelectedView } from '../../models'
import generateCalendar from '../../utils'

interface TodosState {
  calendar: Calendar,
  selectedYear: number
  selectedMonth: number
  selectedDay: number
  selectedView: SelectedView
}

const currentDate: Date = new Date();
const currentYear = currentDate.getFullYear()
const startYear = currentYear - 1
const endYear = currentYear + 5
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

const initialState: TodosState = {
  calendar: generateCalendar(startYear, endYear),
  selectedYear: currentYear,
  selectedMonth: currentMonth,
  selectedDay: currentDay,
  selectedView: SelectedView.MONTH,
}

export const CalendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setHolidays(state, action) {
      const holidays: Holiday[] = action.payload.holidays.filter((holiday: Holiday) => holiday.global).map((holiday: Holiday) => {

        const month = +holiday.date?.split('-')?.[1]
        const day = +holiday.date?.split('-')?.[2]

        return { ...holiday, month, day: day, id: nanoid() }
      })

      if (!holidays.length) {
        return state
      }

      const tempCalendar = structuredClone(current(state.calendar))
      const tempYear = tempCalendar[action.payload.year]

      holidays.forEach((holiday) => {

        if (holiday.month && holiday.day) {
          const tempDay = tempYear.months[holiday.month].days[holiday.day]
          console.log(tempYear.months[holiday.month])
          tempDay['holidays'] = [...tempDay.holidays, holiday]
        }
      })

      state.calendar = tempCalendar
    },
    setSelectedYear(state, action) {
      state.selectedYear = action.payload
    },
    setNextMonth(state) {
      const nextMonth = state.selectedMonth + 1

      if (state.selectedMonth === 12 && state.selectedYear < endYear) {
        state.selectedYear = state.selectedYear + 1
        state.selectedMonth = 1
      } else if (state.selectedMonth < 13 && state.selectedYear < endYear) {
        state.selectedMonth = nextMonth
      }
    },
    setPrevMonth(state) {
      const prevMonth = state.selectedMonth - 1

      if (state.selectedMonth === 1 && state.selectedYear > currentYear) {
        state.selectedYear = state.selectedYear - 1
        state.selectedMonth = 12
      } else if (prevMonth > 0) {
        state.selectedMonth = prevMonth
      }
    },
    setSelectedView(state, action) {
      state.selectedView = action.payload
    }
  }
})

export const calendarActions = CalendarSlice.actions
export const calendarReducer = CalendarSlice.reducer
