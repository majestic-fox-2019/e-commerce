'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Banners',
      [
        {
          name: 'Logitech G Pro',
          image:
            'https://m.media-amazon.com/images/S/aplus-media/vc/c619d69b-04b3-409a-beed-94bcd4e67fb7._CR0,0,1464,600_PT0_SX1464__.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Asus PG',
          image: 'https://i.ytimg.com/vi/YArT5oeQmzk/maxresdefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banners', null, {})
  }
}
