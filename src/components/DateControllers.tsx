import React, { useEffect } from 'react';
import styled from 'styled-components'
import MySelect from './UI/MySelect'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { DateControllersButton } from './UI/styledComponents/DateControllerButton'

const MyControllers = styled.div`
    display: flex;
`

const DateControllers = () => {
  const { calendar, selectedYear, selectedMonth } = useAppSelector(state => state.calendar)
  const { setSelectedYear, setPrevMonth, setNextMonth, setDaysForView } = useActions()

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
    calendar && setDaysForView()
  }, [calendar, selectedYear, selectedMonth]);

  return (
    <MyControllers>
      <MySelect onSelect={handleYearSelect} selectedOption={selectedYear} options={Object.values(calendar)}/>
      <DateControllersButton onClick={() => handleMonthChangeClick()}>&#9652;</DateControllersButton>
      <DateControllersButton onClick={() => handleMonthChangeClick(true)}>&#9662;</DateControllersButton>
    </MyControllers>
  );
};

export default DateControllers;
