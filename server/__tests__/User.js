const app       = require('../app');

const supertest = require('supertest');
const request   = supertest(app);
const {compare} = require('../helpers/hash');

describe('/users', function() {
    it('POST /register', async done => {
        let reqBody = {
            email: "kodekite@gmail.com",
            password: "123"
        }
        const response = await request
            .post('/users/register')
            .send(reqBody)

            expect(response.status).toBe(201);
            expect(response.body.result.email).toBe(reqBody.email);
            expect(compare(reqBody.password,response.body.result.password)).toBe(true);           
            
            done();
    });

    it('POST /register fails with empty invalid email', async () => {
        let reqBody = {
            email: " asdsad ",
            password: "stop tipu tipu"
        }
        const response = await request
            .post('/users/register')
            .send(reqBody)

            expect(response.status).toBe(400);
    });

    it('POST /register fails with empty email', async () => {
        let reqBody = {
            email: "",
            password: "stop tipu tipu"
        }
        const response = await request
            .post('/users/register')
            .send(reqBody)

            expect(response.status).toBe(400);
    });

    it('POST /register success with empty password', async () => {
        let reqBody = {
            email: "mantul@gmail.com",
            password: ""
        }
        const response = await request
            .post('/users/register')
            .send(reqBody)

            expect(response.status).toBe(201);
    });
    
    it('POST /login with exist account', async done => {
        let reqBody = {
            email: "kodekite@gmail.com",
            password: "123"
        }
        const response = await request
            .post('/users/login')
            .send(reqBody)
      
            expect(response.status).toBe(200);
            expect(response.body.token).not.toBe(undefined);
            
            done();
    });

    it('POST /login with doesn\'n exists account', async done => {
        let reqBody = {
            email: "cubluk@gmail.com",
            password: "123"
        }
        const response = await request
            .post('/users/login')
            .send(reqBody)
      
            expect(response.status).toBe(404);
            expect(response.body.token).toBe(undefined);
            
            done();
    });

    it('POST /login with empty email', async done => {
        let reqBody = {
            email: "",
            password: "123"
        }
        const response = await request
            .post('/users/login')
            .send(reqBody)
      
            expect(response.status).toBe(404);
            expect(response.body.token).toBe(undefined);
            
            done();
    });
  });