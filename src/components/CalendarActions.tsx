import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useAppSelector } from '../hooks/redux'
import { useFetchHolidaysQuery } from '../store/calendar.api/calendar.api'
import { useActions } from '../hooks/actions'

const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const DateControllers = styled.div`

`
const MonthChangeButton = styled.button`

`
const Select = styled.select`

`
const Option = styled.option`

`
const DateTitle = styled.h2`

`
const ViewTypeButtons = styled.div`

`
const ViewTypeButton = styled.button`

`

const CalendarActions = () => {

  const { calendar, selectedYear, selectedMonth, selectedView } = useAppSelector(state => state.calendar)
  const { isLoading: isHolidaysLoading, data: holidaysResponse } = useFetchHolidaysQuery(selectedYear)
  const { setHolidays, setSelectedYear, setPrevMonth, setNextMonth, setSelectedView } = useActions()

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
    <ActionsContainer>
      <DateControllers>
        <Select onChange={e => handleYearSelect(+e.target.value)}>
          {calendar.map(yearObject => (
            <Option
              key={yearObject.id}
              value={yearObject.year}
            >{yearObject.year}</Option>
          ))}
        </Select>
        <MonthChangeButton/>
        <MonthChangeButton/>
      </DateControllers>
      <DateTitle>March 2018</DateTitle>
      <ViewTypeButtons>
        <ViewTypeButton>Week</ViewTypeButton>
        <ViewTypeButton>Month</ViewTypeButton>
      </ViewTypeButtons>
    </ActionsContainer>
  );
};

export default CalendarActions;
