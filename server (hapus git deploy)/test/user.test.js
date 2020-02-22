const request = require('supertest')
const app = require('../app')

describe('Post /user/register', () => {
  it('when all input requirements, then the status must 201', async () => {
    let obj = {
      username: 'member',
      password: '12345678',
      email: 'member1@gmail.com',
    }
    const res = await request(app)
      .post('/user/register')
      .send(obj)
    expect(res.statusCode).toBe(201)
    expect(res.body.username).toEqual(obj.username)
    expect(res.body.email).toEqual(obj.email)
  })
})

// describe('Post /user/register', () => {
//   it('when one of input is empty, then the status must 400', async () => {
//     let obj = {
//       username: '',
//       password: '12345678',
//       email: 'member1@gmail.com',
//     }
//     const res = await request(app)
//       .post('/user/register')
//       .send(obj)
//     expect(res.statusCode).toBe(400)
//   })
// })

// describe('Post /user/register', () => {
//   it('when not using email format, then the status must 400', async () => {
//     let obj = {
//       username: 'ada',
//       password: '12345678',
//       email: 'member1gmail.com',
//     }
//     const res = await request(app)
//       .post('/user/register')
//       .send(obj)
//     expect(res.statusCode).toBe(400)
//   })
// })

// describe('Post /user/register', () => {
//   it('when password length is below 8, then the status must 400', async () => {
//     let obj = {
//       username: 'ada',
//       password: '123',
//       email: 'member1gmail.com',
//     }
//     const res = await request(app)
//       .post('/user/register')
//       .send(obj)
//     expect(res.statusCode).toBe(400)
//   })
// })

describe('Post /user/login', () => {
  it('when email and password match to database, then the status must 200', async () => {
    let obj = {
      password: '12345678',
      email: 'member1@gmail.com',
    }
    const res = await request(app)
      .post('/user/login')
      .send(obj)
      console.log(res.body)
    expect(res.statusCode).toBe(200)
  })
})

describe('Post /user/login', () => {
  it('when email or password not match to database, then the status must 400', async () => {
    let obj = {
      password: '128',
      email: 'member1@gmail.com',
    }
    const res = await request(app)
      .post('/user/login')
      .send(obj)
    expect(res.statusCode).toBe(400)
  })
})

// describe('Get /user/listUser', () => {
//   it('should find all users, then the status must 200', async () => {
//     const res = await request(app)
//       .get('/user/listUser')
//     expect(res.statusCode).toBe(200)
//   })
// })
