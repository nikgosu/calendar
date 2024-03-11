export interface Day {
  day: number
  dayOfWeek: string
  holidays?: any[]
}

export interface Month {
  month: number
  monthName: string,
  days: Day[],
}

export interface Year {
  year: number,
  months: Month[],
}

export type Calendar = Year[]
