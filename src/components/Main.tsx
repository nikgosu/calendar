import React, { useEffect } from 'react';
import CalendarActions from '../components/CalendarActions'
import Header from '../components/UI/Header'
import Calendar from './calendar/Calendar'
import { useFetchHolidaysQuery } from '../store/calendar.api/calendar.api'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'

const Main = () => {

  const { calendar, selectedYear } = useAppSelector(state => state.calendar)
  const { isLoading: isHolidaysLoading, data: holidaysResponse } = useFetchHolidaysQuery(selectedYear)

  const { setHolidays } = useActions()

  useEffect(() => {
    calendar && holidaysResponse && setHolidays({ year: selectedYear, holidays: holidaysResponse })
  }, [holidaysResponse])

  return (
    <>
      <Header/>
      <CalendarActions/>
      <Calendar/>
    </>
  );
};

export default Main;
