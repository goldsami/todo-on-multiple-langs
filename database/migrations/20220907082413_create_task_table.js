/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('task', table => {
    table.increments()
    table.string('name')
    table.string('description')
    table.integer('user_id').references('id').inTable('user')
    table.datetime('time')
    table.enum('status', ['open', 'done']).defaultTo('open')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('task')
}
