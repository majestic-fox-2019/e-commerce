'use strict'
const hash = require('../helpers/hash')
require('dotenv').config()
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Admin1',
          email: 'admin1@mail.com',
          password: hash(process.env.ADMIN_PASS),
          phone: '08091000200',
          platform: 'normal',
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Admin2',
          email: 'admin2@mail.com',
          password: hash(process.env.ADMIN_PASS),
          phone: '08091000300',
          platform: 'normal',
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
