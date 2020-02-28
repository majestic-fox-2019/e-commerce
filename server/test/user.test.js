const app =  require('../app');
const request = require('supertest');

let newUser = {
    email : 'jovi@test.com',
    password: 'test'
}

let adminUser = {
    email : 'admin@mail.com',
    password: '4dm1n'
}

jest.setTimeout(10000);

describe('User endpoints' , ()=>{
    describe('register new user through POST /user/register', ()=>{
        it('should register a new user with response code 201', async ()=>{
            const res = await request(app)
                    .post('/user/register')
                    .send(newUser)
                expect(res.error).toBeFalsy()
                expect(res.statusCode).toEqual(201)
                expect(res.body).not.toBeNull()
        })
    })
    
    describe('register new admin through POST /user/register', ()=>{
        it('should register a new user with response code 201', async ()=>{
            const res = await request(app)
                    .post('/user/register')
                    .send(adminUser)
                expect(res.error).toBeFalsy()
                expect(res.statusCode).toEqual(201)
                expect(res.body).not.toBeNull()
                expect(typeof res.body).toBe('string')
        })
    })
    
    describe('error at register due to email being null',()=>{
        it('should give back an error with status code 400', async ()=>{
            const res = await request(app)
                .post('/user/register')
                .send({password : '1234'})
            expect(res.statusCode).toEqual(400)
            expect(res.error).not.toBeNull()
            expect(res.body).toHaveProperty('msg', 'email is required')

        })
    })
    
    describe('error at register due to password being null',()=>{
        it('should give back an error with status code 400 and an object of error message', async ()=>{
            const res = await request(app)
                .post('/user/register')
                .send({email : 'test@mail.com'})
            expect(res.statusCode).toEqual(400)
            expect(res.error).not.toBeNull()
            expect(res.body).toHaveProperty('msg', 'password is required')

        })
    })

    describe('log in an existing user through POST /user/login', ()=>{
        it('should login a user with response code 200 and response body containing a string of token', async ()=>{
            const res = await request(app)
                    .post('/user/login')
                    .send(newUser)
            expect(res.statusCode).toEqual(200)
            expect(res.error).toBeFalsy()
            expect(res.body).not.toBeNull()
        })
    })
    
    describe('error at login due to email being null', ()=>{
        it('should give back an error due to email being null with status code 400 and an object of error message', async ()=>{
            const res = await request(app)
                    .post('/user/login')
                    .send({
                        password : '1234'
                    })
            expect(res.statusCode).toEqual(400)
            expect(res.error).not.toBeNull()
            expect(res.body).not.toBeNull()
            expect(res.body).toHaveProperty('msg', 'Email/Password is required')
        })

        it('should give back an error due to password being null with status code 400 and an object of error message ', async ()=>{
            const res = await request(app)
                    .post('/user/login')
                    .send({
                        email : 'jovi@test.com'
                    })
            expect(res.statusCode).toEqual(400)
            expect(res.error).not.toBeNull()
            expect(res.body).not.toBeNull()
            expect(res.body).toHaveProperty('msg', 'Email/Password is required')
        })
    })

    describe('Error at login due to invalid email/password', ()=>{
        it('should give back an error due to unexisting email with status code 404 and an object of error message', async ()=>{
            const res = await request(app)
                .post('/user/login')
                .send({
                    email : 'ratulangi@mail.com',
                    password  : '1234'
                })
            expect(res.statusCode).toEqual(404)
            expect(res.error).not.toBeNull()
            expect(res.body).not.toBeNull()
            expect(res.body).toHaveProperty('msg', 'User not found')
        })
        
        it('should give back an error due to invalid password with status code 400 and an object of error message', async ()=>{
            const res = await request(app)
                .post('/user/login')
                .send({
                    email : 'jovi@test.com',
                    password  : '1234'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.error).not.toBeNull()
            expect(res.body).not.toBeNull()
            expect(res.body).toHaveProperty('msg', 'Invalid password')
        })
    })
})