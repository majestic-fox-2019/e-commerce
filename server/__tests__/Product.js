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
const emptyParam = {
    name: '',
    price: 0,
    img_url: '',
    stock: 0,
    CategoryId: 0
}
const updateParam = {
    name: 'Kaos kaki Uni QLO',
    price: 25000,
    img_url: 'http://e-commerce.com/kaos-kaki.jpg',
    stock: 4,
    CategoryId: 2
}
const expResKey = ['id', 'name', 'price', 'img_url', 'stock', 'createdAt', 'updatedAt', 'CategoryId']

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
        req(app)
            .post('/products')
            .send(correctParam)
            .set('token', token)
            .expect(201)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('data')
                expect(res.body).toHaveProperty('message', 'Successfully added a product')
                expect(Object.keys(res.body.data)).toEqual(expect.arrayContaining(expResKey))
                done()
            })
    });

    it('should get list of all products', (done) => {
        req(app)
            .get('/products')
            .set('token', token)
            .expect(200)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('products')
                done()
            })
    });

    it('should get an error while add product but fields if empty', (done) => {
        req(app)
            .post('/products')
            .send(emptyParam)
            .set('token', token)
            .expect(400)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message')
                done()
            })
    });

    it('should update a product', (done) => {
        req(app)
            .put('/products/1')
            .send(updateParam)
            .set('token', token)
            .expect(200)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Successfully updated product')
                done()
            })
    });

    it('should get an error while updating product but ID is not found', (done) => {
        req(app)
            .put('/products/2')
            .send(updateParam)
            .set('token', token)
            .expect(404)
            .end((err, res) => {
                if(err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Product not found')
                done()
            })
    });

    it('should delete a product', (done) => {
        req(app)
            .delete('/products/1')
            .expect(200)
            .set('token', token)
            .end((err, res) => {
                if(err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Successfully deleted product')
                done()
            })
    });

    it('should get an error while deleting product but ID not found', (done) => {
        req(app)
            .delete('/products/1')
            .set('token', token)
            .expect(404)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message')
                done()
            })
    });
});