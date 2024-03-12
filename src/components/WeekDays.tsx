import React from 'react';
import styled from 'styled-components'

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
      <WeekDay>Sun</WeekDay>
      <WeekDay>Mon</WeekDay>
      <WeekDay>Tue</WeekDay>
      <WeekDay>Wed</WeekDay>
      <WeekDay>Thu</WeekDay>
      <WeekDay>Fri</WeekDay>
      <WeekDay>Sat</WeekDay>
    </WeekDaysContainer>
  );
};

export default WeekDays;
