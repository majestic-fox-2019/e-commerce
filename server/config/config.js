require('dotenv').config()
console.log(process.env.USERNAME_SERVER)
module.exports = {
  "development": {
    "username": process.env.USER_SERVER,
    "password": process.env.PASSWORD_SERVER,
    "database": process.env.DATABASE_SERVER,
    "host": process.env.HOST_SERVER,
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "ecommerce_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}