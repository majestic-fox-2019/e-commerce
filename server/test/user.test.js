const request = require('supertest')
const app = require('../app.js')

describe('Test POST /register', () => {
    it('should create a new post', async (done) => {
        const res = await request(app)
        .post('/register')
        .send({
            name: 'Kirwan',
            email: 'kirwan@mail.com',
            password: 'km',
            phone: '08159198511',
            address: 'jakarta',
            role: 'admin',
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body.name).toBe('Kirwan')
        expect(res.body.email).toBe('kirwan@mail.com')
        expect(res.body.role).toBe('admin')
        expect(res.body).toHaveProperty('token')
        done()
    })

    it('should create an error message', async (done) => {
        const res = await request(app)
        .post('/register')
        .send({
            name: null,
            email: null,
            password: null,
            phone: null,
            address: null,
            role: null,
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.error[0]).toBe('Name is required')
        expect(res.body.error[1]).toBe('Email is required')
        expect(res.body.error[2]).toBe('Phone is required')
        expect(res.body.error[3]).toBe('Address is required')
        expect(res.body.error[4]).toBe('Password is required')
        done()
    })

})

describe('Test POST /login', () => {
    it('should send an response json of id, email, and token', async (done) => {
        const res = await request(app)
        .post('/login')
        .send({
            email: 'kirwan@mail.com',
            password: 'km'
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('role')
        expect(res.body).toHaveProperty('token')
        done()
    })
    
    it('should create an error message',  async (done) => {
        const res = await request(app)
        .post('/login')
        .send({
            email: 'km@mail.com',
            password: null
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toBe('Email/password wrong')
        done()
    })
})
