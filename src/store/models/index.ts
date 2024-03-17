import { Day, Holiday, Task } from '../../models'

export interface HolidaysPayload {
  year: number;
  holidays: Holiday[];
}

export interface TaskActionsPayload {
  day: Day;
  task: Task;
}

export interface TaskMoveDay {
  yearValue: number;
  monthValue: number;
  dayValue: number;
  dayId: string;
}

export interface TaskMovePayload {
  fromDay: TaskMoveDay;
  toDay: TaskMoveDay;
  taskId: string;
  droppableIndex: number;
}
