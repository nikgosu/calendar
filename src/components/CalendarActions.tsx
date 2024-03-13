import React from 'react';
import styled from 'styled-components'
import ViewSwitcher from './ViewSwitcher'
import DateControllers from './DateControllers'
import { useAppSelector } from '../hooks/redux'
import { MONTH_NAMES } from '../consts'

const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5% 1%;
`

const DateTitle = styled.h2`
    margin: 0;
    color: #383838;
`

const CalendarActions = () => {

  const {selectedYear, selectedMonth} = useAppSelector(state => state.calendar)

  return (
    <ActionsContainer>
      <DateControllers/>
      <DateTitle>{MONTH_NAMES[selectedMonth - 1]} {selectedYear}</DateTitle>
      <ViewSwitcher/>
    </ActionsContainer>
  );
};

export default CalendarActions;
