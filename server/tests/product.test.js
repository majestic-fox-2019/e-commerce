"use strict"

const request = require('supertest')
const app = require("../app")


describe('Post Endpoint', () => {
    it('should create a new product', function (done) {
        
        const obj = {
            name: "t shirt",
            image_url: '../',
            price: 200000,
            size: 1,
            stock: 12
        }

        request(app)
        .post('/products/')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgyODU3ODE5fQ.vdCCV-ZB7D-kVlu4GCl29KHOLurQZ-cCo3Bl3izzMYI')
        .send(obj)
        .expect(201)
        .end( (err, res) => {
            if(err){
                done(err)
            }
            expect(res.body).toHaveProperty("name")
            expect(res.body).toHaveProperty("image_url")
            expect(res.body).toHaveProperty("price")
            expect(res,body.size).toBe("S")
            expect(res.body).toHaveProperty("stock")
            done()
        })
    })

    it('should fail create product', (done) => {
        
        const obj = {
            name: null,
            image_url: null,
            price: null,
            stock: null
        }

        request(app)
        .post('/products')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgyODU3ODE5fQ.vdCCV-ZB7D-kVlu4GCl29KHOLurQZ-cCo3Bl3izzMYI')
        .send(obj)
        .expect(400)
        .end( (err, res) => {
            if(err){
                done(err)
            }
            expect(res.body.message).toEqual("name is require, image is require, price is require, stock is require")
            done()
        })
    })

    it('should fail create product', (done) => {
        const obj = {
            name: "t shirt",
            image_url: '../',
            price: 2,
            stock: 0
        }

        request(app)
        .post('/products')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgyODU3ODE5fQ.vdCCV-ZB7D-kVlu4GCl29KHOLurQZ-cCo3Bl3izzMYI')
        .send(obj)
        .expect(400)
        .end( (err, res) => {
            if(err){
                done(err)
            }
            expect(res.body.message).toEqual("price must be more than 10000, stock must be more than 0")
            done()
        })
    })
})

describe('Get endpoint', function() {
   beforeEach(() => {
       jest.setTimeout(50000);
   })
   it('should get all product', function(done) {
       request(app)
       .get('/products')
       .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgyODU3ODE5fQ.vdCCV-ZB7D-kVlu4GCl29KHOLurQZ-cCo3Bl3izzMYI')
       .expect(200)
       .end( (err, res) => {
           if(err){
               done(err)
           }
           expect(res.body[0]).toHaveProperty("name")
           expect(res.body[0]).toHaveProperty("image_url")
           expect(res.body[0]).toHaveProperty("price")
           expect(res.body[0]).toHaveProperty("stock")
           done()
       })
   })
   
   it('should get one product', function(done) {
       request(app)
       .get('/products/1')
       .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgyODU3ODE5fQ.vdCCV-ZB7D-kVlu4GCl29KHOLurQZ-cCo3Bl3izzMYI')
       .expect(200)
       .end( (err, res) => {
           if(err){
               done(err)
           }
           expect(res.body).toHaveProperty("name")
           done()
       })
   })
   
   it('shoult get error find one product', function(done){
       request(app)
       .get('/products/2')
       .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgyODU3ODE5fQ.vdCCV-ZB7D-kVlu4GCl29KHOLurQZ-cCo3Bl3izzMYI')
       .expect(404)
       .end( (err, res) => {
           if(err){
               done(err)
           }
           expect(res.body.message).toEqual("item not found")
           done()
       })
   })
})

describe('put endpoint', function(){
    it('should update selected product', function(done) {
        const obj = {
            name: "t shirt",
            image: "http://tshirt.com",
            price: 200000,
            stock: 11
        }

        const fd = new FormData

        fd.append('name', obj.name)
        fd.append('image_url', obj.image_url)
        fd.append('price', obj.price)
        fd.append('stock', obj.stock)

        request(app)
        .put('/products/1')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgyODU3ODE5fQ.vdCCV-ZB7D-kVlu4GCl29KHOLurQZ-cCo3Bl3izzMYI')
        .send(obj)
        .expect(200)
        .end( (err, res) => {
            if(err){
                done(err)
            }
            expect(res.body).toHaveProperty("name")
            expect(res.body.stock).toEqual(11)
            done()
        })
    })
    it('should update selected product', function(done) {
        const obj = {
            name: "t shirt",
            image_url: '../',
            price: 200000,
            stock: 11
        }

        const fd = new FormData

        fd.append('name', obj.name)
        fd.append('image_url', obj.image_url)
        fd.append('price', obj.price)
        fd.append('stock', obj.stock)

        request(app)
        .put('/products/1')
        .send(obj)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgyODU3ODE5fQ.vdCCV-ZB7D-kVlu4GCl29KHOLurQZ-cCo3Bl3izzMYI')
        .expect(200)
        .end( (err, res) => {
            if(err){
                done(err)
            }
            expect(res.body).toHaveProperty("name")
            expect(res.body.stock).toEqual(11)
            done()
        })
    })
})