const req = require('supertest')
const app = require('../app')

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTgyNDE0NTIyfQ.O7doZXDpCgp7mx51PbYG99llvomaIcajsGMIgMwWNyc'
const emptyParam = {
    name: ''
}

const correctParam = {
    name: 'Clothes'
}

describe('Category test scenario', () => {
    it('should get empty list category', (done) => {
        req(app)
            .get('/categories')
            .set('token', token)
            .expect(200)
            .end((err, res) => {
                if (err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'No category available yet')
                done()
            })
    });

    it('should get an error while create a category but params is empty', (done) => {
        req(app)
            .post('/categories')
            .send(emptyParam)
            .set('token', token)
            .expect(400)
            .end((err, res) => {
                if(err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('message', 'Category name cannot be empty')
                done()
            })
    });

    it('should create a category', (done) => {
        const expResKey = ['id', 'name', 'createdAt', 'updatedAt']
        req(app)
            .post('/categories')
            .set('token', token)
            .send(correctParam)
            .expect(201)
            .end((err, res) => {
                if(err) throw done(err)
                expect(res.body).toBeDefined()
                expect(res.body).toHaveProperty('data')
                expect(Object.keys(res.body.data)).toEqual(expect.arrayContaining(expResKey))
                expect(res.body).toHaveProperty('message', 'Successfully add a category')
                done()
            })
    });
});