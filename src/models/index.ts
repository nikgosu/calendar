export interface Day {
  id: string
  monthId: string
  yearId: string
  value: number
  dayOfWeek: string
  holidays?: Holiday[]
}

export interface Days {
  [key: number]: Day
}

export interface Month {
  id: string
  yearId: string
  value: number
  yearValue: number
  monthName: string
  days: Days
}

export interface Months {
  [key: number]: Month
}

export interface Year {
  id: string
  value: number
  months: Months
}

export interface Years {
  [key: number]: Year
}

export interface Holiday {
  id: string
  date: string
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  counties?: any
  launchYear?: any
  types: string[]
  month?: number
  day?: number
}

export enum SelectedView {
  MONTH = 'Month',
  WEEK = 'Week'
}

export type Calendar = Years
