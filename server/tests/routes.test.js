const request = require('supertest')
const app = require('../app')

let token = null

// REGISTER
describe('User Endpoints', () => {
  it('should create a new User', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name:'Arif',
        username: 'arif05rachman',
        email:'arif05rachman@gmail.com',
        password: '12345'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('username')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('password')
  })
  // LOGIN
  it('should login a User', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email:'arif05rachman@gmail.com',
        password: '12345'
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
  })
})

// PRODUCT
// create
describe('Admin Endpoints', () => {
  it('should create a new Product', async () => {
    const res = await request(app)
      .post('/products').set('token',token)
      .send({
        name:'Bag',
        image_url: 'http://image_url/product.jpg',
        price: 100000,
        stock: 20
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('image_url')
    expect(res.body).toHaveProperty('price')
    expect(res.body).toHaveProperty('stock')
  }),

  // read
  it('should show all Product', async () => {
    const res = await request(app)
      .get('/products').set('token', token)
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
  // read one
  it('should show one Product', async () => {
    const res = await request(app)
      .get('/products/1').set('token', token)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('image_url')
    expect(res.body).toHaveProperty('price')
    expect(res.body).toHaveProperty('stock')
  })
  // edit
  it('should edit Product', async () => {
    const res = await request(app)
      .put('/products/1').set('token', token)
      .send({
        name:'Bag Carrier',
        image_url: 'http://image_url/product.jpg',
        price: 100000,
        stock: 20
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('image_url')
    expect(res.body).toHaveProperty('price')
    expect(res.body).toHaveProperty('stock')
  })
    // delete
    it('should delete Product', async () => {
      const res = await request(app)
        .delete('/products/1').set('token', token)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('image_url')
      expect(res.body).toHaveProperty('price')
      expect(res.body).toHaveProperty('stock')
    })
})