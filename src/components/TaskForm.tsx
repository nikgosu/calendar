import React, { ChangeEvent, KeyboardEvent, memo, useEffect, useRef, useState } from 'react';
import { TaskInput } from './UI/styledComponents/tasks/TaskInput'
import { Day, Task } from '../models'

interface TaskFormProps {
  day: Day
  task: Task
  onInputChange: (value: string) => void
  onInputBlur: (day: Day) => void
}
const TaskForm = memo(({day, task, onInputChange, onInputBlur}: TaskFormProps) => {
  const [value, setValue] = useState(task?.taskDescription ?? '')
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (event: KeyboardEvent, day: Day) => {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setValue(value + '\n')
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      onInputBlur(day)
    }
    if (event.key === 'Escape') {
      onInputBlur(day)
    }
  };

  const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();

      const input = inputRef.current;
      input.selectionStart = input.selectionEnd = input.value.length;
    }
  }, []);

  useEffect(() => {
    value && onInputChange(value)
  }, [value]);

  return (
    <TaskInput
      ref={inputRef}
      value={value}
      onChange={event => handleValueChange(event)}
      onBlur={() => onInputBlur(day)}
      onKeyDown={event => handleKeyPress(event, day)}
      onClick={event => event.stopPropagation()}
    />
  );
})

export default TaskForm;
