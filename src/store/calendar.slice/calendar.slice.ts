import { createSlice, current, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Calendar, Day, Holiday, SELECTED_VIEW, Task } from '../../models'
import { generateCalendar, getDaysRows, getGhostDays } from '../../utils'
import { TaskActionsPayload, HolidaysPayload, TaskMovePayload } from '../models'

interface CalendarState {
  calendar: Calendar,
  selectedYear: number
  selectedMonth: number
  selectedDay: number
  selectedView: SELECTED_VIEW,
  daysForView: Day[][]
}

const currentDate: Date = new Date();
const currentYear = currentDate.getFullYear()
const startYear = currentYear - 3
const endYear = currentYear + 5
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

const initialState: CalendarState = {
  calendar: generateCalendar(startYear, endYear),
  selectedYear: currentYear,
  selectedMonth: currentMonth,
  selectedDay: currentDay,
  selectedView: SELECTED_VIEW.MONTH,
  daysForView: []
}

export const CalendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setHolidays(state, action: PayloadAction<HolidaysPayload>) {

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

          if (!tempDay.holidays.length) {
            tempDay.holidays = [...tempDay.holidays, holiday]
          }
        }
      })

      state.calendar = tempCalendar
    },
    setDaysForView(state) {

      const tempCalendar = structuredClone(current(state.calendar))
      const selectedYear = state.selectedYear
      const selectedMonth = state.selectedMonth

      const currentMonthDays: Day[] = Object.values(tempCalendar[selectedYear].months[selectedMonth]?.days ?? {})
      const prevMonthDays: Day[] = Object.values((tempCalendar[selectedYear].months[selectedMonth - 1]?.days ?? tempCalendar[selectedYear - 1]?.months?.[12]?.days) ?? {})
      const nextMonthDays: Day[] = Object.values((tempCalendar[selectedYear].months[selectedMonth + 1]?.days ?? tempCalendar[selectedYear + 1]?.months?.[1]?.days) ?? {})

      let tempDaysForView = [...currentMonthDays]

      const missingDaysBeforeAmount = currentMonthDays[0]?.dayOfWeekNumber - 1
      const missingDaysAfterAmount = 7 - currentMonthDays[currentMonthDays.length - 1]?.dayOfWeekNumber

      if (missingDaysBeforeAmount) {
        const missingDaysBefore = prevMonthDays.slice(prevMonthDays.length - missingDaysBeforeAmount)
        const fillerDays = getGhostDays(missingDaysBeforeAmount, state.selectedMonth - 1)

        tempDaysForView = [...(missingDaysBefore.length ? missingDaysBefore : fillerDays), ...tempDaysForView]
      }

      if (missingDaysAfterAmount) {
        const missingDaysAfter = nextMonthDays.slice(0, missingDaysAfterAmount)
        const fillerDays = getGhostDays(missingDaysAfterAmount, state.selectedMonth - 1)

        tempDaysForView = [...tempDaysForView, ...(missingDaysAfter.length ? missingDaysAfter : fillerDays)]
      }
      state.daysForView = getDaysRows(tempDaysForView, 7)
    },
    setSelectedYear(state, action: PayloadAction<number>) {
      state.selectedYear = action.payload
    },
    setNextMonth(state) {
      const nextMonth = state.selectedMonth + 1

      if (state.selectedMonth === 12 && state.selectedYear < endYear) {
        state.selectedYear = state.selectedYear + 1
        state.selectedMonth = 1
      } else if (state.selectedMonth < 12 && state.selectedYear <= endYear) {
        state.selectedMonth = nextMonth
      }
    },
    setPrevMonth(state) {

      const prevMonth = state.selectedMonth - 1

      if (state.selectedMonth === 1 && state.selectedYear > startYear) {
        state.selectedYear = state.selectedYear - 1
        state.selectedMonth = 12
      } else if (prevMonth > 0) {
        state.selectedMonth = prevMonth
      }
    },
    setSelectedView(state, action: PayloadAction<SELECTED_VIEW>) {
      state.selectedView = action.payload
    },
    addTask(state, action: PayloadAction<TaskActionsPayload>) {

      const day = action.payload.day
      const tempCalendar = structuredClone(current(state.calendar))
      const tasks = tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks

      tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks = [...tasks, { ...action.payload.task, isNew: false }]
      state.calendar = tempCalendar
    },
    editTask(state, action: PayloadAction<TaskActionsPayload>) {

      const day = action.payload.day
      const tempCalendar = structuredClone(current(state.calendar))
      const tasks = tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks
      const updatedTasks = tasks.map((task: Task) => task.id === action.payload.task.id ? action.payload.task : task)

      tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks = updatedTasks
      state.calendar = tempCalendar
    },
    deleteTask(state, action: PayloadAction<TaskActionsPayload>) {
      const day = action.payload.day
      const tempCalendar = structuredClone(current(state.calendar))
      const tasks = tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks

      tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks = tasks.filter((task: Task) => task.id !== action.payload.task.id)
      state.calendar = tempCalendar
    },
    moveTask(state, action: PayloadAction<TaskMovePayload>) {

      const tempCalendar = structuredClone(current(state.calendar))
      const fromDay = action.payload.fromDay
      const toDay = action.payload.toDay

      const fromDayTasks = tempCalendar[fromDay.yearValue].months[fromDay.monthValue].days[fromDay.dayValue].tasks
      const toDayTasks = tempCalendar[toDay.yearValue].months[toDay.monthValue].days[toDay.dayValue].tasks
      const droppedTask = fromDayTasks.find((task: Task) => task.id === action.payload.taskId)
      const filteredTasks = fromDayTasks.filter((task: Task) => task.id !== action.payload.taskId)

      if (fromDay.dayId !== toDay.dayId) {

        const tasksBefore = toDayTasks.slice(0, action.payload.droppableIndex)
        const tasksAfter = toDayTasks.slice(action.payload.droppableIndex, toDayTasks.length)

        tempCalendar[fromDay.yearValue].months[fromDay.monthValue].days[fromDay.dayValue].tasks = filteredTasks
        tempCalendar[toDay.yearValue].months[toDay.monthValue].days[toDay.dayValue].tasks = [...tasksBefore, droppedTask, ...tasksAfter]
      } else {
        const tasksBefore = filteredTasks.slice(0, action.payload.droppableIndex)
        const tasksAfter = filteredTasks.slice(action.payload.droppableIndex, toDayTasks.length)

        tempCalendar[fromDay.yearValue].months[fromDay.monthValue].days[fromDay.dayValue].tasks = [...tasksBefore, droppedTask, ...tasksAfter]
      }

      state.calendar = tempCalendar

    }
  }
})

export const calendarActions = CalendarSlice.actions
export const calendarReducer = CalendarSlice.reducer
