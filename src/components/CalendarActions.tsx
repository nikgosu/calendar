import React from 'react';
import styled from 'styled-components'
import ViewSwitcher from './ViewSwitcher'
import DateControllers from './DateControllers'

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

  return (
    <ActionsContainer>
      <DateControllers/>
      <DateTitle>March 2018</DateTitle>
      <ViewSwitcher/>
    </ActionsContainer>
  );
};

export default CalendarActions;
