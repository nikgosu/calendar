import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { TaskInput } from './UI/styledComponents/tasks/TaskInput'
import { TaskInputOverlay } from './UI/styledComponents/tasks/TaskInputOverlay'
import { Day } from '../models'

interface TaskFormProps {
  day: Day
  task: any
  onInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onInputBlur: (day: Day) => void
}
const TaskForm = ({day, task, onInputChange, onInputBlur}: TaskFormProps) => {

  const handleKeyPress = (event: KeyboardEvent, day: Day) => {
    if (event.key === 'Escape') {
      onInputBlur(day)
    }
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();

      // Set cursor at the end of the input value
      const input = inputRef.current;
      input.selectionStart = input.selectionEnd = input.value.length;
    }
  }, []);

  return (
    <>
      <TaskInput
        ref={inputRef}
        value={task.taskDescription}
        onChange={event => onInputChange(event)}
        onBlur={() => onInputBlur(day)}
        onKeyDown={event => handleKeyPress(event, day)}
        onClick={event => event.stopPropagation()}
      />
      <TaskInputOverlay/>
    </>
  );
};

export default TaskForm;
