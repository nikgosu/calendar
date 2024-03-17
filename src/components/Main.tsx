import React, { useEffect } from 'react';
import CalendarActions from '../components/CalendarActions'
import Header from '../components/UI/Header'
import Calendar from './calendar/Calendar'
import { useFetchHolidaysQuery } from '../store/calendar.api/calendar.api'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { Spinner } from './UI/styledComponents/Spinner'

const Main = () => {

  const selectedYear = useAppSelector(state => state.calendar.selectedYear)
  const { isLoading: isHolidaysLoading, data: holidaysResponse } = useFetchHolidaysQuery(selectedYear)

  const { setHolidays } = useActions()

  useEffect(() => {
    holidaysResponse && setHolidays({ year: selectedYear, holidays: holidaysResponse })
  }, [holidaysResponse])

  return (
    <>
      <Header/>
      <CalendarActions/>
      {isHolidaysLoading ? (
        <Spinner/>
      )
      : (
        <Calendar/>
      )}
    </>
  );
};

export default Main;
