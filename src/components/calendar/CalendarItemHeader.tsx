import React from 'react';
import { CalendarItemDay } from '../UI/styledComponents/calendar/CalendarItemDay'
import { MONTH_NAMES } from '../../consts'
import { CalendarItemCardAmount } from '../UI/styledComponents/calendar/CalendarItemCardAmount'
import { ItemHeader } from '../UI/styledComponents/calendar/ItemHeader'
import { Day } from '../../models'

interface CalendarItemHeaderProps {
  selectedMonth: number
  day: Day
}

const CalendarItemHeader = ({selectedMonth, day}: CalendarItemHeaderProps) => {
  return (
    <ItemHeader>
      <CalendarItemDay $active={selectedMonth === day.monthValue}>
        {day.isFirst || day.isLast ? MONTH_NAMES[day.monthValue - 1]?.slice(0, 3) : ''} {!day.disabled && day.value}
      </CalendarItemDay>
      {!!day.tasks.length && (
        <CalendarItemCardAmount>
          {day.tasks.length} card
        </CalendarItemCardAmount>
      )}
    </ItemHeader>
  );
};

export default CalendarItemHeader;
