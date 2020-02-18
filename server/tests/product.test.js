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

describe("POST /products/addProduct", () => {
    describe('Success 201, Product created', () => {
        it(" should success and create new object of product", async () => {
            let product = {
                name: "Ruby",
                image_url: "https://portswigger.net/cms/images/f5/d7/61c1d398bde7-article-main.jpg",
                price: 150000,
                stock: 10
            }

            const res = await request(app)
                .post('/products/addProduct')
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

    describe('Error 201, Product created', () => {
        it(" should success and create new object of product", async () => {
            let product = {
                name: "Ruby",
                image_url: "https://portswigger.net/cms/images/f5/d7/61c1d398bde7-article-main.jpg",
                price: 150000,
                stock: 10
            }

            const res = await request(app)
                .post('/products/addProduct')
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
})
