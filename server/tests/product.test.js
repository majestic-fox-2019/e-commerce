const request = require('supertest')
const app = require('../app')
let userData = {
    name: 'Okka Linardi',
    email: 'okka3@mail.com',
    address: 'Jakarta',
    phone: '081234567895',
    password: 'okkalinardi',
    shopName: 'LieShop'
}
let invalidUserData = {
    name: 'Okka Linardi',
    email: 'okka3@mail.com',
    address: 'Jakarta',
    phone: '081234567895',
    password: 'okkalinardi',
    shopName: null
}
let token
let userInfo
let invalidToken

let productData
let productId

beforeAll((done) => {
    request(app)
        .post('/user/register')
        .send(userData)
        .end((err, res) => {
            token = res.body.token
            userInfo = res.body.userInfo
            productData = {
                name: 'Samsung Galaxy S20',
                desc: 'Samsung galaxy series',
                price: 10000,
                stock: 5,
                img_url: 'https://images.anandtech.com/doci/15482/Galaxy-S20-S20-5G_678x452.jpg',
                category: 'Handphone'
            }
        })
    request(app)
        .post('/user/register')
        .send(invalidUserData)
        .end((err, res) => {
            invalidToken = res.body.token
            done()
        })
});

describe('POST /products (SUCCESS)', () => {
    it('should return status(201) and object containing product details', (done) => {
        request(app)
            .post('/products')
            .send(productData)
            .set('token', token)
            .expect(201)
            .end((err, res) => {
                if (err) done(err)
                productId = res.body.id
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('desc')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                expect(res.body).toHaveProperty('img_url')
                expect(res.body).toHaveProperty('UserId')
                expect(res.body).toHaveProperty('category')
                expect(res.body.name).toBe(productData.name)
                expect(res.body.desc).toBe(productData.desc)
                expect(res.body.price).toBe(productData.price)
                expect(res.body.stock).toBe(productData.stock)
                expect(res.body.img_url).toBe(productData.img_url)
                expect(res.body.UserId).toBe(userInfo.id)
                expect(res.body.category).toBe(productData.category)
                done()
            })
    })
})

describe('POST /products (ERROR: invalid token)', () => {
    it('should return status 403 with the message: Invalid token', (done) => {
        request(app)
            .post('/products')
            .send(productData)
            .expect(403)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('Invalid token')
                done()
            })
    })
})

describe('POST /products (ERROR: missing field(s))', () => {
    it('should return status 400 with the message: Please fill in all fields', (done) => {
        request(app)
            .post('/products')
            .set('token', token)
            .send({
                name: 'Samsung Galaxy S20',
                desc: 'Samsung galaxy series',
                price: 10000,
                stock: 5,
                img_url: 'https://images.anandtech.com/doci/15482/Galaxy-S20-S20-5G_678x452.jpg',
                category: ''
            })
            .expect(400)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg[0]).toBe('Please fill in all fields')
                done()
            })
    })
})

describe('POST /products (ERROR: no shop)', () => {
    it('should return status 400 with the message: To start selling items, please create a shop first', (done) => {
        request(app)
            .post('/products')
            .set('token', invalidToken)
            .send({
                name: 'Samsung Galaxy S20',
                desc: 'Samsung galaxy series',
                price: 10000,
                stock: 5,
                img_url: 'https://images.anandtech.com/doci/15482/Galaxy-S20-S20-5G_678x452.jpg',
                category: 'Handphone'
            })
            .expect(400)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('To start selling items, please create a shop first')
                done()
            })
    })
})

describe('GET /products (SUCCESS)', () => {
    it('should return an array of objects of products', (done) => {
        request(app)
            .get('/products')
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body.length).toBeGreaterThan(0)
                expect(typeof res.body[0]).toBe('object')
                expect(res.body[0]).toHaveProperty('name')
                expect(res.body[0]).toHaveProperty('desc')
                expect(res.body[0]).toHaveProperty('price')
                expect(res.body[0]).toHaveProperty('stock')
                expect(res.body[0]).toHaveProperty('img_url')
                expect(res.body[0]).toHaveProperty('UserId')
                expect(res.body[0]).toHaveProperty('category')
                done()
            })
    })
})

describe('GET /products/:id (SUCCESS)', () => {
    it('should return an object with product details', (done) => {
        request(app)
            .get(`/products/${productId}`)
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('desc')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                expect(res.body).toHaveProperty('img_url')
                expect(res.body).toHaveProperty('UserId')
                expect(res.body).toHaveProperty('category')
                expect(res.body.name).toMatch(productData.name)
                expect(res.body.desc).toMatch(productData.desc)
                expect(res.body.price).toEqual(productData.price)
                expect(res.body.stock).toEqual(productData.stock)
                expect(res.body.img_url).toMatch(productData.img_url)
                expect(res.body.UserId).toEqual(userInfo.id)
                expect(res.body.category).toMatch(productData.category)
                done()
            })
    })
})

describe('GET /products/:id (ERROR: invalid product)', () => {
    it('should return status 404 with the message: Product not found', (done) => {
        request(app)
            .get(`/products/10`)
            .expect(404)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('Product not found')
                done()
            })
    })
})

describe('GET /products/category/:category (SUCCESS)', () => {
    it('should return an array of objects with product details filtered by category', (done) => {
        request(app)
            .get('/products/categories/Handphone')
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body.length).toBeGreaterThan(0)
                expect(typeof res.body[0]).toBe('object')
                expect(res.body[0]).toHaveProperty('name')
                expect(res.body[0]).toHaveProperty('desc')
                expect(res.body[0]).toHaveProperty('price')
                expect(res.body[0]).toHaveProperty('stock')
                expect(res.body[0]).toHaveProperty('img_url')
                expect(res.body[0]).toHaveProperty('UserId')
                expect(res.body[0]).toHaveProperty('category')
                done()
            })
    })
})

describe('GET /products/category/:category (ERROR: invalid category)', () => {
    it('should return status 404 with the message: Category not found', (done) => {
        request(app)
            .get('/products/categories/tongkat')
            .expect(404)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('Category not found')
                done()
            })
    })
})

describe('PUT /products/:id (SUCCESS)', () => {
    it('should return an object with detailed edited product', (done)=> {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'Samsung Galaxy S20-edited',
                desc: 'Samsung galaxy series',
                price: 10000,
                stock: 5,
                img_url: 'https://images.anandtech.com/doci/15482/Galaxy-S20-S20-5G_678x452.jpg',
                category: 'Handphone'
            })
            .set('token', token)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('desc')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                expect(res.body).toHaveProperty('img_url')
                expect(res.body).toHaveProperty('UserId')
                expect(res.body).toHaveProperty('category')
                expect(res.body.name).toMatch('Samsung Galaxy S20-edited')
                expect(res.body.desc).toMatch(productData.desc)
                expect(res.body.price).toEqual(productData.price)
                expect(res.body.stock).toEqual(productData.stock)
                expect(res.body.img_url).toMatch(productData.img_url)
                expect(res.body.UserId).toEqual(userInfo.id)
                expect(res.body.category).toMatch(productData.category)
                done()
            })
    })
})

describe('PUT /products/:id (ERROR: unauthorized edit)', () => {
    it('should return status 401 with the message: You are unauthorized to edit this product', (done)=> {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'Samsung Galaxy S20-edited',
                desc: 'Samsung galaxy series',
                price: 10000,
                stock: 5,
                img_url: 'https://images.anandtech.com/doci/15482/Galaxy-S20-S20-5G_678x452.jpg',
                category: 'Handphone'
            })
            .set('token', invalidToken)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('You are unauthorized to edit this product')
                done()
            })
    })
})

describe('PATCH /products/:id (SUCCESS)', () => {
    it('should return an object with detailed edited product', (done) => {
        request(app)
            .patch(`/products/${productId}`)
            .send({
                stock: 10
            })
            .set('token', token)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('name')
                expect(res.body).toHaveProperty('desc')
                expect(res.body).toHaveProperty('price')
                expect(res.body).toHaveProperty('stock')
                expect(res.body).toHaveProperty('img_url')
                expect(res.body).toHaveProperty('UserId')
                expect(res.body).toHaveProperty('category')
                expect(res.body.name).toMatch('Samsung Galaxy S20-edited')
                expect(res.body.desc).toMatch(productData.desc)
                expect(res.body.price).toEqual(productData.price)
                expect(res.body.stock).toEqual(10)
                expect(res.body.img_url).toMatch(productData.img_url)
                expect(res.body.UserId).toEqual(userInfo.id)
                expect(res.body.category).toMatch(productData.category)
                done()
            })
    })
})

describe('PATCH /products/:id (ERROR: unauthorized edit)', () => {
    it('should return status 401 with the message: You are unauthorized to edit this product', (done)=> {
        request(app)
            .put(`/products/${productId}`)
            .send({
                stock: 5
            })
            .set('token', invalidToken)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('You are unauthorized to edit this product')
                done()
            })
    })
})

describe('DELETE /products/:id (ERROR: unauthorized)', () => {
    it('should return status 401 with the message: You are unauthorized to edit this product', (done) => {
        request(app)
            .delete(`/products/${productId}`)
            .set('token', invalidToken)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('You are unauthorized to edit this product')
                done()
            })
    })
})

describe('DELETE /products/:id (SUCCESS)', () => {
    it('should return the number of deleted Product', (done) => {
        request(app)
            .delete(`/products/${productId}`)
            .set('token', token)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toBeGreaterThan(0)
                done()
            })
    })
})
