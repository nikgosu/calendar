import React from 'react';
import styled from 'styled-components'

const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const DateControllers = styled.div`
    
`
const MonthChangeButton = styled.select`
    
`
const Select = styled.select`
    
`
const Option = styled.option`
    
`
const DateTitle  = styled.h2`
    
`
const ViewTypeButtons = styled.div`
    
`
const ViewTypeButton = styled.button`
    
`

const CalendarActions = () => {
  return (
    <ActionsContainer>
      <DateControllers>
        <Select>
          <Option/>
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
