import React, { useEffect } from 'react';
import Header from '../components/Header'
import CalendarActions from '../components/CalendarActions'
import { useFetchHolidaysQuery } from '../store/calendar.api/calendar.api'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'

const Calendar = () => {

  const { isLoading: isHolidaysLoading, data: holidaysResponse } = useFetchHolidaysQuery(2024)
  const {setHolidays} = useActions()
  const {calendar} = useAppSelector(state => state.calendar)

  useEffect(() => {
    holidaysResponse && setHolidays({year: 2024, holidays: holidaysResponse})
  }, [holidaysResponse])
  useEffect(() => {
    if (calendar) {
    }
  }, [calendar])

  return (
    <>
      <Header/>
      <CalendarActions/>
    </>
  );
};

export default Calendar;
