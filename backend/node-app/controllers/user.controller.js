import {knexClient} from "../knex.js";

export async function userController(req, res) {
  const {url, method} = req

  if (method === 'GET' && url === '/api/users') {
    return getUsersController(req, res)
  }
}

async function getUsersController(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const users = await knexClient.select().from('users')
  res.end(JSON.stringify(users))
}