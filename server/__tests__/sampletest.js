'use strict'

const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

describe('User endpoints',()=>{
  it('User /POST should return an instruction to register', async()=>{
    const user={
      name : "test Name",
      email : "test@gmail.com",
      password: "test"
    }

    const res = await request
      .post('/register')
      .send(user)

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('name')
  });

  it('User /POST should return an instruction to login', async()=>{
    const user={
      email : "test@gmail.com",
      password: "test"
    }

    const res = await request
      .post('/login')
      .send(user)

    expect(res.status).toEqual(200);
  });


})

describe('product endpoints',()=>{
  it('product /GET get all data',async()=>{
    const res = await request
      .get('/product')
      
    expect(res.status).toEqual(204)
  })

  it('product /POST post new data',async()=>{
     const product={
        name : "Grinder",
        price: 2000000,
        stock : 10,
        imageurl: "aaaa"

     }

     const res = await request
      .post('/product')
      .send(product)

      expect(res.status).toEqual(201)
      expect(res.body).toHaveProperty('name')
  })

  it('product /GET get single data',async()=>{
    const postId =1
    const res = await request
      .get(`/product/${postId}`)

      expect(res.statusCode).toEqual(200);
      // expect(res.body).toHaveProperty('post');
  })

  it('product /PUT edit single data',async()=>{
    const edit={
        name : "Grinderss",
        price: 2000000,
        stock : 10,
        imageurl: "aaaa"
    }
     const res = await request
      .put(`/product/1`)
      .send(edit)

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name');
  })

  it('product /DELETE delete single data',async()=>{
    const deletId=1
     const res = await request
      .delete(`/product/${deletId}`)

      expect(res.statusCode).toEqual(200);
      // expect(res.body).toHaveProperty('post');
  })
 
})

