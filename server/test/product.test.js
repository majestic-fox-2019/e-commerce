const request = require('supertest')
const app = require('../app.js')

let publicToken = null
let publicProductId = null

describe('Login Register', () => {
  it('should create a new post', done => {
    let userRegister = {
      name: 'samuel zega',
      email: 'user@mail.com',
      password: 'password',
      role: 'user'
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
      email: 'user@mail.com',
      password: 'password'
    }
    request(app)
      .post('/users/login')
      .send(userLogin)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body.email).toBe('user@mail.com')
          publicToken = res.body.token
          done()
        }
      })
  })
})

describe('User Activity', () => {
  it('should create an user product successfully', done => {
    let newProduct = {
      name: 'contoh barang',
      file: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 12,
      price: '2000000',
      category: 'drum'
    }
    request(app)
      .post('/products')
      .set('token', publicToken)
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
      file: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 12,
      price: '2000000',
      category: 'keyboard'
    }
    request(app)
      .post('/products')
      .set('token', publicToken)
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

  it('should show all product', done => {
    request(app)
      .get('/products')
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(200)
          // expect(res.body.length).toBe(2)
          // console.log(res.body, 'ini adalah semua product')
          publicProductId = res.body[1].id
          // console.log(res.body)

          done()
        }
      })
  })

  it('should show all the user product', done => {
    request(app)
      .get('/products/user')
      .set('token', publicToken)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(200)
          // expect(res.body.length).toBe(2)
          // console.log(res.body, 'ini adalah semua user product')
          // publicProductId = res.body[1].id
          // console.log(res.body)

          done()
        }
      })
  })

  it('should edit a product successfully', done => {
    let newProduct = {
      name: 'contoh barang edit',
      file: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 13,
      price: '100123',
      category: 'guitar'
    }
    request(app)
      .patch(`/products/${publicProductId}`)
      .send(newProduct)
      .set('token', publicToken)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          //   console.log(res.body, 'ini setelah patch')
          expect(res.body[1].name).toBe('contoh barang edit')
          expect(res.body[1].price).toBe('100123')
          expect(res.body[1].stock).toBe(13)
          done()
        }
      })
  })

  it('should success to show one product', done => {
    request(app)
      .get(`/products/${publicProductId}`)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(res.body.name).toBe('contoh barang edit')
          expect(res.body.price).toBe('100123')
          expect(res.body.stock).toBe(13)
          done()
        }
      })
  })

  it('should success to delete one product', done => {
    request(app)
      .delete(`/products/${publicProductId}`)
      .set('token', publicToken)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          //   console.log(res.body, 'this is deleted')
          expect(res.body).toBe(1)
          done()
        }
      })
  })
})
