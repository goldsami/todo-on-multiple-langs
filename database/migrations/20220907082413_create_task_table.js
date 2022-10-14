/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('tasks', table => {
    table.increments()
    table.string('name')
    table.string('description')
    table.integer('user_id').references('id').inTable('users')
    table.datetime('time')
    table.enum('status', ['open', 'done', 'deleted']).defaultTo('open')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tasks')
}
