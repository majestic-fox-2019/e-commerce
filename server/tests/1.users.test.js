const request = require('supertest')
const app = require('../app')

describe('Test User Register router', function () {
    describe('Test /users/register route', () => {
        it('should return user, token and status code 201', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    name: 'dede',
                    email: 'dedehudianto12@gmail.com',
                    password: 'kudaliar'
                })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('user')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user).toHaveProperty('name')
            expect(res.body.user.name).toEqual('dede')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user.email).toEqual('dedehudianto12@gmail.com')
            expect(res.body.user).toHaveProperty('password')
            expect(res.body.user.password).not.toEqual('kudaliar')
            expect(res.body.user).toHaveProperty('roles')
            expect(res.body.user.roles).toEqual('admin')
            expect(res.body).toHaveProperty('access_token')
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
            expect(res.body.message).toEqual('User.name cannot be null')
        })

    })

})