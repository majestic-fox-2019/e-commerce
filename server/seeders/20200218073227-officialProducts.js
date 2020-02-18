'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
        name: 'Samsung Galaxy S20',
        desc: 'Samsung galaxy series',
        price: 15000000,
        stock: 5,
        img_url: 'https://images.anandtech.com/doci/15482/Galaxy-S20-S20-5G_678x452.jpg',
        category: 'Handphone',
        UserId: 1,
        official: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },{
      name: 'Samsung Galaxy buds',
      desc: 'Samsung galaxy earbuds',
      price: 3000000,
      stock: 3,
      img_url: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2019/02/21/1650228271.jpg',
      category: 'Headphone',
      UserId: 1,
      official: true,
      createdAt: new Date(),
      updatedAt: new Date()
  },{
    name: 'Samsung Galaxy Watch',
    desc: 'Samsung galaxy smartwatch',
    price: 3500000,
    stock: 6,
    img_url: 'https://static.bhphoto.com/images/images1000x1000/1533834492_1429263.jpg',
    category: 'Smartwatch',
    UserId: 1,
    official: true,
    createdAt: new Date(),
    updatedAt: new Date()
},{
  name: 'Asus ROG Strix G',
  desc: 'Asus ROG Gaming Laptop',
  price: 13000000,
  stock: 2,
  img_url: 'https://images-na.ssl-images-amazon.com/images/I/811QpiYXe-L._AC_SL1500_.jpg',
  category: 'Laptop',
  UserId: 1,
  official: true,
  createdAt: new Date(),
  updatedAt: new Date()
},{
  name: 'DJI Mavic Pro',
  desc: 'DJI drone',
  price: 5000000,
  stock: 7,
  img_url: 'https://www5.djicdn.com/cms_uploads/product/cover/103/5acfdd059e0923acdf97145a7b9a001f%40374.jpg',
  category: 'Drone',
  UserId: 1,
  official: true,
  createdAt: new Date(),
  updatedAt: new Date()
},{
  name: 'Google Pixel 3 XL',
  desc: 'Google smartphone',
  price: 13000000,
  stock: 1,
  img_url: 'https://images-na.ssl-images-amazon.com/images/I/61etNKg8JlL._AC_SY606_.jpg',
  category: 'Handphone',
  UserId: 1,
  official: true,
  createdAt: new Date(),
  updatedAt: new Date()
},{
  name: 'Macbook Pro 2019 13inch',
  desc: 'Apple Macbook pro series',
  price: 25000000,
  stock: 3,
  img_url: 'https://static.techspot.com/images/products/2019/laptops/org/2019-06-10-product-2.jpg',
  category: 'Laptop',
  UserId: 1,
  official: true,
  createdAt: new Date(),
  updatedAt: new Date()
},{
  name: 'Samsung Galaxy S20',
  desc: 'Samsung galaxy series',
  price: 13000000,
  stock: 2,
  img_url: 'https://images-na.ssl-images-amazon.com/images/I/51k-vKS4AOL._AC_SX466_.jpg',
  category: 'Smartwatch',
  UserId: 1,
  official: true,
  createdAt: new Date(),
  updatedAt: new Date()
},{
  name: 'DJI Phantom 4',
  desc: 'DJI drone',
  price: 20000000,
  stock: 1,
  img_url: 'https://img3.ralali.id/mediaflex/500/assets/img/Libraries/283041_DJI-Drone-Phantom4-Pro-Plus-V2-0-Original-Garansi-Resmi-TAM-2-thn_iWPhjGqUTctdOk4S_1561459905.png',
  category: 'Drone',
  UserId: 1,
  official: true,
  createdAt: new Date(),
  updatedAt: new Date()
},{
  name: 'Sony WH-XB900N',
  desc: 'Sony studio wireless headphone',
  price: 3500000,
  stock: 9,
  img_url: 'https://cf.shopee.co.id/file/d348c89c1cfecb9de6fb59629fb53056',
  category: 'Headphone',
  UserId: 1,
  official: true,
  createdAt: new Date(),
  updatedAt: new Date()
}], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
