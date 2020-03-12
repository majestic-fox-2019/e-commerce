"use strict"

const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require("../app")
const { sequelize, User } = require("../models")
const { queryInterface } = sequelize

let valid_token = null
let invalid_token = null

afterAll(done => {
    queryInterface
    .bulkDelete('Users', {})
    .then(() => done())
    .catch(err => done(err))
})

beforeAll(done => {
    User.create({
        fullName: 'bonie',
        email: 'bonie@gmail.com',
        password: 'asd123',
        role: 'admin'
    })
    .then(response => {
        valid_token = jwt.sign({
            id : response.id,
            role : response.role
        }, process.env.JWT_KEY)
        return User.create({
            fullName: 'romy',
            email: 'romi@gmail.com',
            password: 'asd123',
            role: 'user'
        })
    })
    .then(response => {
        invalid_token = jwt.sign({
            id : response.id,
            role : response.role
        }, process.env.JWT_KEY)
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('Post Endpoint', () => {
    it('should create a new product', function (done) {
        
        const obj = {
            name: "t shirt",
            image_url: '../',
            price: 200000,
            stock: 12,
            size: 1,
            category: 1
        }

        request(app)
        .post('/products/')
        .set('Authorization', `bearer ${valid_token}`)
        .send(obj)
        .expect(201)
        .end( (err, res) => {
            if(err){
                done(err)
            }
            expect(res.body).toHaveProperty("name")
            expect(res.body).toHaveProperty("image_url")
            expect(res.body).toHaveProperty("price")
            expect(res.body).toHaveProperty("SizeId")
            expect(res.body).toHaveProperty("stock")
            expect(res.body).toHaveProperty("CategoryId")
            done()
        })
    })

    it('should fail create product', (done) => {
        
        const obj = {
            name: null,
            image_url: null,
            price: null,
            stock: null,
            SizeId: null,
            CategoryId: null
        }

        request(app)
        .post('/products')
        .set('Authorization', `bearer ${valid_token}` )
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
            stock: 0,
            SizeId: 2,
            CategoryId: 1
        }

        request(app)
        .post('/products')
        .set('Authorization', `bearer ${valid_token}` )
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
       .set('Authorization', `bearer ${valid_token}` )
       .expect(200)
       .end( (err, res) => {
           if(err){
               done(err)
           }
           expect(res.body[0]).toHaveProperty("name")
           expect(res.body[0]).toHaveProperty("image_url")
           expect(res.body[0]).toHaveProperty("price")
           expect(res.body[0]).toHaveProperty("stock")
           expect(res.body[0]).toHaveProperty("size")
           expect(res.body[0]).toHaveProperty("category")
           done()
       })
   })
   
   it('should get one product', function(done) {
       request(app)
       .get('/products/1')
       .set('Authorization', `bearer ${valid_token}` )
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
       .set('Authorization', `bearer ${valid_token}` )
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
        .set('Authorization', `bearer ${valid_token}` )
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
        .set('Authorization', `bearer ${valid_token}` )
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