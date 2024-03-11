import { configureStore } from '@reduxjs/toolkit';
import { calendarReducer } from './calendar.slice/calendar.slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { calendarApi } from './calendar.api/calendar.api'

export const store = configureStore({
  reducer: {
    [calendarApi.reducerPath]: calendarApi.reducer,
    calendar: calendarReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat(calendarApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
