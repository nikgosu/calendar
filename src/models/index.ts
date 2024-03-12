export interface Day {
  id: string
  day: number
  dayOfWeek: string
  holidays?: Holiday[]
}

export interface Month {
  id: string
  month: number
  monthName: string
  days: Day[]
}

export interface Year {
  id: string
  year: number
  months: Month[]
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

export type Calendar = Year[]
