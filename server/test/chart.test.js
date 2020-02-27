const request = require('supertest')
const app = require('../app')

let mallId, productId, user1Token, adminToken, user2Token

describe('login and register as user and admin', () => {
  it('should register successfully', done => {
    let newUser = {
      name: 'test chart',
      email: 'testchart@mail.com',
      password: 'password',
      role: 'user'
    }
    request(app)
      .post('/users/register')
      .send(newUser)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(201)
          expect(res.body.name).toBe(newUser.name)
          expect(res.body.email).toBe(newUser.email)
          expect(res.body.password).toBe(newUser.password)
          expect(res.body.role).toBe(newUser.role)
          done()
        }
      })
  })

  it('should login sucessfully', done => {
    let userLogin = {
      email: 'testchart@mail.com',
      password: 'password'
    }
    request(app)
      .post('/users/login')
      .send(userLogin)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(200)
          expect(res.body.email).toBe(userLogin.email)
          user1Token = res.body.token
          done()
        }
      })
  })

  it('should register successfully', done => {
    let newUser = {
      name: 'test chart',
      email: 'testchart2@mail.com',
      password: 'password',
      role: 'user'
    }
    request(app)
      .post('/users/register')
      .send(newUser)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(201)
          expect(res.body.name).toBe(newUser.name)
          expect(res.body.email).toBe(newUser.email)
          expect(res.body.password).toBe(newUser.password)
          expect(res.body.role).toBe(newUser.role)
          done()
        }
      })
  })

  it('should login sucessfully', done => {
    let userLogin = {
      email: 'testchart2@mail.com',
      password: 'password'
    }
    request(app)
      .post('/users/login')
      .send(userLogin)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(200)
          expect(res.body.email).toBe(userLogin.email)
          user2Token = res.body.token
          done()
        }
      })
  })

  it('should create a new post', done => {
    let userRegister = {
      name: 'admin12',
      email: 'admin12@mail.com',
      password: 'password',
      role: 'admin'
    }
    request(app)
      .post('/users/register')
      .send(userRegister)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(201)
          expect(res.body.name).toBe(userRegister.name)
          expect(res.body.email).toBe(userRegister.email)
          expect(res.body.password).toBe(userRegister.password)
          expect(res.body.role).toBe(userRegister.role)
          done()
        }
      })
  })

  it('should login successfully', done => {
    let userLogin = {
      email: 'admin12@mail.com',
      password: 'password'
    }
    request(app)
      .post('/users/login')
      .send(userLogin)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body.email).toBe('admin12@mail.com')
          adminToken = res.body.token
          done()
        }
      })
  })
})

describe('add User and Mall Product', () => {
  it('should create a mall product successfully', done => {
    let newProduct = {
      name: 'contoh barang buat chart',
      imageUrl: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 12,
      price: '2000000',
      category: 'drum'
    }
    request(app)
      .post('/malls')
      .set('token', adminToken)
      .send(newProduct)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body.name).toBe(newProduct.name)
          expect(res.body.stock).toBe(12)
          expect(res.body.price).toBe('2000000')
          done()
        }
      })
  })

  it('should create a mall product successfully', done => {
    let newProduct = {
      name: 'contoh barang untuk chart',
      imageUrl: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 12,
      price: '2000000',
      category: 'keyboard'
    }
    request(app)
      .post('/malls')
      .set('token', adminToken)
      .send(newProduct)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body.name).toBe(newProduct.name)
          expect(res.body.stock).toBe(12)
          expect(res.body.price).toBe('2000000')
          done()
        }
      })
  })

  it('should create an user product successfully', done => {
    let newProduct = {
      name: 'contoh barang',
      imageUrl: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 12,
      price: '2000000',
      category: 'drum'
    }
    request(app)
      .post('/products')
      .set('token', user2Token)
      .send(newProduct)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(res.body.name).toBe('contoh barang')
          expect(res.body.stock).toBe(12)
          expect(res.body.price).toBe('2000000')
          done()
        }
      })
  })

  it('should create an user product successfully', done => {
    let newProduct = {
      name: 'contoh barang',
      imageUrl: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 12,
      price: '2000000',
      category: 'keyboard'
    }
    request(app)
      .post('/products')
      .set('token', user2Token)
      .send(newProduct)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body.name).toBe('contoh barang')
          expect(res.body.stock).toBe(12)
          expect(res.body.price).toBe('2000000')
          done()
        }
      })
  })

  it('should show all mall product', done => {
    request(app)
      .get('/malls')
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          // expect(res.body.length).toBe(2)
          //   console.log(res.body.length, 'ini adalah length nya')
          mallId = res.body[0].id
          done()
        }
      })
  })

  it('should show all user product', done => {
    request(app)
      .get('/products')
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(200)
          // expect(res.body.length).toBe(2)
          // console.log(res.body, 'ini adalah semua product')
          productId = res.body[0].id
          // console.log(res.body)
          done()
        }
      })
  })
})

describe('chart activity', () => {
  it('should successfully add mall chart', done => {
    let newChart = {
      quantity: 2
    }
    request(app)
      .post(`/charts/mall/${mallId}`)
      .set('token', user1Token)
      .send(newChart)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          console.log(res.body, 'ini adalah hasil penambahaan mall chart')
          expect(201)
          done()
        }
      })
  })

  it('should successfully add product chart', done => {
    let newChart = {
      quantity: 2
    }
    request(app)
      .post(`/charts/product/${productId}`)
      .set('token', user1Token)
      .send(newChart)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          console.log(res.body, 'ini adalah hasil penambahaan product chart')
          expect(201)
          done()
        }
      })
  })
})
