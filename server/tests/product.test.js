"use strict"

const request = require('supertest')
const app = require("../app")


describe('Post Endpoint', () => {
    it('should create a new product', function (done) {
        const obj = {
            name: "t shirt",
            image: "http://tshirt.com",
            price: 200000,
            stock: 12
        }
        request(app)
        .post('/products/')
        .send(obj)
        .expect(201)
        .end( (err, res) => {
            if(err){
                done(err)
            }
            expect(res.body).toHaveProperty("name")
            expect(res.body).toHaveProperty("image_url")
            expect(res.body).toHaveProperty("price")
            expect(res.body).toHaveProperty("stock")
            done()
        })
    })

    it('should fail create product', (done) => {
        const obj = {
            name: null,
            image: null,
            price: null,
            stock: null
        }
        request(app)
        .post('/products')
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
            name: "t-shirt",
            image: "image",
            price: 10,
            stock: 0
        }
        request(app)
        .post('/products')
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
        request(app)
        .put('/products/1')
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
            image: "http://tshirt.com",
            price: 200000,
            stock: 11
        }
        request(app)
        .put('/products/2')
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
})