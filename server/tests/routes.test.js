const request = require('supertest')
const app = require('../app')

let token = null

describe('User Endpoints', () => {
  it('Should create new User', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        name: 'Test Name',
        email: 'tes@mail.com',
        password: 'tes123',
        role: 'admin'
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('password')
  })

  it('Should login user and get token', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'tes@mail.com',
        password: 'tes123'
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
  })
})

describe('Products Endpoints', () => {
  it('Should create a new Product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('token', token)
      .send({
        name: 'Tes Product Name',
        description: 'Tes Product Description',
        image_url: 'https://tesproductimageurl.com',
        price: '130000',
        stock: 1
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('description')
    expect(res.body).toHaveProperty('image_url')
    expect(res.body).toHaveProperty('price')
    expect(res.body).toHaveProperty('stock')
  })

  it('Should show list of Product', async () => {
    const res = await request(app)
      .get('/api/products')
    expect(res.status).toEqual(200)
  })

  it('Should show list of Product', async () => {
    const res = await request(app)
      .get('/api/products/1')
    expect(res.status).toEqual(200)
  })

  it('Should update product', async () => {
    const res = await request(app)
      .put('/api/products/1')
      .set('token', token)
      .send({
        name: 'Tes Product Name',
        description: 'Tes Product Description',
        image_url: 'https://tesproductimageurl.com',
        price: '130000',
        stock: 1
      })
    expect(res.status).toEqual(200)
  })

  it('Should delete product', async () => {
    const res = await request(app)
      .delete('/api/products/1')
      .set('token', token)
    expect(res.status).toEqual(200)
  })

})

describe('Cart Endpoints', () => {
  it('Should add cart', async () => {
    const res = await request(app)
      .post('/api/carts/1')
      .set('token', token)
    expect(res.status).toEqual(201)
  })

  it('Should list cart', async () => {
    const res = await request(app)
      .get('/api/carts')
      .set('token', token)
    expect(res.status).toEqual(200)
  })
})