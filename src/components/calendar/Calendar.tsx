import React, { useCallback, useEffect, useState, WheelEvent } from 'react';
import WeekDays from '../WeekDays'
import { useAppSelector } from '../../hooks/redux'
import { CalendarContainer } from '../UI/styledComponents/calendar/CalendarContainer'
import { useActions } from '../../hooks/actions'
import { Day } from '../../models'
import { CalendarRow } from '../UI/styledComponents/calendar/CalendarRow'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import CalendarItemComponent from './CalendarItemComponent'
import useDebounce from '../../hooks/useDebounce'

const Calendar = () => {

  const { filteredDaysForView, selectedMonth, prevSelectedMonth } = useAppSelector(state => state.calendar)
  const [isAnimate, setIsAnimate] = useState(false)
  const { moveTask, setNextMonth } = useActions()

  const debouncedScrollDown = useDebounce(setNextMonth, 100)
  const debouncedScrollUp = useDebounce(setNextMonth, 100)

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY < 0) {
      debouncedScrollUp()
    } else if (event.deltaY > 0) {
      debouncedScrollDown()
    }
  };

  const handleDragEnd = useCallback((result: DropResult) => {
    if (result.destination) {
      moveTask({
        fromDay: JSON.parse(result.source.droppableId),
        toDay: JSON.parse(result.destination.droppableId),
        taskId: result.draggableId,
        droppableIndex: result.destination.index
      })
    }
  }, [])

  useEffect(() => {
    if (isAnimate) {
      const timeoutId = setTimeout(() => {
        setIsAnimate(false)
      }, 200)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isAnimate]);

  useEffect(() => {
    setIsAnimate(true)
  }, [selectedMonth, prevSelectedMonth]);

  return (
    <>
      {filteredDaysForView.length && (
        <>
          <WeekDays/>
          <CalendarContainer
            onWheel={handleWheel}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              {filteredDaysForView.map((row: Day[]) => (
                <CalendarRow
                  key={row[0].id + row[0].monthId}
                  $isAnimateNext={prevSelectedMonth < selectedMonth && isAnimate}
                  $isAnimatePrev={prevSelectedMonth > selectedMonth && isAnimate}
                >
                  {row.map((day: Day) => (
                    <CalendarItemComponent
                      key={day.id}
                      day={day}
                    />
                  ))}
                </CalendarRow>
              ))}
            </DragDropContext>
          </CalendarContainer>
        </>
      )}
    </>
  );
};

export default Calendar;
