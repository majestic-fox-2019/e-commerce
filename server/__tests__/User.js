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

const wrongFormat = {
    email: 'testmail.com',
    password: 'admin12'
}

const emptyParam = {
    email: '',
    password: '',
}

let token = null

describe('User login test scenario', () => {
    it('Should get empty users', (done) => {
        req(app)
            .get('/users')
            .expect(200)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTgyNDE0NTIyfQ.O7doZXDpCgp7mx51PbYG99llvomaIcajsGMIgMwWNyc')
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
    // =================DONE

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
    // ================DONE

    it('should get an error if email or password requirement is not fulfilled', (done) => {
        req(app)
            .post('/users')
            .send(wrongFormat)
            .expect(400)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message')
                done()
            })
    });
    // ================DONE

    it('should get an error empty fields', (done) => {
        req(app)
            .post('/users')
            .send(emptyParam)
            .expect(400)
            .end((err, res) => {
                if (err) throw done(err);
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Email or password cannot be empty')
                done()
            })
    });
    // ====================DONE

    it('should get an error while email already registered', (done) => {
        req(app)
            .post('/users')
            .send(correctParam)
            .expect(409)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Email already registered')
                done()
            })
    });
    // ========================DONE

    it('Should be correct login', (done) => {
        req(app)
            .post('/login')
            .send(correctParam)
            .expect(200)
            .end((err, res) => {
                if (err) throw done(Object.keys(err))
                token = res.body.access_token
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('access_token')
                expect(res.body).toHaveProperty('email')
                expect(res.body.email).toBeDefined()
                expect(verifyToken(res.body.access_token)).toHaveProperty('id')
                done()
            })
    })
    // =================DONE


    it('should be a wrong login', (done) => {
        req(app)
            .post('/login')
            .send(wrongParam)
            .expect(404)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Invalid email or password')
                done()
            })
    });
    // ================DONE

    it('should get error with empty param', (done) => {
        req(app)
            .post('/login')
            .send(emptyParam)
            .expect(400)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Email or password cannot be empty')
                done()
            })
    });
    // =======================DONE

    it('should update a user', (done) => {
        req(app)
            .put('/users')
            .send(wrongParam)
            .set('token', token)
            .expect(200)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Successfully updated user')
                done()
            })
    });
    // ====================DONE

    it('should get an error on update wihle fields is empty', (done) => {
        req(app)
            .put('/users')
            .send(emptyParam)
            .set('token', token)
            .expect(400)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Email and password cannot be empty')
                done()
            })
    });
})