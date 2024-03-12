import React, { useEffect } from 'react';
import styled from 'styled-components'
import MySelect from './UI/MySelect'
import { useAppSelector } from '../hooks/redux'
import { useFetchHolidaysQuery } from '../store/calendar.api/calendar.api'
import { useActions } from '../hooks/actions'
import { DateControllersButton } from './UI/styledComponents/DateControllerButton'

const MyControllers = styled.div`
    display: flex;
`

const DateControllers = () => {
  const { calendar, selectedYear, selectedMonth, selectedView } = useAppSelector(state => state.calendar)
  const { isLoading: isHolidaysLoading, data: holidaysResponse } = useFetchHolidaysQuery(selectedYear)
  const { setHolidays, setSelectedYear, setPrevMonth, setNextMonth } = useActions()

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
  }

  const handleMonthChangeClick = (isNext = false) => {
    if (isNext) {
      setNextMonth()
    } else {
      setPrevMonth()
    }
  }

  useEffect(() => {
    holidaysResponse && setHolidays({ year: 2024, holidays: holidaysResponse })
  }, [holidaysResponse])

  return (
    <MyControllers>
      <MySelect onSelect={handleYearSelect} selectedOption={selectedYear} options={calendar}/>
      <DateControllersButton onClick={() => handleMonthChangeClick()}>&#9652;</DateControllersButton>
      <DateControllersButton onClick={() => handleMonthChangeClick(true)}>&#9662;</DateControllersButton>
    </MyControllers>
  );
};

export default DateControllers;
