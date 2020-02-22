const request = require('supertest')
const app = require('../app')
let token = null

describe('User Endpoints', () => {
  
  //Create User
  it('Register new admin', (done) => {
    request(app)
      .post('/users/register')
      .send({
        name : 'Arona Nur Tetulis',
        email : 'arona.nur.tetulis@gmail.com',
        password : '123456',
        roles : 'admin'
      })
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Arona Nur Tetulis')
        expect(response.body.email).toBe('arona.nur.tetulis@gmail.com')
        expect(response.body.roles).toBe('admin')
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  //Register new user
  it('Register new user', (done) => {
    request(app)
      .post('/users/register')
      .send({
        name : 'Medina',
        email : 'medina@gmail.com',
        password : '123456',
        roles : 'user'
      })
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Medina')
        expect(response.body.email).toBe('medina@gmail.com')
        expect(response.body.roles).toBe('user')
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  // //Register Validation error
  it('Validation error', (done) => {
    request(app)
      .post('/users/register')
      .send({
        name : 'Arona Nur Tetulis',
        email : 'arona.nur.tetulis@gmail.com',
        password : '123456',
        roles : ''
      })
      .expect(400)
      .then(response => {
        expect(response.body).toEqual({ roles: 'Roles is required' })
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  //Login admin success
  it('Login as admin success', (done) => {
    request(app)
      .post('/users/admin/login')
      .send({
        email : 'arona.nur.tetulis@gmail.com',
        password : '123456',
      })
      .expect(200)
      .then(response => {
        token = response.body.token
        expect(response.body.email).toBe('arona.nur.tetulis@gmail.com')
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  //Login as admin fail because roles is user
  it('Login as admin fail because roles is user', (done) => {
    request(app)
      .post('/users/admin/login')
      .send({
        email : 'medina@gmail.com',
        password : '123456',
      })
      .expect(404)
      .then(response => {
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  //Login as admin fail because user not found
  it('Login as admin fail because email doesnt exist', (done) => {
    request(app)
      .post('/users/admin/login')
      .send({
        email : '',
        password : '123456',
      })
      .expect(404)
      .then(response => {
        expect(response.text).toBe("\"Email doesn't exist!\"")
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Login as admin fail because password is wrong', (done) => {
    request(app)
      .post('/users/admin/login')
      .send({
        email : 'arona.nur.tetulis@gmail.com',
        password : '1234',
      })
      .expect(404)
      .then(response => {
        expect(response.body).toBe('Wrong email or password!')
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Get user data by id', (done) => {
    request(app)
      .get('/users/detail/1')
      .set('token', token)
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Arona Nur Tetulis')
        expect(response.body.email).toBe('arona.nur.tetulis@gmail.com')
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Get user data not found', (done) => {
    request(app)
      .get('/users/detail/3')
      .set('token', token)
      .expect(404)
      .then(response => {
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Get user data admin only', (done) => {
    request(app)
      .get('/users/admin')
      .set('token', token)
      .expect(200)
      .then(response => {
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Update user data by id admin only', (done) => {
    request(app)
      .put('/users/admin/1')
      .set('token', token)
      .send({
        name : 'Arona Nur Tatula',
        email : 'arona.nur.tetulis@gmail.com',
      })
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Arona Nur Tatula')
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Update user data validation error', (done) => {
    request(app)
      .put('/users/admin/1')
      .set('token', token)
      .send({
        name : '',
        email : 'arona.nur.tetulis@gmail.com',
      })
      .expect(400)
      .then(response => {
        expect(response.body).toEqual({ name: 'Name is required!' })
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Delete user by id admin only', (done) => {
    request(app)
      .delete('/users/admin/2')
      .set('token', token)
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Medina')
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Delete user not found', (done) => {
    request(app)
      .delete('/users/admin/3')
      .set('token', token)
      .expect(404)
      .then(response => {
        done()
      })
      .catch(err => {
        return done(err)
      })
  })
})

describe('Products Endpoints', () => {

  it('Get all products', (done) => {
    request(app)
      .get('/products')
      .set('token', token)
      .expect(200)
      .then(response => {
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Create new products', (done) => {
    request(app)
      .post('/products/admin')
      .set('token', token)
      .send({
        name : 'Hp xiaomi',
        image_url : 'https://image.com/contoh.png',
        price : 100000,
        stock : 10,
        CategoryId : 1,
        description : 'Hp xiaomi keluaran terbaru',
        status_product : 'published'
      })
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Hp xiaomi')
        expect(response.body.image_url).toBe('https://image.com/contoh.png')
        expect(response.body.price).toBe(100000)
        expect(response.body.stock).toBe(10)
        expect(response.body.CategoryId).toBe(1)
        expect(response.body.description).toBe('Hp xiaomi keluaran terbaru')
        expect(response.body.status_product).toBe('published')
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Create new products fail because price and stock not numeric', (done) => {
    request(app)
      .post('/products/admin')
      .set('token', token)
      .send({
        name : 'Hp xiaomi',
        image_url : 'https://image.com/contoh.png',
        price : 'haha',
        stock : 'haha',
        CategoryId : 1,
        description : 'Hp xiaomi keluaran terbaru',
        status_product : 'published'
      })
      .expect(400)
      .then(response => {
        expect(response.text).toBe("{\"price\":\"Price must be a number!\",\"stock\":\"Stock must be a number!\"}")
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Create new products fail because name is empty', (done) => {
    request(app)
      .post('/products/admin')
      .set('token', token)
      .send({
        name : '',
        image_url : 'https://image.com/contoh.png',
        price : 10000,
        stock : 1,
        CategoryId : 1,
        description : 'Hp xiaomi keluaran terbaru',
        status_product : 'published'
      })
      .expect(400)
      .then(response => {
        expect(response.text).toBe("{\"name\":\"Product name is required!\"}")
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Patch status products', (done) => {
    request(app)
      .patch('/products/admin/1')
      .set('token', token)
      .expect(200)
      .then(response => {
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Patch status products fail because products not found', (done) => {
    request(app)
      .patch('/products/admin/2')
      .set('token', token)
      .expect(404)
      .then(response => {
        expect(response.text).toBe("{\"error\":\"Product doesn't exist!\"}")
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Update product success', (done) => {
    request(app)
      .put('/products/admin/1')
      .set('token', token)
      .send({
        name : 'Hp xiaomi update',
        image_url : 'https://image.com/contoh.png',
        price : 100000,
        stock : 10,
        CategoryId : 1,
        description : 'Hp xiaomi keluaran terbaru update',
      })
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Hp xiaomi update')
        expect(response.body.image_url).toBe('https://image.com/contoh.png')
        expect(response.body.price).toBe(100000)
        expect(response.body.stock).toBe(10)
        expect(response.body.CategoryId).toBe(1)
        expect(response.body.description).toBe('Hp xiaomi keluaran terbaru update')
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Update products fail because price and stock not numeric', (done) => {
    request(app)
      .put('/products/admin/1')
      .set('token', token)
      .send({
        name : 'Hp xiaomi',
        image_url : 'https://image.com/contoh.png',
        price : 'haha',
        stock : 'haha',
        CategoryId : 1,
        description : 'Hp xiaomi keluaran terbaru',
        status_product : 'published'
      })
      .expect(400)
      .then(response => {
        expect(response.text).toBe("{\"price\":\"Price must be a number!\",\"stock\":\"Stock must be a number!\"}")
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Update products fail because name is empty', (done) => {
    request(app)
      .put('/products/admin/1')
      .set('token', token)
      .send({
        name : '',
        image_url : 'https://image.com/contoh.png',
        price : 10000,
        stock : 1,
        CategoryId : 1,
        description : 'Hp xiaomi keluaran terbaru',
        status_product : 'published'
      })
      .expect(400)
      .then(response => {
        expect(response.text).toBe("{\"name\":\"Product name is required!\"}")
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Get products by id', (done) => {
    request(app)
      .get('/products/detail/1')
      .set('token', token)
      .expect(200)
      .then(response => {
        console.log(response.body)
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Get product by id fails because product not found', (done) => {
    request(app)
      .get('/products/detail/2')
      .set('token', token)
      .expect(404)
      .then(response => {
        expect(response.text).toBe("{\"error\":\"Product doesn't exist!\"}")
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Delete product', (done) => {
    request(app)
      .delete('/products/admin/1')
      .set('token', token)
      .expect(200)
      .then(response => {
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

  it('delete products fail because product not found', (done) => {
    request(app)
      .delete('/products/admin/2')
      .set('token', token)
      .expect(404)
      .then(response => {
        expect(response.text).toBe("{\"error\":\"Product doesn't exist!\"}")
        done();
      })
      .catch(err => {
        return done(err)
      })
  })

})