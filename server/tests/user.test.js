const request = require('supertest')
const app = require('../app')
let CorrectRegisterData = {
    name: 'Okka Linardi',
    email: 'okka@mail.com',
    address: 'Jakarta',
    phone: '08123456789',
    password: 'okkalinardi',
    shopName: null
}

let token

// Register User Tests
describe('POST /user/register (SUCCESS)', () => {
    it('should return status(201) and object containing token with userInfo', (done) => {
      request(app)
        .post('/user/register')
        .send(CorrectRegisterData)
        .expect(201)
        .end((err, res) => {
            if(err) return done(err)
            token = res.body.token
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('userInfo')
            expect(res.body.userInfo).toHaveProperty('id')
            expect(res.body.userInfo).toHaveProperty('name')
            expect(res.body.userInfo).toHaveProperty('email')
            expect(res.body.userInfo).toHaveProperty('address')
            expect(res.body.userInfo).toHaveProperty('phone')
            expect(res.body.userInfo).toHaveProperty('role')
            expect(res.body.userInfo.name).toBe('Okka Linardi')
            expect(res.body.userInfo.email).toBe('okka@mail.com')
            expect(res.body.userInfo.address).toBe('Jakarta')
            expect(res.body.userInfo.phone).toBe('08123456789')
            expect(res.body.userInfo.role).toBe('user')
            done()
        })
    })
  })

  describe('POST /user/register (ERROR: duplicate phone)', () => {
    let registerData = {
        name: 'Okka Linardi',
        email: 'okka2@mail.com',
        address: 'Jakarta',
        phone: '08123456789',
        password: 'okkalinardi',
        shopName: null
    }
    it('should return status(400) with the message: phone has already been used', (done) => {
      request(app)
        .post('/user/register')
        .send(registerData)
        .expect(400)
        .end(function (err, res) {
            if(err) return done(err)
            expect(res.body).toHaveProperty('msg')
            expect(res.body.msg[0]).toBe('phone has already been used')
            done()
        })
    })
  })

  describe('POST /user/register (ERROR: duplicate email)', () => {
    let registerData = {
        name: 'Okka Linardi',
        email: 'okka@mail.com',
        address: 'Jakarta',
        phone: '081234567899',
        password: 'okkalinardi',
        shopName: null
    }
    it('should return status(400) with the message: email has already been used', (done) => {
      request(app)
        .post('/user/register')
        .send(registerData)
        .expect(400)
        .end(function (err, res) {
            if(err) return done(err)
            expect(res.body).toHaveProperty('msg')
            expect(res.body.msg[0]).toBe('email has already been used')
            done()
        })
    })
  })

  describe('POST /user/register (ERROR: Wrong phone format)', () => {
    let registerData = {
        name: 'Okka Linardi',
        email: 'okkalie@mail.com',
        address: 'Jakarta',
        phone: '081234567',
        password: 'okkalinardi',
        shopName: null
    }
    it('should return status(400) with the message: Please user the correct Indonesian phone number format', (done) => {
      request(app)
        .post('/user/register')
        .send(registerData)
        .expect(400)
        .end(function (err, res) {
            if(err) return done(err)
            expect(res.body).toHaveProperty('msg')
            expect(res.body.msg[0]).toBe('Please user the correct Indonesian phone number format')
            done()
        })
    })
  })

  describe('POST /user/register (ERROR: Wrong email format)', () => {
    let registerData = {
        name: 'Okka Linardi',
        email: 'okkalie@mail',
        address: 'Jakarta',
        phone: '081234567',
        password: 'okkalinardi',
        shopName: null
    }
    it('should return status(400) with the message: Please use the correct email format', (done) => {
      request(app)
        .post('/user/register')
        .send(registerData)
        .expect(400)
        .end(function (err, res) {
            if(err) return done(err)
            expect(res.body).toHaveProperty('msg')
            expect(res.body.msg[0]).toBe('Please use the correct email format')
            done()
        })
    })
  })

  describe('POST /user/register (ERROR: Missing field(s))', () => {
    let registerData = {
        name: 'Okka Linardi',
        email: 'okkalie@mail.com',
        address: '',
        phone: '081234567897',
        password: 'okkalinardi',
        shopName: null
    }
    it('should return status(400) with the message: Please fill in all fields', (done) => {
      request(app)
        .post('/user/register')
        .send(registerData)
        .expect(400)
        .end(function (err, res) {
            if(err) return done(err)
            expect(res.body).toHaveProperty('msg')
            expect(res.body.msg[0]).toBe('Please fill in all fields')
            done()
        })
    })
  })

// End of register user Tests
// User login Tests
describe('POST /user/login (SUCCESS)', () => {
it('should return status(200) and object containing token with userInfo', (done) => {
    request(app)
        .post('/user/login')
        .send({
            email: CorrectRegisterData.email,
            password: CorrectRegisterData.password
        })
        .expect(200)
        .end(function (err, res) {
            if(err) return done(err)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('userInfo')
            expect(res.body.userInfo).toHaveProperty('id')
            expect(res.body.userInfo).toHaveProperty('name')
            expect(res.body.userInfo).toHaveProperty('email')
            expect(res.body.userInfo).toHaveProperty('address')
            expect(res.body.userInfo).toHaveProperty('phone')
            expect(res.body.userInfo).toHaveProperty('role')
            expect(res.body.userInfo.name).toBe('Okka Linardi')
            expect(res.body.userInfo.email).toBe('okka@mail.com')
            expect(res.body.userInfo.address).toBe('Jakarta')
            expect(res.body.userInfo.phone).toBe('08123456789')
            expect(res.body.userInfo.role).toBe('user')
            done()
        })
    })
})

describe('POST /user/login (ERROR: invalid email / password)', () => {
    it('should return status(404) with the message: invalid email/password', (done) => {
        request(app)
            .post('/user/login')
            .send({
                email: 'okka-test@mail.com',
                password: CorrectRegisterData.password
            })
            .expect(400)
            .end(function (err, res) {
                if(err) return done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('Invalid email / password')
                done()
            })
        })
    })
// End of User Login Tests

// User Shop registration Tests
describe('PATCH /users/shop (ERROR: invalid shopName)', () => {
    it('should return status(400) with the message: Invalid shop name', (done) => {
        request(app)
            .patch('/user/shop')
            .send({
                shopName: 'Official Store'
            })
            .set('token', token)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('Invalid shop name')
                done()
            })
    })
})

describe('PATCH /users/shop (SUCCESS)', () => {
    it('should return an object of userData with the updated shopName', (done) => {
        request(app)
            .patch('/user/shop')
            .send({
                shopName: 'Test Store'
            })
            .set('token', token)
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                expect(typeof res.body).toBe('object')
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('email')
                expect(res.body).toHaveProperty('address')
                expect(res.body).toHaveProperty('phone')
                expect(res.body).toHaveProperty('role')
                expect(res.body).toHaveProperty('shopName')
                expect(res.body.name).toBe('Okka Linardi')
                expect(res.body.email).toBe('okka@mail.com')
                expect(res.body.address).toBe('Jakarta')
                expect(res.body.phone).toBe('08123456789')
                expect(res.body.role).toBe('user')
                expect(res.body.shopName).toBe('Test Store')
                done()
            })
    })
})

describe('PATCH /users/shop (ERROR: invalid edit shopName)', () => {
    it('should return status(400) with the message: You cannot change you shop name', (done) => {
        request(app)
            .patch('/user/shop')
            .send({
                shopName: 'Test Store-edited'
            })
            .set('token', token)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('You cannot change you shop name')
                done()
            })
    })
})

// End of User Shop registration Tests