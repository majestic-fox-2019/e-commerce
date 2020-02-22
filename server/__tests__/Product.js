const app       = require('../app');
const supertest = require('supertest');
const request   = supertest(app);
let token       = '';
const {compare} = require('../helpers/hash');

describe('/products', () => {
    it('POST /register to make sure data test already registered', async done => {
        let reqBody = {
            email: "kodekite@gmail.com",
            password: "123"
        }
        
        const response = await request
            .post('/users/register')
            .send(reqBody)

            expect([201, 400]).toContain(response.status);
            expect(response.body.email).toBe(reqBody.email);
            expect(compare(reqBody.password,response.body.password)).toBe(true);           
            
            done();
    });
    
    it('POST /login with exist account to getting token for get api testing', async done => {
        let reqBody = {
            email: "kodekite@gmail.com",
            password: "123"
        }
        const response = await request
            .post('/users/login')
            .send(reqBody)
      
            expect(response.status).toBe(200);
            expect(response.body.token).not.toBe(undefined);
            token = response.body.token;
            
            done();
    });

    it('GET / without token', async done => {
        const response = await request
            .get('/products')
            expect(response.status).toBe(401);
            done();
    });

    it('GET / with invalid token', async done => {
        const response = await request
            .get('/products')
            .set('accesstoken', 'claywashere')
            expect(response.status).toBe(401);
            done();
    });

    it('GET / with valid token', async done => {
        const response = await request
            .get('/products')
            .set('accesstoken', token)
            expect(response.status).toBe(200);
            done();
    });

    it('POST / with invalid token', async done => {
        const response = await request
            .post('/products')
            .set('accesstoken','cubluk')
            expect(response.status).toBe(401);
            done();
    });

    it('POST / with valid token and complete data needed', async done => {
        const response = await request
            .post('/products')
            .set('accesstoken', token)
            .send({
                name: 'Sapu lidi', 
                image_url: 'www.lidikuy.com', 
                price: 10000, 
                stock: 75
            });

            expect(response.status).toBe(201);
            done();
    });

    it('POST / with valid token and un-complete data needed', async done => {
        const response = await request
            .post('/products')
            .set('accesstoken', token)
            .send({
                name: '', 
                image_url: 'www.lidikuy.com', 
                price: 10000, 
                stock: 75
            });

            expect(response.status).toBe(400);
            done();
    });

    it('PUT / with invalid token', async done => {
        const response = await request
            .put('/products')
            .set('accesstoken','cubluk')
            expect(response.status).toBe(401);
            done();
    });

    it('PUT / with valid token and complete data needed', async done => {
        const response = await request
            .put('/products/1')
            .set('accesstoken', token)
            .send({
                name: 'Sapu lidi', 
                image_url: 'www.lidikuy.com', 
                price: 10000, 
                stock: 75
            });

            expect(response.status).toBe(200);
            done();
    });

    it('PUT /:id with valid token and un-complete data needed', async done => {
        const response = await request
            .put('/products/1')
            .set('accesstoken', token)
            .send({
                name: '', 
                image_url: 'www.lidikuy.com', 
                price: 10000, 
                stock: 75
            });

            expect(response.status).toBe(400);
            done();
    });

    it('DELETE / with invalid token', async done => {
        const response = await request
            .delete('/products')
            .set('accesstoken','cubluk')
            expect(response.status).toBe(401);
            done();
    });

    it('DELETE / with valid token', async done => {
        const response = await request
            .delete('/products/1')
            .set('accesstoken',token)
            expect(response.status).toBe(200);
            done();
    });
});