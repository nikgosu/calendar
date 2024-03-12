import React from 'react';
import styled from 'styled-components'
import WeekDays from './WeekDays'

const CalendarContainer = styled.div`
    flex: 1 1 auto;
    overflow-y: 'auto';
`

const Calendar = () => {
  return (
    <>
      <WeekDays/>
      <CalendarContainer>
        
      </CalendarContainer>
    </>
  );
};

export default Calendar;
