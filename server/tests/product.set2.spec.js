const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

afterAll(() => {
  console.log('db closed')
  return sequelize.close()
})

let product = {
  name: 'Macbook Air',
  price: 13000000,
  stock: 10,
  description: 'Macbook Donk',
  category: 'Laptop',
  image_url: 'https://static.bmdstatic.com/pk/product/medium/5a5425323ba7a.jpg'
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6IkFkbWluMSIsImVtYWlsIjoiYWRtaW4xQG1haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZX0.9YWcy3G_mWUjoXWnLiXHboPBkTyA_eNMyfBEmR29B_4'

const nonAdminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0ZXIxMjMiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZX0.pIn0WXDNprufg6K8VEhOUjRVMfjycHp0oTSwV21HwGs`

describe('Create product', () => {
  it('On Success should return', (done) => {
    request(app)
      .post('/products/')
      .set('token', token)
      .send(product)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('price')
          expect(res.body).toHaveProperty('stock')
          expect(res.body).toHaveProperty('description')
          expect(res.body).toHaveProperty('image_url')
          expect(res.body).toHaveProperty('UserId')
          expect(res.body).toHaveProperty('createdAt')
          expect(res.body).toHaveProperty('updatedAt')
          expect(res.body.name).toMatch(product.name)
          expect(res.body.price).toEqual(product.price)
          expect(res.body.stock).toEqual(product.stock)
          expect(res.body.description).toMatch(product.description)
          expect(res.body.image_url).toMatch(product.image_url)
          expect(typeof res.body.price).toBe('number')
          expect(typeof res.body.stock).toBe('number')
          done()
        }
      })
  })

  it('On error should return', (done) => {
    product.name = ''
    product.stock = 0
    product.price = 0
    product.description = 'mac'
    request(app)
      .post('/products/')
      .set('token', token)
      .send(product)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toContain('Name is required')
          expect(res.body.msg).toContain('Price minimum value is 1')
          expect(res.body.msg).toContain('Description min. 6 characters')
          done()
        }
      })
  })
})

describe('Read all product list', () => {
  it('On success should return', (done) => {
    request(app)
      .get('/products/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body)).toBeTruthy()
          expect(res.body[0]).toHaveProperty('name')
          expect(res.body[0]).toHaveProperty('price')
          expect(res.body[0]).toHaveProperty('stock')
          expect(res.body[0]).toHaveProperty('description')
          expect(res.body[0]).toHaveProperty('image_url')
          expect(res.body[0]).toHaveProperty('UserId')
          expect(res.body[0]).toHaveProperty('createdAt')
          expect(res.body[0]).toHaveProperty('updatedAt')
          done()
        }
      })
  })
})

describe('Read one product list', () => {
  it('On success should return', (done) => {
    request(app)
      .get('/products/1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('price')
          expect(res.body).toHaveProperty('stock')
          expect(res.body).toHaveProperty('description')
          expect(res.body).toHaveProperty('image_url')
          expect(res.body).toHaveProperty('UserId')
          expect(res.body).toHaveProperty('createdAt')
          expect(res.body).toHaveProperty('updatedAt')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .get('/products/100')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Product not found')
          done()
        }
      })
  })
})

describe('Update product detail', () => {
  let product = {
    name: 'Macbook Pro',
    price: 20000000,
    stock: 5,
    description: 'Macbook Pro Donk',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5dcbdac614ea8.jpg'
  }
  it('On success should return', (done) => {
    request(app)
      .put('/products/1')
      .set('token', token)
      .send(product)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('price')
          expect(res.body).toHaveProperty('stock')
          expect(res.body).toHaveProperty('description')
          expect(res.body).toHaveProperty('image_url')
          expect(res.body).toHaveProperty('UserId')
          expect(res.body).toHaveProperty('createdAt')
          expect(res.body).toHaveProperty('updatedAt')
          expect(res.body.name).toMatch(product.name)
          expect(res.body.price).toEqual(product.price)
          expect(res.body.stock).toEqual(product.stock)
          expect(res.body.description).toMatch(product.description)
          expect(res.body.image_url).toMatch(product.image_url)
          expect(typeof res.body.price).toBe('number')
          expect(typeof res.body.stock).toBe('number')
          done()
        }
      })
  })

  // Unauthorized User or non admin user
  it('On fail should return', (done) => {
    request(app)
      .put('/products/1')
      .set('token', nonAdminToken)
      .send(product)
      .expect(403)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Forbidden Access')
          done()
        }
      })
  })
})

describe('Delete product from list', () => {
  let product = {
    name: 'Macbook Pro',
    price: 20000000,
    stock: 5,
    description: 'Macbook Pro Donk',
    category: 'Laptop',
    image_url:
      'https://static.bmdstatic.com/pk/product/medium/5dcbdac614ea8.jpg',
    UserId: 1
  }

  const { Product } = require('../models')

  beforeEach(() => {
    Product.create(product)
  })

  it('On success should return', (done) => {
    request(app)
      .delete('/products/1')
      .set('token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('price')
          expect(res.body).toHaveProperty('stock')
          expect(res.body).toHaveProperty('description')
          expect(res.body).toHaveProperty('image_url')
          expect(res.body).toHaveProperty('UserId')
          expect(res.body).toHaveProperty('createdAt')
          expect(res.body).toHaveProperty('updatedAt')
          done()
        }
      })
  })

  // Unauthorized User or non admin user
  it('On fail should return', (done) => {
    request(app)
      .delete('/products/2')
      .set('token', nonAdminToken)
      .send(product)
      .expect(403)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Forbidden Access')
          done()
        }
      })
  })
})
