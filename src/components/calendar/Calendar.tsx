import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import WeekDays from '../WeekDays'
import { useAppSelector } from '../../hooks/redux'
import { CalendarContainer } from '../UI/styledComponents/calendar/CalendarContainer'
import { CalendarItem } from '../UI/styledComponents/calendar/CalendarItem'
import { useActions } from '../../hooks/actions'
import { nanoid } from '@reduxjs/toolkit'
import { Day } from '../../models'
import CalendarItemHeader from './CalendarItemHeader'

import styled from 'styled-components'
import { CalendarRow } from '../UI/styledComponents/calendar/CalendarRow'
import HolidaysList from './HolidaysLst'
import TaskForm from '../TaskForm'

const TaskItem = styled.div`
    padding: 2px 4px;
    font-size: 0.8rem;
    background: #ffd6c7;
    border-radius: 3px;
    margin-bottom: 4px;
    color: #464646;
    font-weight: 500;
    word-wrap: normal;
    position: relative;

    &:last-child {
        margin-bottom: 30px;
    }
`
const DeleteTaskIcon = styled.span`
    position: absolute;
    top: 0;
    RIGHT: 0;
    transform: translateY(-50%) translateX(35%) rotate(45deg);
    color: red;
    font-size: 1rem;
    user-select: none;
    cursor: pointer;
    z-index: 2;
`
const Calendar = () => {

  const [createdTask, setCreatedTask] = useState<any>(null)
  const [editedTask, setEditedTask] = useState<any>(null)

  const { addTask, editTask, deleteTask } = useActions()
  const { daysForView, selectedYear, selectedMonth } = useAppSelector(state => state.calendar)

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

  const handleTaskDelete = (event: MouseEvent, day: Day, taskId: string) => {
    event.stopPropagation()
    deleteTask({ day, taskId })
  }
  const handleCreatedTaskChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCreatedTask({ ...createdTask, taskDescription: event.target.value })
  }
  const handleEditedTaskChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTask({ ...editedTask, taskDescription: event.target.value })
  }
  const handleCreatedTaskBlur = (day: Day) => {
    if (createdTask.taskDescription === '') {
      setCreatedTask(null)
    } else {
      const tempTask = { ...createdTask, isNew: false }

      addTask({ day, task: tempTask })
      setCreatedTask(null)
    }
  }

  const handleEditedTaskBlur = (day: Day) => {
    if (editedTask.taskDescription === '') {
      setEditedTask(null)
    } else {
      editTask({ day, task: editedTask })
      setEditedTask(null)
    }
  }

  const handleTaskEdit = (event: MouseEvent, task: any) => {
    event.stopPropagation()
    setEditedTask(task)
  }

  return (
    <>
      {daysForView.length && (
        <>
          <WeekDays/>
          <CalendarContainer>
            {daysForView.map(row => (
              <CalendarRow key={row[0].id + row[0].monthValue}>
                {row.map((day: Day) => (
                  <CalendarItem
                    key={day.id}
                    $active={selectedMonth === day.monthValue}
                    onClick={() => handleTaskCreate(day)}
                  >
                    <CalendarItemHeader
                      selectedMonth={selectedMonth}
                      day={day}
                    />
                    <HolidaysList holidays={day.holidays}/>
                    {day.tasks.map((task: any) =>
                      editedTask?.id !== task.id
                        ?
                        <TaskItem
                          onClick={event => handleTaskEdit(event, task)}
                          key={task?.id}
                        >
                          <DeleteTaskIcon onClick={event => handleTaskDelete(event, day, task.id)}>+</DeleteTaskIcon>
                          {task?.taskDescription}
                        </TaskItem>
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
                    {!!createdTask && day.id === createdTask.dayId && createdTask.isNew && (
                      <TaskForm
                        task={createdTask}
                        day={day}
                        onInputChange={handleCreatedTaskChange}
                        onInputBlur={handleCreatedTaskBlur}
                      />
                    )}
                  </CalendarItem>
                ))}
              </CalendarRow>
            ))}
          </CalendarContainer>
        </>
      )}
    </>
  );
};

export default Calendar;
