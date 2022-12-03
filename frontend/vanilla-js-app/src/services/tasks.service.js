import axios from "axios";

class TasksService {
  getTasks() {
    return axios.get('http://localhost:4000/api/tasks')
  }

  deleteTask(id) {
    return axios.delete(`http://localhost:4000/api/tasks/${id}`)
  }
}

export const tasksService = new TasksService()
