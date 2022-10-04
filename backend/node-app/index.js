import {taskController} from "./controllers/task.controller.js";
import * as http from 'http';

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
  const {url} = req

  if (url.startsWith('/api/tasks')) {
    taskController(req, res)
    return
  }

  res.end('Invalid route');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});