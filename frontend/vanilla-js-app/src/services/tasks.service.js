import axios from "axios";

class TasksService {
  getTasks() {
    return axios.get('http://localhost:4000/api/tasks')
  }
}

export const tasksService = new TasksService()
