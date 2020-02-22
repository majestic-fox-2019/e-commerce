const app = require('../app')
const request = require('supertest');
const jwt = require('jsonwebtoken')

const token = jwt.sign({ email: 'user@gmail.com', role: 'admin' }, 'process.env.JWT_TOKEN')

// create new categories
describe('POST /categories', () => {
  it('should create new categories', (done) => {
    let categories = {
      name: 'Face',
    }
    request(app)
      .post('/categories')
      .send(categories)
      .set('token', token)
      .expect(201)
      .then(res => {
        expect(res.body.name).toEqual(categories.name)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

// missing input
describe('POST /categories', () => {
  it('should not create new categories', (done) => {
    let categories = {
      name: null
    }
    request(app)
      .post('/categories')
      .send(categories)
      .set('token', token)
      .then(res => {
        expect(res.statusCode).toBe(400)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

// show all categoriess
describe('GET /categories', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/categories')
      .set('token', token)
      .expect(200)
      .then(res => {
        console.log(res.body, '< res.body get categoriess')
        expect(res.body[0]).toHaveProperty('name')
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// show all categoriess
describe('GET /categories', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/categoriess')
      .set('token', token)
      .then(res => {
        expect(res.statusCode).toEqual(404)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// show categories by id
describe('GET /categories/:id', () => {
  it('get one categories', (done) => {
    request(app)
      .get('/categories/1')
      .set('token', token)
      .expect(200)
      .then(res => {
        console.log(res.body, '< get one categories')
        expect(res.body).toHaveProperty('name')
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// get undefined id
describe('GET /categories/:id', () => {
  it('get undefined id', (done) => {
    request(app)
      .get('/categories/0')
      .set('token', token)
      .expect(200)
      .then(res => {
        console.log(res.body, '< get one categories')
        expect(res.body).toEqual(null)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// update categories
describe('PUT /categories', () => {
  it('should update categories', (done) => {
    let categories = {
      name: 'Face',
    }
    request(app)
      .put('/categories/1')
      .send(categories)
      .set('token', token)
      .expect(200)
      .then(res => {
        console.log(res.body, '< success update categories')
        expect(res.body).toHaveProperty('name')
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})


// // delete categories
// describe('DELETE /categories', () => {
//   it('should delete categories', (done) => {
//     request(app)
//       .delete('/categories/1')
//       .set('token', token)
//       .expect(200)
//       .then(res => {
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })