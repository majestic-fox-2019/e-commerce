const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

afterAll(() => {
  console.log('db closed')
  return sequelize.close()
})

describe('Register user', () => {
  const userData = {
    username: 'tester123',
    email: 'test@mail.com',
    phone: '08091000100',
    password: 'asdasd'
  }
  it('On success should return', (done) => {
    request(app)
      .post('/register')
      .send(userData)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('token')
          expect(res.body.token).not.toBeUndefined()
          expect(res.body).not.toHaveProperty('password')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    userData.username = 'test'
    userData.password = 'asd'
    request(app)
      .post('/register')
      .send(userData)
      .expect(400)
      .end((err, res) => {
        if (err) done(err)
        expect(typeof res.body).toBe('object')
        expect(res.body).toHaveProperty('msg')
        done()
      })
  })
})

describe('Login User', () => {
  const userData = {
    email: 'test@mail.com',
    password: 'asdasd'
  }
  it('On success should return', (done) => {
    request(app)
      .post('/login')
      .send(userData)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('token')
          expect(res.body).not.toHaveProperty('password')
          done()
        }
      })
  })

  it('On fail should return', (done) => {
    userData.email = 'tester@gmail.com'
    userData.password = 'asd'
    request(app)
      .post('/login')
      .send(userData)
      .expect(400)
      .end((err, res) => {
        if (err) done(err)
        expect(typeof res.body).toBe('object')
        expect(res.body).toHaveProperty('msg')
        done()
      })
  })
})
