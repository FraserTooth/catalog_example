if (!process.env.DATABASE_URL) require('dotenv').config({ path: './.env' })

const DATABASE_URL = process.env.DATABASE_URL

module.exports = {
  client: 'postgresql',
  connection: DATABASE_URL,
  searchPath: 'public',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './models/migrations'
  },
  seeds: {
    directory: './models/seeds'
  }
}
