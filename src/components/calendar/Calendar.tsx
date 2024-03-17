import React, { MouseEvent, useState } from 'react';
import WeekDays from '../WeekDays'
import { useAppSelector } from '../../hooks/redux'
import { CalendarContainer } from '../UI/styledComponents/calendar/CalendarContainer'
import { CalendarItem } from '../UI/styledComponents/calendar/CalendarItem'
import { useActions } from '../../hooks/actions'
import { nanoid } from '@reduxjs/toolkit'
import { Day, Task } from '../../models'
import CalendarItemHeader from './CalendarItemHeader'
import styled from 'styled-components'
import { CalendarRow } from '../UI/styledComponents/calendar/CalendarRow'
import HolidaysList from './HolidaysLst'
import TaskForm from '../TaskForm'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

const TaskItem = styled.div`
    padding: 2px 4px;
    font-size: 0.8rem;
    background: #ffd6c7;
    border-radius: 3px;
    margin-bottom: 4px;
    color: #464646;
    font-weight: 500;
    word-wrap: break-word;
    position: relative;
`
const DeleteTaskIcon = styled.span`
    position: absolute;
    top: 0;
    right: 10px;
    transform: translateY(-50%) translateX(35%) rotate(45deg);
    color: red;
    font-size: 1rem;
    user-select: none;
    cursor: pointer;
    z-index: 2;
`
const Calendar = () => {

  const [createdTask, setCreatedTask] = useState<Task | null>(null)
  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const [lastTap, setLastTap] = useState(0);

  const { addTask, editTask, deleteTask, moveTask } = useActions()
  const { daysForView, selectedMonth } = useAppSelector(state => state.calendar)

  const handleTaskCreate = (day: Day) => {
    !createdTask && setCreatedTask({
      taskDescription: '',
      id: nanoid(),
      dayId: day.id,
      dayValue: day.value,
      monthValue: day.monthValue,
      yearValue: day.yearValue,
      isNew: true
    })
  }

  const handleTaskDelete = (event: MouseEvent, day: Day, task: Task) => {
    event.stopPropagation()
    deleteTask({ day, task })
  }
  const handleCreatedTaskChange = (value: string) => {
    createdTask && setCreatedTask({ ...createdTask, taskDescription: value })
  }
  const handleEditedTaskChange = (value: string) => {
    editedTask && setEditedTask({ ...editedTask, taskDescription: value })
  }
  const handleCreatedTaskBlur = (day: Day) => {
    if (createdTask?.taskDescription) {
      addTask({ day, task: createdTask })
    }
    setCreatedTask(null)
  }

  const handleEditedTaskBlur = (day: Day) => {
    if (editedTask?.taskDescription) {
      setEditedTask(null)
      editTask({ day, task: editedTask })
    }
    setEditedTask(null)
  }

  const handleTaskEdit = (event: MouseEvent, task: Task) => {
    event.stopPropagation()
    setEditedTask(task)
  }

  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      moveTask({
        fromDay: JSON.parse(result.source.droppableId),
        toDay: JSON.parse(result.destination.droppableId),
        taskId: result.draggableId,
        droppableIndex: result.destination.index
      })
    }
  }

  const handleDoubleTap = (day: Day) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      handleTaskCreate(day);
    }
    setLastTap(now);
  };

  const getDragDropObject = (day: Day) => {
    return JSON.stringify({
      yearValue: day.yearValue,
      monthValue: day.monthValue,
      dayValue: day.value,
      dayId: day.id
    })
  }
  return (
    <>
      {daysForView.length && (
        <>
          <WeekDays/>
          <CalendarContainer>
            <DragDropContext onDragEnd={onDragEnd}>
              {daysForView.map((row: Day[]) => (
                <CalendarRow
                  key={row[0].id + row[0].monthId}
                >
                  {row.map((day: Day) => (
                    <CalendarItem
                      key={day.id}
                      $active={selectedMonth === day.monthValue}
                      onClick={() => handleDoubleTap(day)}
                    >
                      <CalendarItemHeader
                        selectedMonth={selectedMonth}
                        day={day}
                      />
                      <HolidaysList holidays={day.holidays}/>
                      <Droppable
                        key={day.id}
                        droppableId={getDragDropObject(day)}
                      >
                        {(provided) => (
                          <div
                            style={{ flexGrow: 1, marginBottom: '30px', padding: '0.4% 0.5%' }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {day.tasks.map((task: Task, index) =>
                              editedTask?.id !== task.id
                                ?
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <TaskItem
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      onClick={event => handleTaskEdit(event, task)}
                                      key={task?.id}
                                    >
                                      <DeleteTaskIcon
                                        onClick={event => handleTaskDelete(event, day, task)}
                                      >
                                        +
                                      </DeleteTaskIcon>
                                      {task?.taskDescription}
                                    </TaskItem>
                                  )}
                                </Draggable>
                                :
                                editedTask?.id === task.id
                                  ?
                                  <TaskForm
                                    key={editedTask?.id}
                                    task={editedTask}
                                    day={day}
                                    onInputChange={handleEditedTaskChange}
                                    onInputBlur={handleEditedTaskBlur}
                                  />
                                  :
                                  <></>
                            )}
                            {!!day.tasks.length && provided.placeholder}
                            {!!createdTask && day.id === createdTask.dayId && createdTask.isNew && (
                              <TaskForm
                                task={createdTask}
                                day={day}
                                onInputChange={handleCreatedTaskChange}
                                onInputBlur={handleCreatedTaskBlur}
                              />
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CalendarItem>
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
