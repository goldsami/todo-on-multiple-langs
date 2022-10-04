import {knexClient} from "../knex.js";


export async function taskController(req, res) {
  const {url, method} = req

  if (method === 'GET' && url === '/api/tasks') {
    return getTasks(req, res)
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
  res.end(JSON.stringify({data: tasks}))
}