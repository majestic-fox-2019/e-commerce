const request = require("supertest")
const app = require("../app")
const { readFileSync } = require("fs")

const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTgxOTkwNTA0fQ.QnIMk3KQGIDTkQtJfBS04D2f7bNQPLIGKU1kZS5sZoE";
let file = readFileSync("./tests/sepatu.jpg", "utf8")
let tokenAdmin;
let tokenCustomer;

describe('Test Products router', function () {
    beforeAll((done) => {
        request(app)
            .post('/users/register')
            .send({
                username: 'azpp',
                email: 'azpp@gmail.com',
                password: '123456',
                role: 'admin',
            })
            .end((err, res) => {
                tokenAdmin = res.body.token
            })
        request(app)
            .post('/users/register')
            .send({
                username: 'azppp',
                email: 'azppp@gmail.com',
                password: '123456',
                role: 'customer',
            })
            .end((err, res) => {
                tokenCustomer = res.body.token
                done()
            })
    })
    describe('Test /products route', () => {
        it('should return product and status code 401', async () => {
            const res = await request(app)
                .post('/products')
                .attach('image_url', './tests/sepatu.jpg', 'sepatu.jpg')
                .field('name', 'kokakola')
                .field('description', 'minuman soda')
                .field('price', '28000')
                .field('stock', '4')
                .field('category', 'sepatu')
                .set({
                    token: tokenCustomer
                })
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('you are not admin')
        })

        it('should return product and status code 400', async () => {
            const res = await request(app)
                .post('/products')
                .attach('image_url', './tests/sepatu.jpg', 'sepatu.jpg')
                .field('name', 'kokakola')
                .field('description', 'minuman soda')
                .field('price', '28000')
                .field('stock', '4')
                .field('category', 'sepokat')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please add correct category')
        })

        it('should return product and status code 201', async () => {
            const res = await request(app)
                .post('/products')
                .attach('image_url', './tests/sepatu.jpg', 'sepatu.jpg')
                .field('name', 'kokakola')
                .field('description', 'minuman soda')
                .field('price', 28000)
                .field('stock', 4)
                .field('category', 'sepatu')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(1)
            expect(res.body).toHaveProperty('name')
            expect(res.body.name).toEqual('kokakola')
            expect(res.body).toHaveProperty('description')
            expect(res.body.description).toEqual('minuman soda')
            expect(res.body).toHaveProperty('image_url')
            expect(res.body).toHaveProperty('price')
            expect(res.body.price).toEqual(28000)
            expect(res.body).toHaveProperty('stock')
            expect(res.body.stock).toEqual(4)
            expect(res.body).toHaveProperty('category')
            expect(res.body.category).toEqual('sepatu')
        })
    })

    describe('Test /products route', () => {
        it('should return products and status code 200', async () => {
            const res = await request(app)
                .get('/products')
            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual(res.body)
        })
    })

    describe('Test /products/:id route', () => {
        it('should return products and status code 200', async () => {
            const res = await request(app)
                .get('/products/1')
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('name')
            expect(res.body.name).toEqual('kokakola')
            expect(res.body).toHaveProperty('description')
            expect(res.body.description).toEqual('minuman soda')
            expect(res.body).toHaveProperty('image_url')
            expect(res.body).toHaveProperty('price')
            expect(res.body.price).toEqual(28000)
            expect(res.body).toHaveProperty('stock')
            expect(res.body.stock).toEqual(4)
            expect(res.body).toHaveProperty('category')
            expect(res.body.category).toEqual('sepatu')
        })

        it('should return products and status code 404', async () => {
            const res = await request(app)
                .get('/products/2')
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Not found product')
        })
    })

    describe('Test Validation name', () => {
        it('should return status code 400 when property name is empty', async () => {
            const res = await request(app)
                .post('/products')
                .send({
                    name: '',
                    description: 'minuman soda',
                    image_url: file,
                    price: 28000,
                    stock: 4,
                    category: "sepatu"
                })
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill name product')
        })
    })

    describe('Test Validation image_url', () => {
        it('should return status code 400 when property image_url is empty', async () => {
            const res = await request(app)
                .post('/products')
                .send({
                    name: 'kokakola',
                    description: 'minuman soda',
                    image_url: '',
                    price: 28000,
                    stock: 4,
                    category: "sepatu"
                })
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill image_url')
        })
    })

    describe('Test Validation price', () => {
        it('should return status code 400 when property price is empty', async () => {
            const res = await request(app)
                .post('/products')
                .send({
                    name: 'kokakola',
                    description: 'minuman soda',
                    image_url: file,
                    price: "",
                    stock: 4,
                    category: "sepatu"
                })
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill price')
        })

        it('should return status code 400 when property price less than 1000', async () => {
            const res = await request(app)
                .post('/products')
                .send({
                    name: 'kokakola',
                    description: 'minuman soda',
                    image_url: file,
                    price: 500,
                    stock: 4,
                    category: "sepatu"
                })
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('minimal price Rp.1000')
        })
    })

    describe('Test Validation stock', () => {
        it('should return status code 400 when property stock is empty', async () => {
            const res = await request(app)
                .post('/products')
                .send({
                    name: 'kokakola',
                    description: 'minuman soda',
                    image_url: file,
                    price: 28000,
                    stock: "",
                    category: "sepatu"
                })
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('please fill stock')
        })

        it('should return status code 400 when property stock less than 1', async () => {
            const res = await request(app)
                .post('/products')
                .send({
                    name: 'kokakola',
                    description: 'minuman soda',
                    image_url: file,
                    price: 28000,
                    stock: -2,
                    category: "sepatu"
                })
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('minimal stock 1')
        })
    })

    describe('Test /products/:id route', () => {
        it('should return product and status code 401', async () => {
            const res = await request(app)
                .put('/products/1')
                .send({
                    name: 'coca cola',
                    description: 'minuman soda',
                    image_url: file,
                    price: 28000,
                    stock: 2,
                    category: "sepatu"
                })
                .set({
                    token: tokenCustomer
                })
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('you are not admin')
        })

        it('should return products and status code 200', async () => {
            const res = await request(app)
                .put('/products/1')
                .attach('image_url', './tests/sepatu.jpg', 'sepatu.jpg')
                .field('name', 'coca cola')
                .field('description', 'minuman soda enak coy')
                .field('price', 3000)
                .field('stock', 4)
                .field('category', 'sepatu')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(1)
            expect(res.body).toHaveProperty('name')
            expect(res.body.name).toEqual('coca cola')
            expect(res.body).toHaveProperty('description')
            expect(res.body.description).toEqual('minuman soda enak coy')
            expect(res.body).toHaveProperty('image_url')
            expect(res.body).toHaveProperty('price')
            expect(res.body.price).toEqual(3000)
            expect(res.body).toHaveProperty('stock')
            expect(res.body.stock).toEqual(4)
            expect(res.body).toHaveProperty('category')
            expect(res.body.category).toEqual('sepatu')
        })

        it('should return products and status code 404', async () => {
            const res = await request(app)
                .put('/products/2')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Not found product')
        })

        it('should send an error with 401 status code because token undefined', async () => {
            const res = await request(app)
                .put('/products/1')
                .send({
                    name: 'coca cola',
                    description: 'minuman soda',
                    image_url: file,
                    price: 28000,
                    stock: 2,
                    category: "sepatu"
                })
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Unauthorized Invalid Token')
        })

        it('should send an error with 401 status code because invalid token', async () => {
            const res = await request(app)
                .put('/products/1')
                .send({
                    name: 'coca cola',
                    description: 'minuman soda',
                    image_url: file,
                    price: 28000,
                    stock: 2,
                    category: "sepatu"
                })
                .set({
                    token: invalidToken
                })
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Unauthorized Invalid Token')
        })
    })

    describe('Test /products/:id route', () => {
        it('should return product and status code 401', async () => {
            const res = await request(app)
                .delete('/products/1')
                .set({
                    token: tokenCustomer
                })
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('you are not admin')
        })

        it('should return products and status code 200', async () => {
            const res = await request(app)
                .delete('/products/1')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(1)
            expect(res.body).toHaveProperty('name')
            expect(res.body.name).toEqual('coca cola')
            expect(res.body).toHaveProperty('description')
            expect(res.body.description).toEqual('minuman soda enak coy')
            expect(res.body).toHaveProperty('image_url')
            expect(res.body).toHaveProperty('price')
            expect(res.body.price).toEqual(3000)
            expect(res.body).toHaveProperty('stock')
            expect(res.body.stock).toEqual(4)
            expect(res.body).toHaveProperty('category')
            expect(res.body.category).toEqual('sepatu')
        })

        it('should return products and status code 404', async () => {
            const res = await request(app)
                .delete('/products/2')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Not found product')
        })

        it('should send an error with 401 status code because token undefined', async () => {
            const res = await request(app)
                .delete('/products/1')
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Unauthorized Invalid Token')
        })

        it('should send an error with 401 status code because invalid token', async () => {
            const res = await request(app)
                .delete('/products/1')
                .set({
                    token: invalidToken
                })
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Unauthorized Invalid Token')
        })
    })
})