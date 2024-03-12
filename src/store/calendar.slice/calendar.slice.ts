import { createSlice, nanoid } from '@reduxjs/toolkit';
import { Calendar, Holiday, SelectedView } from '../../models'
import generateCalendar from '../../utils'

interface TodosState {
  calendar: Calendar,
  selectedYear: number
  selectedMonth: number
  selectedView: SelectedView
  isHolidaysLoading: boolean
}

const currentYear = new Date().getFullYear()
const endYear = 2030

const initialState: TodosState = {
  calendar: generateCalendar(currentYear, endYear),
  selectedYear: currentYear,
  selectedMonth: 1,
  selectedView: SelectedView.MONTH,
  isHolidaysLoading: false
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

      console.log(holidays)

      if (!holidays.length) {
        return state
      }

      state.calendar = state.calendar.map(yearObject => {
        if (yearObject.year === action.payload.year) {
          const months = [...yearObject.months]

          holidays.forEach((holiday) => {
            const temptMonth = months.find(monthsObject => monthsObject.month === holiday.month)
            const tempDay = temptMonth?.days.find(dayObject => dayObject.day === holiday.day)

            if (tempDay && tempDay.holidays) {
              tempDay.holidays = [ ...tempDay.holidays, holiday ]
            }
          })

          return { ...yearObject, months }
        } else {
          return { ...yearObject }
        }
      })
    },
    setSelectedYear(state, action) {
      state.selectedYear = action.payload
    },
    setNextMonth(state) {
      const nextMonth = state.selectedMonth + 1

      if (nextMonth > 12 && state.selectedYear < endYear) {
        state.selectedYear = state.selectedYear + 1
        state.selectedMonth = 1
      } else if (nextMonth < 12 && state.selectedYear < endYear) {
        state.selectedMonth = nextMonth
      }
    },
    setPrevMonth(state) {
      const prevMonth = state.selectedMonth - 1

      if (prevMonth < 1 && currentYear > state.selectedYear) {
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
