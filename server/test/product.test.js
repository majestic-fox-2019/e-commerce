const request = require('supertest')
const app = require('../app')
const token =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid
            XNlcm5hbWUiOiJtZW1iZXIiLCJyb2xlIjoibWVtYmVyIiwiZW1h
            aWwiOiJtZW1iZXIxQGdtYWlsLmNvbSIsImlhdCI6MTU4MTk1MDE
            xNn0.OKWmEU165_si7KA5McW6JxkOZhCbZsXg6i2tSd8z-4Q`

describe('Post /product/addProduct', () => {
  it('when all input meet the requirement, then the status must 201', async () => {
    let obj = {
      name: 'sabun',
      image_url: 'sabun.jpg',
      price: 5000,
      stock: 11
    }
    const res = await request(app)
      .post('/product/addProduct')
      .send(obj)
      .set({token})
    // console.log(res.body)
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toEqual(obj.name)
    expect(res.body.image_url).toEqual(obj.image_url)
    expect(res.body.price).toEqual(obj.price)
    expect(res.body.stock).toEqual(obj.stock)
  })
})

// describe('Post /product/addProduct', () => {
//   it('when name/price/stock is empty, then the status must 400', async () => {
//     let obj = {
//       name: 'sabun',
//       image_url: '',
//       price: 5000,
//       stock: 11
//     }
//     const res = await request(app)
//       .post('/product/addProduct')
//       .send(obj)
//     // console.log(res.body)
//     expect(res.statusCode).toBe(400)
//   })
// })

// describe('Post /product/addProduct', () => {
//   it('when price is below 1, then the status must 400', async () => {
//     let obj = {
//       name: 'sabun',
//       image_url: 'img.jpg',
//       price: 0,
//       stock: 11
//     }
//     const res = await request(app)
//       .post('/product/addProduct')
//       .send(obj)
//     // console.log(res.body)
//     expect(res.statusCode).toBe(400)
//   })
// })

// describe('Get /product/listProduct', () => {
//   it('should find all products', async () => {
//     const res = await request(app)
//       .get('/product/listProduct')
//     expect(res.statusCode).toBe(200)
//   })
// })

// describe('Post /product/deleteProduct', () => {
//   it('when product id is available and have authentication&authorization, then status must 200', async () => {
//     let id = 1
//     const res = await request(app)
//       .delete(`/product/deleteProduct/${id}`)
//       expect(res.statusCode).toBe(200)
//   })
// })

// describe('Post /product/deleteProduct', () => {
//   it('when product id is not available, then status must 400', async () => {
//     let id = 10000
//     const res = await request(app)
//       .delete(`/product/deleteProduct/${id}`)
//       console.log(res)
//       expect(res.statusCode).toBe(400)
//   })
// })

// describe('Post /product/deleteProduct', () => {
//   it('when dont have authentication, then status must 400', async () => {
//     let id = 1
//     const res = await request(app)
//       .delete(`/product/deleteProduct/${id}`)
//       expect(res.statusCode).toBe(400)
//   })
// })

// describe('Post /product/deleteProduct', () => {
//   it('when dont have authorization, then status must 403', async () => {
//     let id = 1
//     const res = await request(app)
//       .delete(`/product/deleteProduct/${id}`)
//       expect(res.statusCode).toBe(403)
//   })
// })

// describe('Post /product/updateProduct', () => {
//   it('when all input meet requirement, then status must 200', async () => {
//     let id = 1
//     let obj = {
//       name: 'sabun caer',
//       image_url: 'sabunzul.img',
//       price: 500,
//       stock: 11
//     }
//     const res = await request(app)
//     .put(`/product/updateProduct/${id}`)
//     .send(obj)
//       console.log(res)
//       expect(res.statusCode).toBe(200)
//   })
// })

// describe('Post /product/updateProduct', () => {
//   it('when product id not found, then status must 400', async () => {
//     let id = 10000
//     let obj = {
//       name: 'sabun caer',
//       image_url: 'sabunzul.img',
//       price: 500,
//       stock: 11
//     }
//     const res = await request(app)
//     .put(`/product/updateProduct/${id}`)
//     .send(obj)
//       console.log(res)
//       expect(res.statusCode).toBe(200)
//   })
// })

// describe('Post /product/updateProduct', () => {
//   it('when name/price/stock is empty, then status must 400', async () => {
//     let id = 10000
//     let obj = {
//       name: '',
//       image_url: 'sabunzul.img',
//       price: 500,
//       stock: 11
//     }
//     const res = await request(app)
//     .put(`/product/updateProduct/${id}`)
//     .send(obj)
//       console.log(res)
//       expect(res.statusCode).toBe(400)
//   })
// })

// describe('Post /product/updateProduct', () => {
//   it('when price is below 1, then status must 400', async () => {
//     let id = 10000
//     let obj = {
//       name: 'item',
//       image_url: 'sabunzul.img',
//       price: 0,
//       stock: 11
//     }
//     const res = await request(app)
//     .put(`/product/updateProduct/${id}`)
//     .send(obj)
//       console.log(res)
//       expect(res.statusCode).toBe(400)
//   })
// })

// describe('Post /product/updateProduct', () => {
//   it('when dont have authorization, then status must 403', async () => {
//     let id = 10000
//     let obj = {
//       name: 'item',
//       image_url: 'sabunzul.img',
//       price: 100,
//       stock: 11
//     }
//     const res = await request(app)
//     .put(`/product/updateProduct/${id}`)
//     .send(obj)
//       console.log(res)
//       expect(res.statusCode).toBe(403)
//   })
// })

// describe('Post /product/updateProduct', () => {
//   it('when dont have authentication, then status must 400', async () => {
//     let id = 10000
//     let obj = {
//       name: 'item',
//       image_url: 'sabunzul.img',
//       price: 100,
//       stock: 11
//     }
//     const res = await request(app)
//     .put(`/product/updateProduct/${id}`)
//     .send(obj)
//       console.log(res)
//       expect(res.statusCode).toBe(400)
//   })
// })