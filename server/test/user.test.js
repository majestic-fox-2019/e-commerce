const request = require('supertest')
const app = require('../app')

describe('Login Register', () => {
  it('should create a new user', async done => {
    let userRegister = {
      name: 'samuel zega',
      email: 'samuel@mail.com',
      password: 'password',
      role: 'user'
    }
    const res = await request(app)
      .post('/users/register')
      .send(userRegister)
    expect(res.statusCode).toEqual(201)
    expect(res.body.name).toBe(userRegister.name)
    expect(res.body.email).toBe(userRegister.email)
    expect(res.body.password).toBe(userRegister.password)
    expect(res.body.role).toBe(userRegister.role)

    done()
  })

  it('should login successfully', async done => {
    let userLogin = {
      email: 'samuel@mail.com',
      password: 'password'
    }
    const res = await request(app)
      .post('/users/login')
      .send(userLogin)
    expect(res.body.email).toBe('samuel@mail.com')
    done()
  })
})
