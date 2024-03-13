import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import WeekDays from './WeekDays'
import { useAppSelector } from '../hooks/redux'
import { CalendarContainer } from './UI/styledComponents/calendar/CalendarContainer'
import { CalendarItemDay } from './UI/styledComponents/calendar/CalendarItemDay'
import { CalendarItem } from './UI/styledComponents/calendar/CalendarItem'
import { CalendarItemHeader } from './UI/styledComponents/calendar/CalendarItemHeader'
import { CalendarItemCardAmount } from './UI/styledComponents/calendar/CalendarItemCardAmount'
import { MONTH_NAMES } from '../consts'
import useScrollIntoView from '../hooks/useScrollIntoView'
import useScroll from '../hooks/useScroll'

const Calendar = () => {

  const [shouldRunObserver, setShouldRunObserver] = useState(false)
  const [scrollToElementRef, containerRef, setShouldScrollTo] = useScrollIntoView();
  const { daysForView, selectedYear, selectedMonth } = useAppSelector(state => state.calendar)

  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  useScroll({ shouldRunObserver, parentRef: containerRef, childRef: prevRef, callback: handlePrevRefIntersection })
  useScroll({ shouldRunObserver, parentRef: containerRef, childRef: nextRef, callback: handleNextRefIntersection })

  function handlePrevRefIntersection () {
    console.log(1)
  }

  function handleNextRefIntersection () {
    console.log(2)
  }

  useEffect(() => {
    if (daysForView) {
      setShouldScrollTo(true)
      if (!shouldRunObserver) {
        console.log(111)
        setTimeout(() => {
          setShouldRunObserver(true)
        },500)
      }
    }
  }, [daysForView]);

  return (
    <>
      <WeekDays/>
      <CalendarContainer ref={containerRef}>
        {daysForView.map((day, i) => (
          <CalendarItem
            key={day.id}
            $active={selectedMonth === day.monthValue}
            ref={day.value === 1 && selectedMonth === day.monthValue ? scrollToElementRef : i === 10 ? prevRef : i === 10 ? prevRef : i === daysForView.length - 10 ? nextRef : null}
          >
            <CalendarItemHeader>
              <CalendarItemDay $active={selectedMonth === day.monthValue}>
                {day.isFirst || day.isLast ? MONTH_NAMES[day.monthValue - 1]?.slice(0, 3) : ''} {day.value}
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
