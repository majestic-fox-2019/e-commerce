const app = require('../app')
const request = require('supertest');

// register new user
describe('POST /user/register', () => {
  it('should register new user', (done) => {
    let user = {
      name: 'user',
      email: 'user@gmail.com',
      password: 'user',
    }
    request(app)
      .post('/user/register')
      .send(user)
      .expect(201)
      .then(res => {
        console.log(res.body, '< success register users')
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
describe('POST /user/login', () => {
  it('should login user', (done) => {
    let user = {
      email: 'user@gmail.com',
      password: 'user',
    }
    request(app)
      .post('/user/login')
      .send(user)
      .expect(200)
      .then(res => {
        console.log(res.body, '< token login users')
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

