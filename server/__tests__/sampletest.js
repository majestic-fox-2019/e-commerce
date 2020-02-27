'use strict'

const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
let token = '';

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

    token = JSON.parse(res.text).token
    expect(res.status).toEqual(200);
  });

  it('User /POST if wrong email or password', async()=>{
    const user={
      email : "wrong@gmail.com",
      password: "test"
    }

    const res = await request
      .post('/login')
      .send(user)
    
    expect(res.status).toEqual(404);
    expect(JSON.parse(res.text).message).toBe("email not found")

  });

})
describe('product endpoints',()=>{
  it('product /GET get all data',async()=>{
    const res = await request
      .get('/product')
      .set('token', token)
      
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
      .set('token', token)

      expect(res.status).toEqual(201)
      expect(res.body).toHaveProperty('name')
  })

  it('product /POST with empty value',async()=>{
    const product={
       price: 2000000,
       stock : 10,
       imageurl: "aaaa"

    }

    const res = await request
     .post('/product')
     .send(product)
     .set('token', token)

     expect(res.status).toEqual(400)
     expect(res.body).toHaveProperty('message')
 })

  it('product /GET get single data',async()=>{
    const postId =1
    const res = await request
    .get(`/product/${postId}`)
    .set('token', token)
      expect(res.statusCode).toEqual(200);

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
      .set('token', token)
      .send(edit)

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name');
  })

  it('product /PUT edit with empty value',async()=>{
    const edit={
        name : "",
        price: 2000000,
        stock : 10,
        imageurl: "aaaa"
    }
     const res = await request
      .put(`/product/1`)
      .set('token', token)
      .send(edit)

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
  })

  it('product /DELETE delete single data',async()=>{
    const deletId=1
     const res = await request
      .delete(`/product/${deletId}`)
      .set('token', token)

      expect(res.statusCode).toEqual(200);
      // expect(res.body).toHaveProperty('post');
  })
 
  // without token
  it('product /GET get all data without token',async()=>{
    const res = await request
      .get('/product')
      
    expect(res.status).toEqual(403)

  })

  it('product /POST post new data without token',async()=>{
     const product={
        name : "Grinder",
        price: 2000000,
        stock : 10,
        imageurl: "aaaa"

     }

     const res = await request
      .post('/product')
      .send(product)
    

      expect(res.status).toEqual(403)
  })


  it('product /GET get single data without token',async()=>{
    const postId =1
    const res = await request
    .get(`/product/${postId}`)

      expect(res.statusCode).toEqual(403);

  })
 
  it('product /PUT edit single data without token',async()=>{
    const edit={
        name : "Grinderss",
        price: 2000000,
        stock : 10,
        imageurl: "aaaa"
    }
     const res = await request
      .put(`/product/1`)
      .send(edit)

      expect(res.statusCode).toEqual(403);
  })

  it('product /PUT edit with empty value without token',async()=>{
    const edit={
        name : "",
        price: 2000000,
        stock : 10,
        imageurl: "aaaa"
    }
     const res = await request
      .put(`/product/1`)
      .send(edit)

      expect(res.statusCode).toEqual(403);
  })

  it('product /DELETE delete single data without token',async()=>{
    const deletId=1
     const res = await request
      .delete(`/product/${deletId}`)

      expect(res.statusCode).toEqual(403);
  })

})

console.log(token)
