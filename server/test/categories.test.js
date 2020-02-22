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
        console.log(res.body, '< success post categories')
        expect(res.body.name).toEqual(categories.name)
        done()
      })
      .catch(err => {
        console.log(err)
        return done(err)
      })
  })
})

// // negatif input for price and stock
// describe('POST /categoriess', () => {
//   it('negatif input for price and stock', (done) => {
//     let categories = {
//       name: 'key chain',
//       image: 'http://url',
//       price: -30000,
//       stock: -23
//     }
//     request(app)
//       .post('/categoriess')
//       .send(categories)
//       .then(res => {
//         expect(res.body.statusCode).not.toEqual(201)
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })

// // missing input
// describe('POST /categoriess', () => {
//   it('should not create new categories', (done) => {
//     let categories = {
//       name: 'key chain',
//       stock: 23
//     }
//     request(app)
//       .post('/categoriess')
//       .send(categories)
//       .then(res => {
//         expect(res.body.statusCode).not.toEqual(201)
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })

// // show all categoriess
// describe('GET /categoriess', () => {
//   it('responds with json', (done) => {
//     request(app)
//       .get('/categoriess')
//       .expect(200)
//       .then(res => {
//         console.log(res.body, '< res.body get categoriess')
//         expect(res.body[0]).toHaveProperty('name')
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// // show all categoriess
// describe('GET /categories', () => {
//   it('responds with json', (done) => {
//     request(app)
//       .get('/categories')
//       .then(res => {
//         console.log(res, '< ini res')
//         expect(res.body.statusCode).not.toEqual(201)
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// // show categories by id
// describe('GET /categories/:id', () => {
//   it('get one categories', (done) => {
//     request(app)
//       .get('/categoriess/1')
//       .expect(200)
//       .then(res => {
//         console.log(res.body, '< get one categories')
//         expect(res.body).toHaveProperty('name')
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// // get undefined id
// describe('GET /categories/:id', () => {
//   it('get undefined id', (done) => {
//     request(app)
//       .get('/categoriess/0')
//       .expect(200)
//       .then(res => {
//         console.log(res.body, '< get one categories')
//         expect(res.body).toEqual(null)
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// // update categories
// describe('PUT /categoriess', () => {
//   it('should update categories', (done) => {
//     let categories = {
//       name: 'key-chains',
//       image: 'http://url',
//       price: 10000,
//       stock: 50
//     }
//     request(app)
//       .put('/categoriess/1')
//       .send(categories)
//       .expect(200)
//       .then(res => {
//         console.log(res.body, '< success update categoriess')
//         expect(res.body[0]).toEqual(1)
//         expect(res.body[1][0]).toHaveProperty('name')
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//         return done(err)
//       })
//   })
// })


// delete categories
// describe('DELETE /categoriess', () => {
//   it('should delete categories', (done) => {
//     request(app)
//       .delete('/categoriess/1')
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