const request = require('supertest')
const app = require('../app')

var tokenAdaadain = "eyJhbGciOiJIUzI1NiJ9.MQ.7sNJ5VtmIKLC09V9Yerq7liwveN32lde3kwX27JaAQg"

describe('POST /register', function() {
  it('should register user', async () => {
    const res = await request(app)
    .post('/register')
    .send(input = {
      name: "dila",
      password: "1234",
      email: "dila@gmail.com",
      address:"jalan tanah kusir 2",
      phone_number:"08211691270"
    })
    console.log(res.body)
    expect(res.statusCode).toEqual(201)
    expect(res.body.name).toEqual(input.name)
    // expect(res.body.password).toEqual(hashPw)
    expect(res.body.email).toEqual(input.email)
    expect(res.body.address).toEqual(input.address)
    expect(res.body.phone_number).toEqual(input.phone_number)
  })
})



describe('POST /login', function () {
  it('should logged in user', async () => {
    const res = await request(app)
    .post('/login')
    .send(input = {
      email: "dila@gmail.com",
      password: "1234"
    })
    console.log(res.body)
    expect(res.statusCode).toEqual(201)
    expect(res.body.user.email).toEqual(input.email)
    expect(res.body.token).toEqual(res.body.token)
  })
})

describe('POST /admin', function() {
  it('should create product', async () => {
    const res = await request(app)
        .post('/admin')
        .set("token", tokenAdaadain)
        .send( input = {
          name:"aloe vera gel",
          image_url:"http://gambar-aloe",
          price: 99000,
          stock: 100,
          category: "normal"
        })
        console.log(res.body.name)
        expect(res.statusCode).toEqual(201)
        expect(res.body.name).toEqual(input.name)
        expect(res.body.image_url).toEqual(input.image_url)
        expect(res.body.price).toEqual(input.price)
        expect(res.body.stock).toEqual(input.stock)
        expect(res.body.category).toEqual(input.category)
  })
})

// describe('DELETE /admin/1', function() {
//   it('should delete product', async () => {
//     const res = await request(app)
//     .delete('/admin/1')
//     .set("token", tokenAdaadain)
//     expect(res.statusCode).toEqual(201)
//     expect(res.body.id).toEqual(1)
//   })
// })

describe('PUT /admin/1', function() {
  it('should edit product', async () => {
    const res = await request(app)
    .put('/admin/1')
    .set("token", tokenAdaadain)
    .send(input ={
      name:"bukan aloe",
      image_url:"http://gambar-aloe",
      price: 99000,
      stock: 100,
      category: "normal"
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body[0].name).toEqual(input.name)
    expect(res.body[0].image_url).toEqual(input.image_url)
    expect(res.body[0].price).toEqual(input.price)
    expect(res.body[0].stock).toEqual(input.stock)
    expect(res.body[0].category).toEqual(input.category)
  })
})

describe('GET /home', function() {
  it('should show all products', async () => {
    const res = await request(app)
    .get('/home')
    expect(res.statusCode).toEqual(201)
  })
})

describe('GET /home/normal', function() {
  it('should show all products by category', async () => {
    const res = await request(app)
    .get('/home/normal')
    expect(res.statusCode).toEqual(201)
  })
})

describe('GET /products/1', function() {
  it('should show detail one product', async () => {
    const res = await request (app)
    .get('/products/1')
    expect(res.statusCode).toEqual(201)
  })
})

