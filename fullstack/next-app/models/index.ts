export interface User {
  id: number;
  name: string;
  description: string;
  image_url: string;
  task: Task[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  time: Date;
  status: 'open' | 'done' | 'deleted';
  user?: User;
}
