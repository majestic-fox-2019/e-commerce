require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.username_pg,
    "password": process.env.password_pg,
    "database": process.env.database_pg,
    "host": process.env.host_pg,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.username_pg_test,
    "password": process.env.password_pg_test,
    "database": process.env.database_pg_test,
    "host": process.env.host_pg_test,
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