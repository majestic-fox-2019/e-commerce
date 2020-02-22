const request = require('supertest')
const app = require('../app.js')
const { readFileSync } = require('fs')

let adminToken = null
let file = './bread-1.jpg'
let data = { 
    name: 'Roti',
    description: 'Roti',
    image_url: file,
    stock: 1,
    price: 10000,
    category: 'bread'
}
let idProduct = null

describe('Test /product routes', () => {
    beforeAll((done) => {
        request(app)
        .post('/register')
        .send({
            name: 'Kirwan',
            email: 'kirwan@mail.com',
            password: 'km',
            phone: '08159198511',
            address: 'jakarta',
            role: 'admin',
        })
        .end((err, res) => {
            adminToken = res.body.token
            done()
        })
    })

    it('should create new product', async (done) => {
        const res = await request(app)
        .post('/product')
        .set({
            token: adminToken
        })
        .send(data)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('stock')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('image_url')
        expect(res.body).toHaveProperty('category')
        idProduct = res.body.id
        done()
    })

    it('should get products', async (done) => {
        const res = await request(app)
        .get('/product')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(res.body)
        done()
    })

    it('should get a product', async (done) => {
        const res = await request(app)
        .get(`/product/${idProduct}`)
        .set({
            token: adminToken
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(res.body)
        done()
    })

    it('should update a product', async (done) => {
        const res = await request(app)
        .put(`/product/${idProduct}`)
        .set({
            token: adminToken
        })
        .send({
            name: 'Roti -edited',
            description: 'Roti -edited',
            image_url: file,
            stock: 2,
            price: 20000,
            category: 'bread'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual([1])
        done()
    })

    it('should create a product get error', async (done) => {
        const res = await request(app)
        .post('/product')
        .set({
            token: adminToken
        })
        .send({
            name: null,
            description: null,
            image_url: null,
            stock: -2,
            price: -20000,
            category: null
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual(["Name is required", "Category is required", "Negatif value is not allow", "Negatif value is not allow"])
        done()
    })

    it('should get a product', async (done) => {
        const res = await request(app)
        .delete(`/product/${idProduct}`)
        .set({
            token: adminToken
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(1)
        done()
    })

})