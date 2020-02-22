const req = require('supertest')
const app = require('../app')
const { verifyToken } = require('../helpers/jwt')

const correctParam = {
    email: 'super_admin@mail.com',
    password: 'admin123'
}
const wrongParam = {
    email: 'admin@mail.com',
    password: 'admin123'
}

describe('User login test scenario', () => {
    it('Should get empty users', (done) => {
        req(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw done(err)
                } else {
                    expect(res.body).toHaveProperty('message')
                    expect(res.body).toBeDefined()
                    expect(res.body.message).toBe('No user available yet')
                    expect(res.body.message).toBeDefined()
                    expect(res.body.message)
                    done()
                }
            })
    })

    it('should create a new user', (done) => {
        const expectedResKey = ['id', 'email', 'password', 'createdAt', 'updatedAt']
        req(app)
            .post('/users')
            .send(correctParam)
            .expect(201)
            .end((err, res) => {
                if (err) throw done(err);
                expect(Object.keys(res.body)).toEqual(expect.arrayContaining(expectedResKey))
                expect(res.body.password).not.toBe(correctParam.password)
                done()
            })

    });

    it('should get an error while email already registered', (done) => {
        req(app)
            .post('/users')
            .send(correctParam)
            .expect(409)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toHaveProperty('message', 'Email already registered')
                done()
            })

    });

    it('Should be correct login', (done) => {
        req(app)
            .post('/login')
            .send(correctParam)
            .expect(200)
            .end((err, res) => {
                if (err) throw done(Object.keys(err))
                expect(res.body).toHaveProperty('access_token')
                expect(res.body).toHaveProperty('email')
                expect(res.body.email).toBeDefined()
                expect(verifyToken(res.body.access_token)).toHaveProperty('id')
                done()
            })
    })
})