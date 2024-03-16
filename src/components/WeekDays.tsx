import React from 'react';
import styled from 'styled-components'
import { WEEKDAY_NAMES } from '../consts'

const WeekDaysContainer = styled.div`
    display: flex;
    padding: 0.5% 0;
`

const WeekDay = styled.div`
    flex: 2 1 auto;
    text-align: center;
    color: #7a7a7a;
    font-weight: bold;
`

const WeekDays = () => {
  return (
    <WeekDaysContainer>
      {WEEKDAY_NAMES.map(weekDayName => (
        <WeekDay key={weekDayName}>{weekDayName}</WeekDay>
      ))}
    </WeekDaysContainer>
  );
};

export default WeekDays;
