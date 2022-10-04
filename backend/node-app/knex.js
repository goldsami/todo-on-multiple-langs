import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export const knexClient = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public'],
})
