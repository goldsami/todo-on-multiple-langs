import {knexClient} from "../knex.js";
import {Buffer} from 'node:buffer';


export async function taskController(req, res) {
  const {url, method} = req

  if (method === 'GET' && url === '/api/tasks') {
    return getTasksController(req, res)
  }
  if (method === 'POST' && url === '/api/tasks') {
    return createTaskController(req, res)
  }
  if (
    url.startsWith('/api/tasks/')
    && !isNaN(url.split('/api/tasks/')[1])
    && url.split('/api/tasks/')[1].length > 0
  ) {
    if (method === 'PUT') return updateTaskController(req, res, +url.split('/api/tasks/')[1])
    if (method === 'DELETE') return deleteTaskController(req, res, +url.split('/api/tasks/')[1])
  }

}

async function getTasksController(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const {rows: tasks} = await knexClient.raw(`
    SELECT "task".*, json_build_object('id', "user"."id", 'image_url' ,"user"."image_url") as "user" FROM "task"
    LEFT JOIN "user" on "user"."id" = "task"."user_id"
    WHERE "task"."status" != 'deleted'
    GROUP BY "task"."id", "user"."id"
  `)
  res.end(JSON.stringify(tasks))
}

async function createTaskController(req, res) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    body = JSON.parse(Buffer.concat(body).toString());
    const task = await knexClient('task').insert(body).returning('*');
    res.end(JSON.stringify(task[0]))
  });
}

async function updateTaskController(req, res, taskId) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    body = JSON.parse(Buffer.concat(body).toString());
    const task = await updateTask(taskId, body)
    res.end(JSON.stringify(task[0]))
  });
}

async function deleteTaskController(req, res, taskId) {
  const task = await updateTask(taskId, {status: 'deleted'})
  res.end(JSON.stringify(task[0]))
}

async function updateTask(taskId, data) {
  return knexClient('task').where({id: taskId})
    .update(data).returning('*');
}
