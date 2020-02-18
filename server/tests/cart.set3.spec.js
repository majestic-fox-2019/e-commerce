'use strict'
const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

afterAll(() => {
  console.log('db closed')
  return sequelize.close()
})

const nonAdminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0ZXIxMjMiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZX0.pIn0WXDNprufg6K8VEhOUjRVMfjycHp0oTSwV21HwGs`

let product = {
  id: 2,
  quantity: 1
}

describe('Add to cart', () => {
  it('On success should return', (done) => {
    request(app)
      .post('/carts/')
      .set('token', nonAdminToken)
      .send(product)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('UserId')
          expect(res.body).toHaveProperty('ProductId')
          expect(res.body).toHaveProperty('quantity')
          expect(typeof res.body.quantity).toBe('number')
          expect(typeof res.body.UserId).toBe('number')
          expect(typeof res.body.ProductId).toBe('number')
          expect(res.body.quantity).not.toBeUndefined()
          expect(res.body.UserId).not.toBeUndefined()
          expect(res.body.ProductId).not.toBeUndefined()
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .post('/carts/')
      .send(product)
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Invalid access token')
          done()
        }
      })
  })
})

describe("Get all user's cart detail", () => {
  it('On success should return', (done) => {
    request(app)
      .get('/carts/')
      .set('token', nonAdminToken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body)).toBeTruthy()
          expect(res.body[0]).toHaveProperty('UserId')
          expect(res.body[0]).toHaveProperty('ProductId')
          expect(res.body[0]).toHaveProperty('quantity')
          expect(res.body[0]).toHaveProperty('createdAt')
          expect(res.body[0]).toHaveProperty('updatedAt')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .get('/carts/')
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Invalid access token')
          done()
        }
      })
  })
})

describe('Update quantity from a product in cart', () => {
  product.quantity = 2
  it('On success should return', (done) => {
    request(app)
      .put('/carts/')
      .set('token', nonAdminToken)
      .send(product)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('UserId')
          expect(res.body).toHaveProperty('ProductId')
          expect(res.body).toHaveProperty('quantity')
          expect(res.body).toHaveProperty('createdAt')
          expect(res.body).toHaveProperty('updatedAt')
          expect(res.body.quantity).toEqual(product.quantity)
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .put('/carts/')
      .send(product)
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Invalid access token')
          done()
        }
      })
  })
})

describe('Checkout', () => {
  let items = [] // cart mocked
  beforeAll(() => {
    const { User, Product } = require('../models')

    let mockuser
    return User.create({
      username: 'user001',
      email: 'user001@mail.com',
      phone: '000000000011',
      password: '123123123',
      platform: 'normal',
      isAdmin: true
    })
      .then((user) => {
        mockuser = user
        let product1 = {
          name: 'Macbook 1',
          price: 13000000,
          stock: 10,
          description: 'Macbook Donk',
          category: 'Laptop',
          image_url:
            'https://static.bmdstatic.com/pk/product/medium/5a5425323ba7a.jpg',
          UserId: mockuser.id
        }

        return Product.create(product1)
      })
      .then((product) => {
        items.push({ id: product.id, quantity: 2 })

        let product2 = {
          name: 'Macbook 2',
          price: 17000000,
          stock: 12,
          description: 'Macbook Donk',
          category: 'Laptop',
          image_url:
            'https://static.bmdstatic.com/pk/product/medium/5a5425323ba7a.jpg',
          UserId: mockuser.id
        }

        return Product.create(product2)
      })
      .then((product2) => {
        items.push({ id: product2.id, quantity: 3 })
      })
      .catch((err) => console.log('error create user at checkout test', err))
  })

  it('On success should return', (done) => {
    request(app)
      .patch('/carts/')
      .set('token', nonAdminToken)
      .send({
        items: items
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Cart status updated')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .patch('/carts/')
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Invalid access token')
          done()
        }
      })
  })
})

describe('Confirm order', () => {
  it('On success should return', (done) => {
    request(app)
      .delete('/carts/confirm')
      .set('token', nonAdminToken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch(
            'Cart dismissed due to order confirmation'
          )
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .delete('/carts/confirm')
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Invalid access token')
          done()
        }
      })
  })
})

describe('Delete item from a cart', () => {
  beforeAll(() => {
    const { Cart } = require('../models')
    Cart.create({
      UserId: 3,
      ProductId: 3,
      quantity: 1,
      confirm: false
    })
  })
  it('On success should return', (done) => {
    request(app)
      .delete('/carts/')
      .set('token', nonAdminToken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('deleted_row')
          expect(typeof res.body.deleted_row).toBe('number')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    request(app)
      .delete('/carts/')
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toMatch('Invalid access token')
          done()
        }
      })
  })
})
