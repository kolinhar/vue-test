export interface Task {
  id: number;
  text: string;
  done: boolean;
  delete: boolean;
}

export class TaskList extends Array {
  constructor(task: Task[] | Task) {
    super();
    return Array.isArray(task) ? task : [task];
  }
}
