require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    username : 'ydsuzkqrwvboio',
    password : '2259e6c4ae5634df39e14c1b04ba326fc89073c91e0bd415d9c3a3114e6898f8',
  },
}