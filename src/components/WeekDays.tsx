import React from 'react';
import { WEEKDAY_NAMES } from '../consts'
import { WeekDaysContainer } from './UI/styledComponents/WeekDaysContainer'
import { WeekDay } from './UI/styledComponents/WeekDay'

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
