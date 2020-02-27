require('dotenv').config()

module.exports = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres'
    },
    production: {
    username: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
    host: process.env.Host,
    dialect: 'postgres'
    },
}