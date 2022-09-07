/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('user_task', table => {
    table.integer('user_id')
    table.foreign('user_id').references('user.id')
    table.integer('task_id')
    table.foreign('task_id').references('task.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_task')
}
