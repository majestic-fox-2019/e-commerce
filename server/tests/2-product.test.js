const app = require('../app')
const request = require('supertest')
let token

beforeAll(done => {
  const form = {
    name: 'Ilham',
    email: 'abdul@mail.com',
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

describe('PATCH /users/create-shop', () => {
  it('should return status 200 msg shop created', done => {
    const shop = {
      shop_name: 'TOKOMEDIA'
    }
    request(app)
      .patch('/users/create-shop')
      .set('token', token)
      .send(shop)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body.msg).toEqual('Shop created')
          done()
        }
      })
  })
})

describe('GET /products', () => {
  it('should return array result', done => {
    request(app)
      .get('/products')
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

describe('POST /products', () => {
  it('should return object result and status 201', done => {
    const data = {
      name: 'Barang mewah',
      description: 'Ini barang mewah',
      price: '40000',
      stocks: 5,
      category: 'Baju',
      image_url: 'http://gambar.com'
    }
    request(app)
      .post('/products')
      .set('token', token)
      .send(data)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('data')
          expect(res.body.msg).toBe('New product created')
          done()
        }
      })
  })

  it('should return not authorized and status 401', done => {
    const data = {
      name: 'Barang mewah',
      description: 'Ini barang mewah',
      price: '40000',
      stocks: 6,
      category: 'Baju',
      image_url: 'http://gambar.com'
    }
    request(app)
      .post('/products')
      .send(data)
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body.err)).toBe(true)
          expect(res.body.err[0]).toEqual('You are not authorized')
          done()
        }
      })
  })
})

describe('PUT /products/:id', () => {
  it('should return msg and status 200', done => {
    const data = {
      name: 'Barang mewah 2',
      description: 'Ini barang mewah',
      price: '40000',
      stocks: 7,
      category: 'Baju',
      image_url: 'http://gambar.com'
    }
    request(app)
      .put('/products/1')
      .set('token', token)
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toBe('Product updated')
          done()
        }
      })
  })

  it('should return not authorized and status 401', done => {
    const data = {
      name: 'Barang mewah',
      description: 'Ini barang mewah',
      price: '40000',
      stocks: 7,
      category: 'Baju',
      image_url: 'http://gambar.com'
    }
    request(app)
      .put('/products/1')
      .send(data)
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body.err)).toBe(true)
          expect(res.body.err[0]).toEqual('You are not authorized')
          done()
        }
      })
  })

  it('should return not authorized and status 401', done => {
    const data = {
      name: 'Barang mewah',
      description: 'Ini barang mewah',
      price: '40000',
      stocks: 7,
      category: 'Baju',
      image_url: 'http://gambar.com'
    }
    request(app)
      .put('/products/1')
      .set('token', 'tokengasal')
      .send(data)
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body.err)).toBe(true)
          expect(res.body.err[0]).toEqual('You are not authorized')
          done()
        }
      })
  })
})

describe('DELETE /products/:id', () => {
  it('should return not authorized and status 401', done => {
    request(app)
      .delete('/products/1')
      .set('token', 'tokengasal')
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body.err)).toBe(true)
          expect(res.body.err[0]).toEqual('You are not authorized')
          done()
        }
      })
  })

  it('should return not authorized and status 401', done => {
    request(app)
      .delete('/products/1')
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(Array.isArray(res.body.err)).toBe(true)
          expect(res.body.err[0]).toEqual('You are not authorized')
          done()
        }
      })
  })

  it('should return msg and status 200', done => {
    request(app)
      .delete('/products/1')
      .set('token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toBe('object')
          expect(res.body).toHaveProperty('msg')
          expect(res.body.msg).toBe('Product deleted')
          done()
        }
      })
  })
})
