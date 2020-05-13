const request = require("supertest")
const app = require("../app")
describe('Test User Register router', function () {

    describe('Test /users/register route', () => {
        it('should return user, token and status code 201', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: 'azp@gmail.com',
                    password: '123456',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('user')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user).toHaveProperty('username')
            expect(res.body.user.username).toEqual('azp')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user.email).toEqual('azp@gmail.com')
            expect(res.body.user).toHaveProperty('password')
            expect(res.body.user.password).not.toEqual('123456')
            expect(res.body.user).toHaveProperty('role')
            expect(res.body.user.role).toEqual('customer')
            expect(res.body).toHaveProperty('token')
        })
    })

    describe('Test Validation Username', () => {
        it('should return status code 400 when property username is empty', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: '',
                    email: 'azpe@gmail.com',
                    password: '123456',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill username')
        })

        it('should return status code 400 when property username is null', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: null,
                    email: 'azp@gmail.com',
                    password: '123456',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please enter your username')
        })

        it('should return status code 400 when property username duplicate', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: 'azpp@gmail.com',
                    password: '123456',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('username already exist')
        })
    })

    describe('Test Validation Email', () => {
        it('should return status code 400 when property email is empty', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azpe',
                    email: '',
                    password: '123456',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill email')
        })

        it('should return status code 400 when property email is null', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azpe',
                    email: null,
                    password: '123456',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please enter your email')
        })

        it('should return status code 400 when property email not use @ and .', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azpe',
                    email: 'azpgmail.com',
                    password: '123456',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('format email wrong')
        })

        it('should return status code 400 when property email duplicate', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azpe',
                    email: 'azp@gmail.com',
                    password: '123456',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Email address already exist')
        })
    })

    describe('Test Validation Password', () => {
        it('should return status code 400 when property password is null', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azpp',
                    email: 'azpp@gmail.com',
                    password: null,
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please enter your password')
        })

        it('should return status code 400 when property password is empty', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azpp',
                    email: 'azpp@gmail.com',
                    password: "",
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill password')
        })

        it('should return status code 400 when property password length less than 6', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'azpp',
                    email: 'azpp@gmail.com',
                    password: '12345',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('minimal password 6')
        })
    })
})

describe('Test User Login Router', function () {

    describe('Test /users/login route', () => {
        it('should return user, token and status code 200', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'azp@gmail.com',
                    password: '123456'
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('user')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user).toHaveProperty('username')
            expect(res.body.user.username).toEqual('azp')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user.email).toEqual('azp@gmail.com')
            expect(res.body.user).toHaveProperty('password')
            expect(res.body.user.password).not.toEqual('123456')
            expect(res.body.user).toHaveProperty('role')
            expect(res.body.user.role).toEqual('customer')
            expect(res.body).toHaveProperty('token')
        })

        it('should return status code 404 when password wrong', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'azp@gmail.com',
                    password: 'beda password',
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('email/password wrong')
        })

        it('should return status code 404 when email wrong', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'azo@gmail.com',
                    password: '123456',
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('email/password wrong')
        })
    })

})