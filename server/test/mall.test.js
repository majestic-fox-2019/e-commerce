const request = require('supertest')
const app = require('../app.js')
let publicToken = null
let publicMallProductId = null

describe('Login Register', () => {
  it('should create a new post', done => {
    let userRegister = {
      name: 'samuel zega',
      email: 'samuel1@mail.com',
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
      email: 'samuel1@mail.com',
      password: 'password'
    }
    request(app)
      .post('/users/login')
      .send(userLogin)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body.email).toBe('samuel1@mail.com')
          publicToken = res.body.token
          done()
        }
      })
  })
})

describe('Admin Activity', () => {
  it('should create a mall product successfully', done => {
    let newProduct = {
      name: 'contoh barang',
      imageUrl: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 12,
      price: '2000000',
      category: 'drum'
    }
    request(app)
      .post('/malls')
      .set('token', publicToken)
      .send(newProduct)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body.name).toBe('contoh barang')
          expect(res.body.imageUrl).toBe(
            'https://hytsit.com/assets/frontend/images/noproduct.png'
          )
          expect(res.body.stock).toBe(12)
          expect(res.body.price).toBe('2000000')
          done()
        }
      })
  })

  it('should create a mall product successfully', done => {
    let newProduct = {
      name: 'contoh barang',
      imageUrl: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 12,
      price: '2000000',
      category: 'keyboard'
    }
    request(app)
      .post('/malls')
      .set('token', publicToken)
      .send(newProduct)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(res.body.name).toBe('contoh barang')
          expect(res.body.imageUrl).toBe(
            'https://hytsit.com/assets/frontend/images/noproduct.png'
          )
          expect(res.body.stock).toBe(12)
          expect(res.body.price).toBe('2000000')
          done()
        }
      })
  })

  it('should show all product', done => {
    request(app)
      .get('/malls')
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(res.body.length).toBe(2)
          //   console.log(res.body.length, 'ini adalah length nya')
          publicMallProductId = res.body[1].id
          done()
        }
      })
  })

  it('should edit a product successfully', done => {
    let newProduct = {
      name: 'contoh barang edit',
      imageUrl: 'https://hytsit.com/assets/frontend/images/noproduct.png',
      stock: 13,
      price: '100123',
      category: 'guitar'
    }
    request(app)
      .patch(`/malls/${publicMallProductId}`)
      .send(newProduct)
      .set('token', publicToken)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          //   console.log(res.body, 'ini setelah patch')
          expect(res.body[1].name).toBe('contoh barang edit')
          expect(res.body[1].imageUrl).toBe(
            'https://hytsit.com/assets/frontend/images/noproduct.png'
          )
          expect(res.body[1].price).toBe('100123')
          expect(res.body[1].stock).toBe(13)
          done()
        }
      })
  })

  it('should success to show one product', done => {
    request(app)
      .get(`/malls/${publicMallProductId}`)
      .end((err, res) => {
        if (err) {
          done(err.body)
        } else {
          expect(res.body.name).toBe('contoh barang edit')
          expect(res.body.imageUrl).toBe(
            'https://hytsit.com/assets/frontend/images/noproduct.png'
          )
          expect(res.body.price).toBe('100123')
          expect(res.body.stock).toBe(13)
          done()
        }
      })
  })

  it('should success to delete one product', done => {
    request(app)
      .delete(`/malls/${publicMallProductId}`)
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
