const app = require('../app')
const req = require('supertest')

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTgyNDE0NTIyfQ.O7doZXDpCgp7mx51PbYG99llvomaIcajsGMIgMwWNyc'

const correctParam = {
    name: 'Kaos Uni QLO',
    price: 50000,
    img_url: 'http://e-commerce.com/kaos.jpg',
    stock: 5,
    CategoryId: 1
}

describe('Product test scenario', () => {
    it('should get an error while make request without headers token', (done) => {
        req(app)
            .get('/products')
            .expect(406)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'jwt must be provided')
                done()
            })
    });

    it('should get empty list of Products', (done) => {
        req(app)
            .get('/products')
            .set('token', token)
            .expect(404)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'No product available yet')
                done()
            })
    });

    it('should create a product', (done) => {
        const expResKey = ['id', 'name', 'price', 'img_url', 'stock', 'createdAt', 'updatedAt', 'CategoryId']
        req(app)
            .post('/products')
            .send(correctParam)
            .set('token', token)
            .expect(201)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(Object.keys(res.body)).toEqual(expect.arrayContaining(expResKey))
                done()
            })
    });
});