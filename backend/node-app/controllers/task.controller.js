import {knexClient} from "../knex.js";
import {Buffer} from 'node:buffer';


export async function taskController(req, res) {
  const {url, method} = req

  if (method === 'GET' && url === '/api/tasks') {
    return getTasks(req, res)
  }
  if (method === 'POST' && url === '/api/tasks') {
    return createTask(req, res)
  }
  if (
    method === 'PUT'
    && url.startsWith('/api/tasks/')
    && !isNaN(url.split('/api/tasks/')[1])
    && url.split('/api/tasks/')[1].length > 0
  ) {
    return updateTask(req, res, +url.split('/api/tasks/')[1])
  }

}

async function getTasks(req, res) {
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

async function createTask(req, res) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    body = JSON.parse(Buffer.concat(body).toString());
    const task = await knexClient('task').insert(body).returning('*');
    res.end(JSON.stringify(task[0]))
  });
}

async function updateTask(req, res, taskId) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    body = JSON.parse(Buffer.concat(body).toString());
    const task = await knexClient('task').where({id: taskId})
      .update(body).returning('*');
    res.end(JSON.stringify(task[0]))
  });
}
