const request = require('supertest');
const app = require('../app');

const { Product } = require('../models')

const jwt = require('../helpers/jwt')
let user = {
    email: "john@domain.com",
    password: "password"
}

let token = jwt.generateToken(user)

beforeAll(() => {
    Product
        .truncate({ restartIdentity: true })
        .then(res => {
            console.log('Table has been reset')
        })
        .catch(err => {
            console.log(err)
        })
});

let productInput = [
    [
        'Price and Stock are empty',
        {
            name: "Ruby",
            image_url: "https://portswigger.net/cms/images/f5/d7/61c1d398bde7-article-main.jpg",
            price: null,
            stock: null
        },
        {
            'price': "Please enter product price",
            'stock': "Please enter product stock",
        }
    ],
    [
        'Name and Stock are empty',
        {
            name: "",
            image_url: "https://portswigger.net/cms/images/f5/d7/61c1d398bde7-article-main.jpg",
            price: 25000,
            stock: null
        },
        {
            'name': "Please enter product name",
            'stock': "Please enter product stock"
        }
    ],
    [
        'Name and Price are empty',
        {
            name: "",
            image_url: "",
            price: null,
            stock: 12
        },
        {
            'name': "Please enter product name",
            'price': "Please enter product price",
        }
    ],
    [
        'Invalid Price and/or Stock less than zero',
        {
            name: "Ruby",
            image_url: "",
            price: 0,
            stock: -2
        },
        {
            'price': "Product price can't be zero or less",
            'stock': "Product stock can't be less than zero",
        }
    ],
    [
        'All fields are empty',
        {
            name: "",
            image_url: "",
            price: null,
            stock: null
        },
        {
            'name': "Please enter product name",
            'price': "Please enter product price",
            'stock': "Please enter product stock"
        }
    ],
]


describe("POST /", () => {
    describe('Success 201, Product created', () => {
        it(" should success and create new object of product", async () => {
            let product = {
                name: "Ruby",
                image_url: "https://portswigger.net/cms/images/f5/d7/61c1d398bde7-article-main.jpg",
                price: 150000,
                stock: 10
            }

            const res = await request(app)
                .post('/products/')
                .send(product)
                .set('token', token)
            expect(res.status).toBe(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).not.toStrictEqual({
                'name': expect.any(String),
                'image_url': expect.any(String),
                'price': expect.any(Number),
                'stock': expect.any(Number)
            })
        })
    })

    describe
        .each(productInput)('Error 400, Bad Request', (desc, input, expected) => {
            it(desc, async () => {
                const res = await request(app)
                    .post('/products/')
                    .send(input)
                    .set('token', token)
                expect(res.status).toBe(400)
                expect(res.body.errors).toEqual(expected)
            });
        })
})


describe("GET /", () => {
    describe('Success 200, List all products', () => {
        it(" should success and retrieve list of object of products", async () => {
            const res = await request(app)
                .get('/products/')
                .set('token', token)
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(Array.isArray(res.body)).toBe(true)
        })
    })

    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            const res = await request(app)
                .get('/products/')
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })
})

describe("GET /:id", () => {
    describe('Success 200, Fetch a product', () => {
        it(" should success and fetch a single product", async () => {
            let id = 1

            const res = await request(app)
                .get(`/products/${id}`)
                .set('token', token)
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
        })
    })

    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            let id = 1

            const res = await request(app)
                .get(`/products/${id}`)
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })

    describe('Error 404, Product not found', () => {
        it(" should error and failed to fetch specific product", async () => {
            let id = 90

            const res = await request(app)
                .get(`/products/${id}`)
                .set('token', token)
            expect(res.status).toBe(404)
            expect(res.body.errors).toEqual('Product not found')
        })
    })
})

describe("GET /find/:category", () => {
    describe('Success 200, Fetch a list of products filtered by category', () => {
        it(" should success and fetch an array of object of products", async () => {
            let filter = 'Role-Playing'

            const res = await request(app)
                .get(`/products/find/${filter}`)
                .set('token', token)
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(Array.isArray(res.body)).toEqual(true)
        })
    })

    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            let filter = 'Role-Playing'

            const res = await request(app)
                .get(`/products/find/${filter}`)
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })
})

describe("PUT /", () => {
    let product = {
        name: "Diamond",
        image_url: "https://vignette.wikia.nocookie.net/sealonline/images/0/03/Diamond.gif/revision/latest?cb=20160425223614",
        price: 300000,
        stock: 50
    }

    describe('Success 200, Product Updated', () => {
        it(" should success and retrieve updated product", async () => {
            let id = 1

            const res = await request(app)
                .put(`/products/${id}`)
                .send(product)
                .set('token', token)
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
        })
    })

    describe
        .each(productInput)('Error 400, Bad Request', (desc, input, expected) => {
            it(desc, async () => {
                let id = 1

                const res = await request(app)
                    .put(`/products/${id}`)
                    .send(input)
                    .set('token', token)
                expect(res.status).toBe(400)
                expect(res.body.errors).toEqual(expected)
            });
        })

    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            let id = 1

            const res = await request(app)
                .put(`/products/${id}`)
                .send(product)
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })

    describe('Error 404, Product not found', () => {
        it(" should error and failed to update specific product", async () => {
            let id = 90

            const res = await request(app)
                .put(`/products/${id}`)
                .send(product)
                .set('token', token)
            expect(res.status).toBe(404)
            expect(res.body.errors).toEqual('Product not found')
        })
    })
})

describe("DELETE /:id", () => {
    describe('Success 200, Product Deleted', () => {
        it(" should success and retrieve an object of deleted product", async () => {
            let id = 1

            const res = await request(app)
                .delete(`/products/${id}`)
                .set('token', token)
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
        })
    })

    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            let id = 1

            const res = await request(app)
                .delete(`/products/${id}`)
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })

    describe('Error 404, Product not found', () => {
        it(" should error and failed to delete specific product", async () => {
            let id = 90

            const res = await request(app)
                .delete(`/products/${id}`)
                .set('token', token)
            expect(res.status).toBe(404)
            expect(res.body.errors).toEqual('Product not found')
        })
    })
})