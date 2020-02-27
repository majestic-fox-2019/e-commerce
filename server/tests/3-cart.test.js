const app = require('../app')
const request = require('supertest')
let token

beforeAll(done => {
  const form = {
    name: 'Test',
    email: 'test@mail.com',
    password: 'secret123',
    phone: '08138584854'
  }
  request(app)
    .post('/users/register')
    .send(form)
    .expect(201)
    .end((err, res) => {
      if (err) {
        done(err)
      } else {
        token = res.body.token
        expect(res.body).toHaveProperty('token')
        expect(res.body).toHaveProperty('data')
        expect(res.body.msg).toEqual('User Created')
        done()
      }
    })
})

describe('GET /carts', () => {
  it('should return an array of object', done => {
    request(app)
      .get('/carts')
      .set('token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body)).toBe(true)
          done()
        }
      })
  })
})

describe('POST /carts', () => {
  it('should return a new cart object', done => {
    const data = {
      ProductId: 1,
      qty: 1,
      price: '40000'
    }
    request(app)
      .post('/carts')
      .set('token', token)
      .send(data)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body.result).toBe('object')
          expect(res.body.result).toHaveProperty('UserId')
          expect(res.body.result).toHaveProperty('ProductId')
          expect(res.body.result).toHaveProperty('qty')
          expect(res.body.result).toHaveProperty('price')
          done()
        }
      })
  })
})
