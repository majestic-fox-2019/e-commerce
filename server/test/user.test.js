const request = require('supertest')
const app = require('../app')

describe('POST /users/register', function () {
  it('responds register', function (done) {
    let register = {
      username: 'Dimas',
      email: 'dimas@mail.com',
      role: 'admin',
      password: '123'
    }
    request(app)
      .post('/users/register')
      .send(register)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          expect(res.body).toHaveProperty('token')
          done()
        }
      })
  })
});

describe('POST /users/login', function () {
  it('responds login', function (done) {
    let register = {
      email: 'dimas@mail.com',
      password: '123'
    }
    request(app)
      .post('/users/register')
      .send(register)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          expect(res.body).toHaveProperty('token')
          done()
        }
      })
  })
});
