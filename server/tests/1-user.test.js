const app = require('../app')
const request = require('supertest')

describe('POST /users/register', () => {
  it('should return a token', done => {
    const form = {
      name: 'Ilham',
      email: 'ilham@mail.com',
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
          expect(res.body).toHaveProperty('token')
          expect(res.body).toHaveProperty('data')
          expect(res.body.msg).toEqual('User Created')
          done()
        }
      })
  })

  it('should return 400 code, email already used', done => {
    const form = {
      name: 'Ilham',
      email: 'ilham@mail.com',
      password: 'secret123',
      phone: '08138584854'
    }
    request(app)
      .post('/users/register')
      .send(form)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body).toHaveProperty('code')
          expect(res.body).toHaveProperty('err')
          expect(typeof res.body).toBe('object')
          expect(Array.isArray(res.body.err)).toBe(true)
          expect(res.body.err[0].msg).toEqual('Email already used')
          done()
        }
      })
  })

  it('should return bad request 400, email cannot empty', done => {
    const form = {
      name: 'Ilham',
      email: null,
      password: 'secret123',
      phone: '08138584854'
    }
    request(app)
      .post('/users/register')
      .send(form)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body).toHaveProperty('code')
          expect(res.body).toHaveProperty('err')
          expect(typeof res.body).toBe('object')
          expect(Array.isArray(res.body.err)).toBe(true)
          done()
        }
      })
  })

  it('should return bad request 400, phone validation', done => {
    const form = {
      name: 'Ilham',
      email: 'malik@mail.com',
      password: 'secret123',
      phone: '08138'
    }
    request(app)
      .post('/users/register')
      .send(form)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body).toHaveProperty('code')
          expect(res.body).toHaveProperty('err')
          expect(typeof res.body).toBe('object')
          expect(Array.isArray(res.body.err)).toBe(true)
          done()
        }
      })
  })
})

describe('POST /users/login', () => {
  it('should return a token', done => {
    const form = {
      email: 'ilham@mail.com',
      password: 'secret123'
    }
    request(app)
      .post('/users/login')
      .send(form)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body).toHaveProperty('token')
          expect(res.body).toHaveProperty('data')
          expect(res.body.msg).toEqual('Login Success')
          done()
        }
      })
  })

  it('should return bad request 400, wrong password', done => {
    const form = {
      email: 'ilham@mail.com',
      password: 'secret12'
    }
    request(app)
      .post('/users/login')
      .send(form)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body).toHaveProperty('code')
          expect(res.body).toHaveProperty('err')
          expect(typeof res.body).toBe('object')
          expect(Array.isArray(res.body.err)).toBe(true)
          done()
        }
      })
  })

  it('should return bad request 400, wrong email', done => {
    const form = {
      email: 'ilham@gmail.com',
      password: 'secret123'
    }
    request(app)
      .post('/users/login')
      .send(form)
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body).toHaveProperty('code')
          expect(res.body).toHaveProperty('err')
          expect(typeof res.body).toBe('object')
          expect(Array.isArray(res.body.err)).toBe(true)
          done()
        }
      })
  })
})
