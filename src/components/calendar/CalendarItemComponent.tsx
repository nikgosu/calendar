import React, { MouseEvent, useCallback, useState } from 'react';
import CalendarItemHeader from './CalendarItemHeader'
import HolidaysList from './HolidaysLst'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { getDragDropInfoString } from '../../utils'
import { Day, Task } from '../../models'
import { TaskItem } from '../UI/styledComponents/tasks/TaskItem'
import { DeleteTaskButton } from '../UI/styledComponents/tasks/DeleteTaskButton'
import TaskForm from '../TaskForm'
import { CalendarItem } from '../UI/styledComponents/calendar/CalendarItem'
import { useAppSelector } from '../../hooks/redux'
import { nanoid } from '@reduxjs/toolkit'
import { useActions } from '../../hooks/actions'

interface CalendarItemComponentProps {
  day: Day
}

const CalendarItemComponent = ({day}: CalendarItemComponentProps) => {

  const {selectedMonth} = useAppSelector(state => state.calendar)

  const [createdTask, setCreatedTask] = useState<Task | null>(null)
  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const [lastTap, setLastTap] = useState(0);

  const { addTask, editTask, deleteTask } = useActions()

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
  const handleCreatedTaskChange = useCallback((value: string) => {
    createdTask && setCreatedTask({ ...createdTask, taskDescription: value })
  }, [])

  const handleEditedTaskChange = useCallback((value: string) => {
    editedTask && setEditedTask({ ...editedTask, taskDescription: value })
  }, [])

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

  const handleDoubleTap = (day: Day) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      handleTaskCreate(day);
    }
    setLastTap(now);
  };

  return (
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
        droppableId={getDragDropInfoString(day)}
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
                      <DeleteTaskButton
                        onClick={event => handleTaskDelete(event, day, task)}
                      >
                        +
                      </DeleteTaskButton>
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
  );
};

export default CalendarItemComponent;
