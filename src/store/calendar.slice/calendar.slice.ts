import { createSlice } from '@reduxjs/toolkit';
import { Calendar } from '../../models'
import generateCalendar from '../../utils'

interface TodosState {
  calendar: Calendar,
  log: any
  isHolidaysLoading: boolean
}

const initialState: TodosState = {
  calendar: generateCalendar(),
  log: false,
  isHolidaysLoading: false
}

export const CalendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setHolidays(state, action) {

      const holidays = action.payload.holidays.map((holiday: any) => {

        const month = +holiday.date?.split('-')?.[1]
        const day = +holiday.date?.split('-')?.[2]

        return { ...holiday, month, day: day }
      })

      if (!holidays.length) {
        return state
      }

      state.calendar = state.calendar.map(yearObject => {
        if (yearObject.year === action.payload.year) {
          const months = [...yearObject.months]

          holidays.forEach((holiday: any) => {
            const temptMonth = months.find(monthsObject => monthsObject.month === holiday.month)
            const tempDay = temptMonth?.days.find(dayObject => dayObject.day === holiday.day)

            if (tempDay) {
              tempDay.holiday = holiday
            }
          })

          return { ...yearObject, months }
        } else {
          return { ...yearObject }
        }
      })
    }
  }
})

export const calendarActions = CalendarSlice.actions
export const calendarReducer = CalendarSlice.reducer
