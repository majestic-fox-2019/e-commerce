const app = require('../app')
const request = require('supertest');
const jwt = require('jsonwebtoken')

const token = jwt.sign({ email: 'user@gmail.com', role: 'admin' }, process.env.JWT_TOKEN)

// create new products
describe('POST /products', () => {
  it('should create new products', (done) => {
    let products = {
      name: 'key chain',
      image: 'http://url.com',
      price: 30000,
      stock: 23,
      rating: 5,
      CategoryId: 1
    }
    request(app)
      .post('/products')
      .send(products)
      .set('token', token)
      .expect(201)
      .then(res => {
        console.log(res.body, '< success post products')
        expect(res.body.name).toEqual(products.name)
        expect(res.body.image).toEqual(products.image)
        expect(res.body.price).toEqual(products.price)
        expect(res.body.rating).toEqual(products.rating)
        expect(res.body.stock).toEqual(products.stock)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

// negatif input for price and stock
describe('POST /products', () => {
  it('negatif input for price and stock', (done) => {
    let products = {
      name: 'key chain',
      image: 'http://url',
      price: -30000,
      stock: -23
    }
    request(app)
      .post('/products')
      .send(products)
      .set('token', token)
      .then(res => {
        expect(res.body.statusCode).not.toEqual(201)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

// missing input
describe('POST /products', () => {
  it('should not create new products', (done) => {
    let products = {
      name: 'key chain',
      stock: 23
    }
    request(app)
      .post('/products')
      .send(products)
      .set('token', token)
      .then(res => {
        expect(res.body.statusCode).not.toEqual(201)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

// show all products
describe('GET /products', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/products')
      .set('token', token)
      .expect(200)
      .then(res => {
        console.log(res.body, '< res.body get products')
        expect(res.body[0]).toHaveProperty('name')
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// show all products
describe('GET /products', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/products')
      .set('token', token)
      .then(res => {
        console.log(res, '< ini res')
        expect(res.body.statusCode).not.toEqual(201)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// show products by id
describe('GET /products/:id', () => {
  it('get one products', (done) => {
    request(app)
      .get('/products/1')
      .set('token', token)
      .expect(200)
      .then(res => {
        console.log(res.body, '< get one products')
        expect(res.body).toHaveProperty('name')
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// get undefined id
describe('GET /products/:id', () => {
  it('get undefined id', (done) => {
    request(app)
      .get('/products/0')
      .set('token', token)
      .expect(200)
      .then(res => {
        console.log(res.body, '< get one products')
        expect(res.body).toEqual(null)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// update products
describe('PUT /products', () => {
  it('should update products', (done) => {
    let products = {
      name: 'key-chains',
      image: 'http://url.com',
      price: 10000,
      stock: 50,
      rating: 4,
      CategoryId: 2
    }
    request(app)
      .put('/products/1')
      .send(products)
      .set('token', token)
      .expect(200)
      .then(res => {
        console.log(res.body, '< success update products')
        expect(res.body).toHaveProperty('name')
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// delete products
describe('DELETE /products', () => {
  it('should delete products', (done) => {
    request(app)
      .delete('/products/1')
      .set('token', token)
      .expect(200)
      .then(res => {
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})