export interface Task {
  id: number;
  text: string;
  done: boolean;
  delete: boolean;
}

export class TaskList {
  constructor(task: Task[] | Task) {
    return Array.isArray(task) ? task : [task];
  }
}

export const Tasks = new TaskList([
  {
    id: 1,
    text: 'premier élément de la liste',
    done: false,
    delete: false,
  },
  {
    id: 2,
    text: 'voir tous les marvel et les DC comics',
    done: true,
    delete: false,
  },
  { id: 3, text: 'apprendre à dessiner', done: true, delete: true },
  {
    id: 4,
    text: 'avant-dernier élément de la liste',
    done: false,
    delete: false,
  },
  { id: 5, text: 'dernier élémentde la liste', done: false, delete: true },
]);
