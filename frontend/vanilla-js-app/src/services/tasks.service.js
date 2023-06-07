import axios from "axios";

class TasksService {
  getTasks() {
    return axios.get('http://localhost:4000/api/tasks')
  }

  createTask(task) {
    return axios.post(`http://localhost:4000/api/tasks`, {
      ...task,
      time: new Date(task.time).toISOString(),
    });
  }

  deleteTask(id) {
    return axios.delete(`http://localhost:4000/api/tasks/${id}`)
  }
}

export const tasksService = new TasksService()
