import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const calendarApi = createApi({
  reducerPath: 'calendar/api',
  tagTypes: ['Holidays'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://date.nager.at/api/v3/PublicHolidays'
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    fetchHolidays: build.query<any[], number>({
      query: (year: number) => `/${year}/UA`,
    })
  })
})

export const { useFetchHolidaysQuery } = calendarApi
