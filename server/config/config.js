module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'ecommerce_dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'ecommerce_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_HEROKU,
    dialect: 'postgres'
  }
}
