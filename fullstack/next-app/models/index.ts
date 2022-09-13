export interface User {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  time: Date;
  status: 'open' | 'closed';
}
