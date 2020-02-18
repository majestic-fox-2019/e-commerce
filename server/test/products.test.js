const app = require('../app')
const request = require('supertest');
const jwt = require('jsonwebtoken')

const token = jwt.sign({ email: 'user@gmail.com' }, 'process.env.JWT_TOKEN')

// create new product
describe('POST /products', () => {
  it('should create new product', (done) => {
    let product = {
      name: 'key chain',
      image: 'http://url',
      price: 30000,
      stock: 23
    }
    request(app)
      .post('/products')
      .send(product)
      // .set('token', token)
      .expect(201)
      .then(res => {
        console.log(res.body, '< success post products')
        expect(res.body.name).toEqual(product.name)
        expect(res.body.image).toEqual(product.image)
        expect(res.body.price).toEqual(product.price)
        expect(res.body.stock).toEqual(product.stock)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

// // negatif input for price and stock
// describe('POST /products', () => {
//   it('negatif input for price and stock', (done) => {
//     let product = {
//       name: 'key chain',
//       image: 'http://url',
//       price: -30000,
//       stock: -23
//     }
//     request(app)
//       .post('/products')
//       .send(product)
//       .then(res => {
//         expect(res.body.statusCode).not.toEqual(201)
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })

// // missing input
// describe('POST /products', () => {
//   it('should not create new product', (done) => {
//     let product = {
//       name: 'key chain',
//       stock: 23
//     }
//     request(app)
//       .post('/products')
//       .send(product)
//       .then(res => {
//         expect(res.body.statusCode).not.toEqual(201)
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })

// // show all products
// describe('GET /products', () => {
//   it('responds with json', (done) => {
//     request(app)
//       .get('/products')
//       .expect(200)
//       .then(res => {
//         console.log(res.body, '< res.body get products')
//         expect(res.body[0]).toHaveProperty('name')
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// // show all products
// describe('GET /product', () => {
//   it('responds with json', (done) => {
//     request(app)
//       .get('/product')
//       .then(res => {
//         console.log(res, '< ini res')
//         expect(res.body.statusCode).not.toEqual(201)
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// // show product by id
// describe('GET /product/:id', () => {
//   it('get one product', (done) => {
//     request(app)
//       .get('/products/1')
//       .expect(200)
//       .then(res => {
//         console.log(res.body, '< get one product')
//         expect(res.body).toHaveProperty('name')
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// // get undefined id
// describe('GET /product/:id', () => {
//   it('get undefined id', (done) => {
//     request(app)
//       .get('/products/0')
//       .expect(200)
//       .then(res => {
//         console.log(res.body, '< get one product')
//         expect(res.body).toEqual(null)
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// // update product
// describe('PUT /products', () => {
//   it('should update product', (done) => {
//     let product = {
//       name: 'key-chains',
//       image: 'http://url',
//       price: 10000,
//       stock: 50
//     }
//     request(app)
//       .put('/products/1')
//       .send(product)
//       .expect(200)
//       .then(res => {
//         console.log(res.body, '< success update products')
//         expect(res.body[0]).toEqual(1)
//         expect(res.body[1][0]).toHaveProperty('name')
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// delete product
// describe('DELETE /products', () => {
//   it('should delete product', (done) => {
//     request(app)
//       .delete('/products/1')
//       .expect(200)
//       .then(res => {
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })