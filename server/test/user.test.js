const app = require('../app')
const request = require('supertest');

// register new user
describe('POST /register', () => {
  it('should register new user', (done) => {
    let user = {
      name: 'user',
      email: 'user@gmail.com',
      password: 'user12345',
    }
    request(app)
      .post('/register/')
      .send(user)
      .expect(201)
      .then(res => {
        expect(res.body.name).toEqual(user.name)
        expect(res.body.email).toEqual(user.email)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

// login user
describe('POST /login', () => {
  it('should login user', (done) => {
    let user = {
      email: 'user@gmail.com',
      password: 'user12345',
    }
    request(app)
      .post('/login')
      .send(user)
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

