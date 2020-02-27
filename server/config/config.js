require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    "username": process.env.usernamePG,
    "password": process.env.passwordPG,
    "database": "CMS",
    "host": "127.0.0.1",
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    "username": process.env.productionUsername,
    "password": process.env.productionPassword,
    "database": process.env.productionDatabase,
    "host": process.env.productionHost,
    dialect: 'postgres',
  },
}
