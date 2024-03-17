import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Calendar, Day, Holiday, SELECTED_VIEW, Task } from '../../models'
import {
  getComputedCalendar,
  getComputedHolidays,
  getDaysForView,
  getMonthDays,
  getTasks
} from '../../utils'
import { TaskActionsPayload, HolidaysPayload, TaskMovePayload } from '../models'
import { generateCalendar } from '../../utils/generateCalendar'

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
      const { year, holidays } = action.payload
      const computedHolidays: Holiday[] = getComputedHolidays(holidays)

      if (!holidays.length) {
        return state
      }

      state.calendar = getComputedCalendar(structuredClone(current(state.calendar)), year, computedHolidays)
    },
    setDaysForView(state) {

      const { selectedYear, selectedMonth } = state
      const [prevMonthDays, currentMonthDays, nextMonthDays] = getMonthDays(structuredClone(current(state.calendar)), selectedYear, selectedMonth)

      state.daysForView = getDaysForView(prevMonthDays, currentMonthDays, nextMonthDays, selectedMonth, 7)
    },
    setSelectedYear(state, action: PayloadAction<number>) {
      state.selectedYear = action.payload
    },
    setNextMonth(state) {
      const { selectedYear, selectedMonth } = state
      const nextMonth = selectedMonth + 1

      if (state.selectedMonth === 12 && selectedYear < endYear) {
        state.selectedYear = selectedYear + 1
        state.selectedMonth = 1
      } else if (selectedMonth < 12 && selectedYear <= endYear) {
        state.selectedMonth = nextMonth
      }
    },
    setPrevMonth(state) {
      const { selectedYear, selectedMonth } = state
      const prevMonth = state.selectedMonth - 1

      if (selectedMonth === 1 && selectedYear > startYear) {
        state.selectedYear = selectedYear - 1
        state.selectedMonth = 12
      } else if (prevMonth > 0) {
        state.selectedMonth = prevMonth
      }
    },
    setSelectedView(state, action: PayloadAction<SELECTED_VIEW>) {
      state.selectedView = action.payload
    },
    addTask(state, action: PayloadAction<TaskActionsPayload>) {
      const { day, task } = action.payload
      const tempCalendar = structuredClone(current(state.calendar))
      const tasks = getTasks(tempCalendar, day.yearValue, day.monthValue, day.value)

      tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks = [...tasks, { ...task, isNew: false }]
      state.calendar = tempCalendar
    },
    editTask(state, action: PayloadAction<TaskActionsPayload>) {

      const { day, task } = action.payload
      const tempCalendar = structuredClone(current(state.calendar))
      const tasks = getTasks(tempCalendar, day.yearValue, day.monthValue, day.value)
      const updatedTasks = tasks.map((taskItem: Task) => taskItem.id === task.id ? task : taskItem)

      tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks = updatedTasks
      state.calendar = tempCalendar
    },
    deleteTask(state, action: PayloadAction<TaskActionsPayload>) {
      const { day, task } = action.payload
      const tempCalendar = structuredClone(current(state.calendar))
      const tasks = getTasks(tempCalendar, day.yearValue, day.monthValue, day.value)

      tempCalendar[day.yearValue].months[day.monthValue].days[day.value].tasks = tasks.filter((taskItem: Task) => taskItem.id !== task.id)
      state.calendar = tempCalendar
    },
    moveTask(state, action: PayloadAction<TaskMovePayload>) {

      const { fromDay, toDay, taskId, droppableIndex } = action.payload
      const tempCalendar = structuredClone(current(state.calendar))

      const fromDayTasks = getTasks(tempCalendar, fromDay.yearValue, fromDay.monthValue, fromDay.dayValue)
      const toDayTasks = getTasks(tempCalendar, toDay.yearValue, toDay.monthValue, toDay.dayValue)

      const droppedTask = fromDayTasks.find((task: Task) => task.id === taskId)
      const filteredTasks = fromDayTasks.filter((task: Task) => task.id !== taskId)

      if (fromDay.dayId !== toDay.dayId) {

        const tasksBefore = toDayTasks.slice(0, droppableIndex)
        const tasksAfter = toDayTasks.slice(droppableIndex, toDayTasks.length)

        tempCalendar[fromDay.yearValue].months[fromDay.monthValue].days[fromDay.dayValue].tasks = filteredTasks
        tempCalendar[toDay.yearValue].months[toDay.monthValue].days[toDay.dayValue].tasks = [...tasksBefore, droppedTask, ...tasksAfter]
      } else {
        const tasksBefore = filteredTasks.slice(0, droppableIndex)
        const tasksAfter = filteredTasks.slice(droppableIndex, toDayTasks.length)

        tempCalendar[fromDay.yearValue].months[fromDay.monthValue].days[fromDay.dayValue].tasks = [...tasksBefore, droppedTask, ...tasksAfter]
      }

      state.calendar = tempCalendar
    }
  }
})

export const calendarActions = CalendarSlice.actions
export const calendarReducer = CalendarSlice.reducer
