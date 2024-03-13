import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'
import WeekDays from './WeekDays'
import { useAppSelector } from '../hooks/redux'
import { CalendarContainer } from './UI/styledComponents/calendar/CalendarContainer'
import { CalendarItemDay } from './UI/styledComponents/calendar/CalendarItemDay'
import { CalendarItem } from './UI/styledComponents/calendar/CalendarItem'
import { CalendarItemHeader } from './UI/styledComponents/calendar/CalendarItemHeader'
import { CalendarItemCardAmount } from './UI/styledComponents/calendar/CalendarItemCardAmount'
import { MONTH_NAMES } from '../consts'

const Calendar = () => {

  const firstDayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { daysForView, selectedYear, selectedMonth } = useAppSelector(state => state.calendar)

  const scrollToRef = () => {
    if (firstDayRef.current && containerRef.current) {
      const y = firstDayRef.current.offsetTop - containerRef.current.getBoundingClientRect().top
      containerRef.current.scrollTo({top: y, behavior: 'smooth'})
    }
  };

  useEffect(() => {
    if (daysForView) {
      scrollToRef()
    }
  }, [daysForView]);

  return (
    <>
      <WeekDays/>
      <CalendarContainer ref={containerRef}>
        {daysForView.map(day => (
          <CalendarItem
            key={day.id}
            $active={selectedMonth === day.monthValue}
            ref={day.value === 1 && selectedMonth === day.monthValue ? firstDayRef : null}
          >
            <CalendarItemHeader>
              <CalendarItemDay $active={selectedMonth === day.monthValue}>
                {day.isFirst || day.isLast ? MONTH_NAMES[day.monthValue].slice(0, 3) : ''} {day.value}
              </CalendarItemDay>
              <CalendarItemCardAmount>
                1 card
              </CalendarItemCardAmount>
            </CalendarItemHeader>
          </CalendarItem>
        ))}
      </CalendarContainer>
    </>
  );
};

export default Calendar;
