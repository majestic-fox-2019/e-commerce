const request = require('supertest');
const app = require('../app');

const { Category } = require('../models')

const jwt = require('../helpers/jwt')
let user = {
    email: "john@domain.com",
    password: "password"
}

let token = jwt.generateToken(user)

beforeAll(() => {
    Category
        .truncate({ restartIdentity: true })
        .then(res => {
            console.log('Table has been reset')
        })
        .catch(err => {
            console.log(err)
        })
});

let categoryInput = [
    [
        'Name input is empty',
        {
            name: "",
            image_url: "",
        },
        {
            'name': "Please enter category name",
        }
    ],
    [
        'Category name already exist',
        {
            name: "Role-Playing",
            image_url: "",
        },
        'Category Role-Playing already exist'
    ]
]

describe("POST /", () => {
    let category = {
        name: "Role-Playing",
        image_url: "https://portswigger.net/cms/images/f5/d7/61c1d398bde7-article-main.jpg",
    }

    describe('Success 201, Category created', () => {
        it(" should success and create new category", async () => {
            const res = await request(app)
                .post('/categories')
                .send(category)
                .set('token', token)
            expect(res.status).toBe(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).not.toStrictEqual({
                'name': expect.any(String),
                'image': expect.any(String),
            })
        })
    })

    describe
        .each(categoryInput)('Error 400, Bad Request', (desc, input, expected) => {
            it(desc, async () => {
                const res = await request(app)
                    .post('/categories')
                    .send(input)
                    .set('token', token)
                expect(res.status).toBe(400)
                expect(res.body.errors).toEqual(expected)
            });
        })

    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            const res = await request(app)
                .post('/categories')
                .send(category)
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })
})

describe("GET /", () => {
    describe('Success 200, List all categories', () => {
        it(" should success and retrieve list of object of categories", async () => {
            const res = await request(app)
                .get('/categories/')
                .set('token', token)
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
            expect(Array.isArray(res.body)).toBe(true)
        })
    })

    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            const res = await request(app)
                .get('/categories/')
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })
})

describe("PUT /", () => {
    let category = {
        name: "Role-Playing",
        image_url: "https://portswigger.net/cms/images/f5/d7/61c1d398bde7-article-main.jpg",
    }


    describe('Success 200, Category updated', () => {
        it(" should success and retrieve updated product", async () => {
            let id = 1

            const res = await request(app)
                .put(`/categories/${id}`)
                .send(category)
                .set('token', token)
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
        })
    })

    describe('Error 400, Validation Error', () => {
        it(" should error with description validation error", async () => {
            let id = 1

            category = {
                name: "",
                image_url: "",
            }

            const res = await request(app)
                .put(`/categories/${id}`)
                .send(category)
                .set('token', token)
            expect(res.status).toBe(400)
            expect(res.body.errors.name).toEqual('Please enter category name')
        })
    })


    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            let id = 1

            const res = await request(app)
                .put(`/categories/${id}`)
                .send(category)
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })

    describe('Error 404, Category not found', () => {
        it(" should error and failed to update specific category", async () => {
            let id = 90

            const res = await request(app)
                .put(`/categories/${id}`)
                .send(category)
                .set('token', token)
            expect(res.status).toBe(404)
            expect(res.body.errors).toEqual('Category not found')
        })
    })
})

describe("DELETE /:id", () => {
    describe('Success 200, Category Deleted', () => {
        it(" should success and retrieve an object of deleted category", async () => {
            let id = 1

            const res = await request(app)
                .delete(`/categories/${id}`)
                .set('token', token)
            expect(res.status).toBe(200)
            expect(typeof res.body).toEqual('object')
        })
    })

    describe('Error 401, Invalid Token', () => {
        it(" should error with description invalid token", async () => {
            let id = 1

            const res = await request(app)
                .delete(`/categories/${id}`)
            expect(res.status).toBe(401)
            expect(res.body.errors).toEqual('Invalid Token')
        })
    })

    describe('Error 404, Category not found', () => {
        it(" should error and failed to delete specific category", async () => {
            let id = 90

            const res = await request(app)
                .delete(`/categories/${id}`)
                .set('token', token)
            expect(res.status).toBe(404)
            expect(res.body.errors).toEqual('Category not found')
        })
    })
})