'use strict';

const products = [
  {
    id: 1,
    name: "Limbo",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/48000/header.jpg?t=1568216437",
    price: 90000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Outlast",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/238320/header.jpg?t=1569860129",
    price: 110000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "Outlast 2",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/414700/header.jpg?t=1569852103",
    price: 135000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: "God of War (2018)",
    image_url: "https://i.ytimg.com/vi/Uev7TBs1Y0A/maxresdefault.jpg",
    price: 410000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    name: "Red Dead Redemption",
    image_url: "https://store-images.s-microsoft.com/image/apps.26419.71534445913389778.3217f3df-0d90-489b-8f2f-90d018aded6a.9821d242-8c8c-4fd3-95ef-1ea45f500a1c?mode=scale&q=90&h=360",
    price: 480000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    name: "Red Dead Redemption 2",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/1174180/header.jpg?t=1575569357",
    price: 640000,
    stock: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    name: "Minecraft",
    image_url: "https://lh3.googleusercontent.com/yAtZnNL-9Eb5VYSsCaOC7KAsOVIJcY8mpKa0MoF-0HCL6b0OrFcBizURHywpuip-D6Y",
    price: 100000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    name: "Creepy Tale",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/1224020/header.jpg?t=1582565580",
    price: 32000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    name: "Undertale",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/391540/header.jpg?t=1579096091",
    price: 90000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    name: "Journey",
    image_url: "https://upload.wikimedia.org/wikipedia/en/6/64/Journey_Title_Poster.png",
    price: 120000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 11,
    name: "The Witcher",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/20900/header.jpg?t=1581285252",
    price: 90000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 12,
    name: "The Witcher 2",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/20920/header.jpg?t=1581285544",
    price: 134000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 13,
    name: "The Witcher 3",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/292030/header.jpg?t=1581375222",
    price: 340000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 14,
    name: "Doki Doki Literature Club!",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/698780/header.jpg?t=1572298791",
    price: 0,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 15,
    name: "Destiny",
    image_url: "http://getwallpapers.com/wallpaper/full/0/f/d/130605.jpg",
    price: 624000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 16,
    name: "Destiny 2",
    image_url: "https://steamcdn-a.akamaihd.net/steam/apps/1085660/header.jpg?t=1579214430",
    price: 840000,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
    return queryInterface.bulkInsert('Products', products, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
