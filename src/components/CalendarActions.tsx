import React from 'react';
import ViewSwitcher from './ViewSwitcher'
import Controllers from './Controllers'
import { useAppSelector } from '../hooks/redux'
import { MONTH_NAMES } from '../consts'
import { DateTitle } from './UI/styledComponents/DateTitle'
import { ActionsContainer } from './UI/styledComponents/ActionsContainer'


const CalendarActions = () => {

  const {selectedYear, selectedMonth} = useAppSelector(state => state.calendar)

  return (
    <ActionsContainer>
      <Controllers/>
      <DateTitle>{MONTH_NAMES[selectedMonth - 1]} {selectedYear}</DateTitle>
      <ViewSwitcher/>
    </ActionsContainer>
  );
};

export default CalendarActions;
