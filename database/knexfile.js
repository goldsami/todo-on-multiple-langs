// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgres',
    connection: {
      database: 'postgres',
      user: 'admin',
      password: 'admin'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
