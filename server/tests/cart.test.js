const request = require('supertest')
const app = require('../app')

let token
let userInfo
let productInfo
let userInfo2
let token2
let currentCart

let productData = {
    name: 'Samsung Galaxy S20',
    desc: 'Samsung galaxy series',
    price: 10000,
    stock: 5,
    img_url: 'https://images.anandtech.com/doci/15482/Galaxy-S20-S20-5G_678x452.jpg',
    category: 'Handphone'
}

let userData = {
    name: 'Okka Linardi',
    email: 'okkaL@mail.com',
    address: 'Jakarta',
    phone: '081234567891',
    password: 'okkalinardi',
    shopName: 'LieShop2'
}

let userData2 = {
    name: 'Okka Linardi',
    email: 'Mokka@mail.com',
    address: 'Jakarta',
    phone: '081234567890',
    password: 'okkalinardi',
    shopName: null
}


beforeAll((done) => {
    request(app)
        .post('/user/register')
        .send(userData)
        .end((err, res) => {
            token = res.body.token
            userInfo = res.body.userInfo
            request(app)
                .post('/user/register')
                .send(userData2)
                .end((err, res) => {
                    token2 = res.body.token
                    userInfo2 = res.body.userInfo
                    request(app)
                        .post('/products')
                        .send(productData)
                        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE1ODE5NjM0MDB9.pmZ96Wv-v5yGpx_T6QGEN3wcNHsF-mnm27JMDjfG2JY')
                        .expect(201)
                        .end((err, res) => {
                            productInfo = res.body
                            done()
                    })
                })
        })
})

// Add to Cart Tests

describe('POST /cart (SUCCESS)', () => {
    it('should return an object with details of product, qty, and status', (done) => {
        request(app)
            .post('/cart')
            .send({
                ProductId: productInfo.id,
                qty: 2
            })
            .set('token', token2)
            .expect(201)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('UserId')
                expect(res.body).toHaveProperty('ProductId')
                expect(res.body).toHaveProperty('status')
                expect(res.body).toHaveProperty('paid_date')
                expect(res.body).toHaveProperty('qty')
                expect(res.body.UserId).toEqual(userInfo2.id)
                expect(res.body.status).toBe('Active')
                expect(res.body.paid_date).toBe(null)
                expect(res.body.qty).toBe(2)
                expect(res.body.ProductId).toBe(productInfo.id)
                done()
            })
    })
})

describe('POST /cart (ERROR: insufficient stock)', () => {
    it(`should return status 400 with the message: We're sorry the current stock is insufficient`, (done) => {
        request(app)
        .post('/cart')
        .send({
            ProductId: productInfo.id,
            qty: 10
        })
        .set('token', token2)
        .expect(400)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe(`We're sorry the current stock is insufficient`)
                done()
            })
    })
})

describe('POST /cart (ERROR: invalid action)', () => {
    it('should return status 400 with the message: You cannot make transaction with your own product', (done) => {
        request(app)
        .post('/cart')
        .send({
            ProductId: productInfo.id,
            qty: 2
        })
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE1ODE5NjM0MDB9.pmZ96Wv-v5yGpx_T6QGEN3wcNHsF-mnm27JMDjfG2JY')
        .expect(400)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('You cannot make transaction with your own product')
                done()
            })
    })
})

// End of Add to Cart Tests

// See Cart Tests
describe('GET /cart (SUCCESS)', () => {
    it('should return an array of Objects with product details', (done) => {
        request(app)
            .get('/cart')
            .set('token', token2)
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                currentCart = res.body
                expect(res.body[0]).toHaveProperty('Product')
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body[0]).toHaveProperty('UserId')
                expect(res.body[0]).toHaveProperty('qty')
                expect(res.body[0]).toHaveProperty('paid_date')
                expect(res.body[0]).toHaveProperty('status')
                expect(res.body[0].status).toBe('Active')
                expect(res.body[0].UserId).toBe(userInfo2.id)
                expect(res.body[0].paid_date).toBe(null)
                expect(res.body[0].Product).toHaveProperty('name')
                expect(res.body[0].Product).toHaveProperty('desc')
                expect(res.body[0].Product).toHaveProperty('stock')
                expect(res.body[0].Product).toHaveProperty('img_url')
                expect(res.body[0].Product).toHaveProperty('UserId')
                expect(res.body[0].Product).toHaveProperty('category')
                done()
            })
    })
})

// End of See Cart Tests

// CheckOut, decrease qty and Delete Item in Cart Tests

describe('PATCH /cart/checkOut (SUCCESS)', () => {
    it('should return an array of checkedOut transaction', (done) => {
        request(app)
            .patch('/cart/checkOut')
            .set('token', token2)
            .send({
                cartItems: currentCart
            })
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                currentCart = res.body[0][1]
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body[0][1][0]).toHaveProperty('UserId')
                expect(res.body[0][1][0]).toHaveProperty('qty')
                expect(res.body[0][1][0]).toHaveProperty('paid_date')
                expect(res.body[0][1][0]).toHaveProperty('status')
                expect(res.body[0][1][0].status).toBe('CheckedOut')
                expect(res.body[0][1][0].UserId).toBe(userInfo2.id)
                expect(res.body[0][1][0].paid_date).not.toBe(null)
                done()
            })
    })
})
// End of CheckOut, decrease qty and Delete Item in Cart Tests

// Delivery Confirmation Tests
describe('PATCH /cart/deliveryConfirm (ERROR: unauthorized)', () => {
    it('should return status 401 with the message: You are unauthorized to edit this cart', (done) => {
        request(app)
            .delete(`/cart/deliveryConfirmation/${currentCart[0].id}`)
            .set('token', token)
            .expect(401)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('You are unauthorized to edit this cart')
                done()
            })
    })
})

describe('PATCH /cart/deliveryConfirm (SUCCESS)', () => {
    it('should return an Object of created purchase history', (done) => {
        request(app)
            .delete(`/cart/deliveryConfirmation/${currentCart[0].id}`)
            .set('token', token2)
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('UserId')
                expect(res.body).toHaveProperty('ProductId')
                expect(res.body).toHaveProperty('qty')
                expect(res.body).toHaveProperty('finish_date')
                done()
            })
    })
})

describe('PATCH /cart/deliveryConfirm (ERROR: invalid cart)', () => {
    it('should return status 401 with the message: Invalid Cart', (done) => {
        request(app)
            .delete(`/cart/deliveryConfirmation/${currentCart[0].id}`)
            .set('token', token2)
            .expect(404)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body).toHaveProperty('msg')
                expect(res.body.msg).toBe('Invalid Cart')
                done()
            })
    })
})
// End of Delivery Confirmation Tests

// Income and Purchase Tests
describe('GET /purchases (SUCCESS)', () => {
    it('should return an Array of Objects with all purchased products', (done) => {
        request(app)
            .get('/user/purchases')
            .set('token', token2)
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body[0]).toHaveProperty('UserId')
                expect(res.body[0]).toHaveProperty('Product')
                expect(res.body[0]).toHaveProperty('qty')
                expect(res.body[0]).toHaveProperty('finish_date')
                expect(typeof res.body[0].Product).toBe('object')
                expect(res.body[0].UserId).toBe(userInfo2.id)
                done()
            })
    })
})

describe('GET /incomes (SUCCESS)', () => {
    it('should return an Array of Objects with all sold products', (done) => {
        request(app)
            .get('/user/incomes')
            .set('token', token)
            .expect(200)
            .end((err, res) => {
                if(err) done(err)
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body[0]).toHaveProperty('UserId')
                expect(res.body[0]).toHaveProperty('Product')
                expect(res.body[0]).toHaveProperty('qty')
                expect(res.body[0]).toHaveProperty('buyer')
                expect(res.body[0]).toHaveProperty('finish_date')
                expect(typeof res.body[0].Product).toBe('object')
                expect(res.body[0].UserId).toBe(userInfo.id)
                expect(res.body[0].qty).toBe(currentCart[0].qty)
                done()
            })
    })
})

// End of Income and Purchase Tests