'use strict'

const products = [
  {
    name: 'ASUS ROG G21CN-D-I7R62T [90PD02K1-M05950] - Black',
    price: 19999000,
    description: `
      <ul class="-bt-description">
        <li>Processor: Intel Core i7-8700</li>
        <li> RAM: 8GB DDR4</li>
        <li> HDD: 1TB</li>
        <li> Grafik: NVIDIA GeForce RTX 2060 6GB</li>
        <li> Sistem Operasi: Windows 10 Home</li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Laptop',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5d2d6c96bd313.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name: 'ASUS ROG GL10CS-I7661T [90PD02S1-M08620] - Gray',
    price: 16999000,
    description: `
      <ul class="-bt-description">
        <li>Processor: Intel Core i7-8700</li>
        <li> RAM: 8GB DDR4</li>
        <li> HDD: 1TB</li>
        <li> Grafik: NVIDIA GeForce GTX1660Ti 6GB</li>
        <li> Sistem Operasi: Windows 10 Home</li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Desktop',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5d2d542e6c7f2.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name: 'ASUS ROG Strix III G531GT-I765G1T [90NR01L3-M01360]',
    price: 16999000,
    description: `<ul class="-bt-description">
        <li>Processor: Intel® Core i7-9750H</li>
        <li> RAM: 8GB DDR4</li>
        <li> SSD: 512GB</li>
        <li> VGA: NVIDIA GeForce GTX 1650 4GB</li>
        <li> Konektivitas: Bluetooth</li>
        <li> Wifi</li>
        <li> Ukuran Layar 15.6 Inch FHD</li>
        <li> Keyboard: Illuminated Chiclet Keyboard RGB</li>
        <li> Sistem Operasi: Windows 10</li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Laptop',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5e0576f8a2057.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name: 'ASUS TUF FX505DV-R766RT [90NR02N1-M00140] - Gold Steel',
    price: 16999000,
    description: `
      <ul class="-bt-description">
        <li>Processor: AMD Ryzen 7 3750H</li>
        <li> RAM: 8GB DDR4</li>
        <li> SSD: 512GB</li>
        <li> VGA: NVIDIA GeForce RTX2060 6GB</li>
        <li> Konektivitas: LAN + Wifi + Bluetooth</li>
        <li> Ukuran Layar: 15.6 Inch FHD 120Hz</li>
        <li> Sistem Operasi: Windows 10</li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Laptop',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5d4a4f11e63bd.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name: 'LOGITECH G Pro Gaming Keyboard [920-008296]',
    price: 1890000,
    description: `
      <ul class="-bt-description">
        <li>Gaming Keyboard</li>
        <li> RGB Backlight</li>
        <li> Durability: 70 million keypresses</li>
        <li> Actuation distance: 1.5 mm</li>
        <li> Connection Type: USB 2.0</li>
        <li> Special Keys: Programmable FN keys</li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Keyboard',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5a434bddb76b9.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name:
      'LOGITECH G512 RGB Mechanical Gaming Keyboard Romer-G Tactile [920-008763]',
    price: 1509000,
    description: `
      <ul class="-bt-description">
        <li>RGB Mechanical Gaming Keyboard</li>
        <li> Switch : Romer-G Tactile</li>
        <li> 16.8 M colors Lightsync RGB</li>
        <li> Full Funtion Keys</li>
        <li> Material : Aircraft-Grade Aluminum Alloy</li>
        <li> USB Passthrough</li>
        <li> Cable: 1.8 m</li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Keyboard',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5b344c4b8942b.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name: 'ASUS ROG Strix Gaming Monitor 45 Inch XG438Q',
    price: 17799000,
    description: `
      <ul class="-bt-description">
        <li>Wide Screen</li>
        <li> Ukuran : 45 Inch</li>
        <li> Resolusi : 3840 x 2160</li>
        <li> Rasio Aspek : 16:9</li>
        <li> Rasio Kontras : 4000 :1</li>
        <li> Waktu Respon : 4ms (GTG)</li>
        <li> Brightness : 450 cd/m2</li>
        <li> Signal Input : HDMI(v2.0) x3</li>
        <li> DisplayPort 1.4</li>{' '}
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Monitor',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5df89aa895d9d.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name: 'ASUS ROG Swift Gaming Monitor 27 Inch PG27UQ',
    price: 36399000,
    description: `
      <ul class="-bt-description">
        <li>Size inches: 27 inch</li>
        <li> Resolution: 3840 x 2160</li>
        <li> Contrast ratio: 1000:1</li>
        <li> Brightness: 600 cd/m²</li>
        <li>
          I/O Ports: HDMI(v2.0); DisplayPort 1.4; 3.5mm Mini-Jack; USB 3.0
        </li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Monitor',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5c5a61dcd8da0.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name: 'LOGITECH G Pro Wireless Gaming Mouse [910-005274]',
    price: 2075000,
    description: `
      <ul class="-bt-description">
        <li>Gaming Mouse</li>
        <li> Sensor : Hero</li>
        <li> Resolution: 100 – 16.000 dpi</li>
        <li> Wireless technology: LIGHTSPEED Wireless</li>
        <li> 6 Programmable Buttons</li>
        <li> Lightsync RGB: 1 zones</li>
        <li> Mechanical Button Tensioning System</li>
        <li> USB receiver</li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Mouse',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5c63df56bcabd.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  },
  {
    name: 'LOGITECH G703 Lightspeed Wireless Gaming Mouse [910-005095]',
    price: 1549000,
    description: `
      <ul class="-bt-description">
        <li>Wireless Gaming Mouse</li>
        <li> Resolution: 200 - 12000 dpi</li>
        <li> Max. acceleration: &gt;40G</li>
        <li> Max. speed: &gt;400 IPS</li>
        <li> Powerplay Wireless Charging Compatible</li>
      </ul>`,
    stock: Math.floor(Math.random() * 26),
    category: 'Mouse',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5b32083b501e3.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', products, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
}
