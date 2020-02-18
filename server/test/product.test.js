const app = require('../app')
const request = require('supertest')
const {Product} = require('../models')
const jwt = require('jsonwebtoken')

let users={id:1,email:"masuk@mail.com"}
let token = jwt.sign(users,"ini rahasia")

describe('Post Endpoints', () => {
    it('should create a new product', function (done) {
        let isi = { name:"baju",
        image_url:"ini.com",
        price:200000,
    stock:10}  
        request(app)
        .post('/products')
        .set('token',token)
        .send(
            isi
        )
        .then(res=>{
            expect(res.statusCode).toEqual(201)
            expect(res.body.name).toEqual(isi.name)
            expect(res.body.price).toEqual(isi.price)
            expect(res.body.stock).toBe(isi.stock)
            done()
        })
      
    })
  })

describe('POST (error) Endpoints',()=>{
    it('should not create a new data',function(done){
        let isi = { name:"baju",
        image_url:"ini.com"} 
        request(app)
        .post('/products')
        .send(isi)
        .then(res=>{
            expect(res.statusCode).not.toEqual(201)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
})


describe('Get All data products', ()=>{
    it('should show list data of products',function(done){
        request(app)
        .get('/products')
        .set('token',token)
        .expect(200)
        .then(res=>{
            expect(res.body[0]).toHaveProperty('name')
            done()
        })
        .catch(err=>{
            return done(err)
        })
    })
})

describe('Update a product',()=>{
    it('Should Update a product',function(done){
        let updateProduct = {name:"baju",
        image_url:"ini.com",
        price:200000,
        stock:25}
        request(app)
        .put('/products/1')
        .set('token',token)
        .send(updateProduct)
        .expect(200)
        .then(res=>{
            // console.log(res.body)
            done()
        })
        .catch(err=>{
            return done(err)
        })
    })
})

describe('Delete a product',function(){
    it('Should not delete a product',function(done){
        request(app)
        .delete('/products/1')
        .set('token',token)
        .then(res=>{
            expect(res.statusCode).not.toEqual(200)
            done()
        })
        .catch(err=>{
            return done(err)
        })
    })
})

describe('Delete a product',function(){
    it('Should delete a product',function(done){
        request(app)
        .delete('/products/1')
        .then(res=>{
            done()
        })
        .catch(err=>{
            return done(err)
        })
    })
})


