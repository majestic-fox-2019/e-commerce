const app       = require('../app');
const supertest = require('supertest');
const request   = supertest(app);
let token       = '';

describe('/products', () => {
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

            console.log(response.body);
            expect(response.status).toBe(201);
            done();
    });
});