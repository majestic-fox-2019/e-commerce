
const app = require('../app')
const request = require('supertest')

describe('Register an User',function(){
    it('Should register an user',function(done){
        let user = {email:"coba@mail.com",password:"coba123",username:"coba"}
        request(app)
        .post('/user/register')
        .send(user)
        .then(res=>{
            expect(res.statusCode).toEqual(201)
            done()
        })
        .catch(err=>{
            return done(err)
        })
    })
})

describe('Login an User',function(){
    it('Should register an user',function(done){
        let user = {email:"coba@mail.com",password:"coba123"}
        request(app)
        .post('/user/login')
        .send(user)
        .then(res=>{
            expect(res.statusCode).toEqual(201)
            done()
        })
        .catch(err=>{
            return done(err)
        })
    })
})