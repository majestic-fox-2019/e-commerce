const app       = require('../app');

const supertest = require('supertest');
const request   = supertest(app);
const {compare}    = require('../helpers/hash');

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
            expect(response.body.email).toBe(reqBody.email);
            expect(compare(reqBody.password,response.body.password)).toBe(true);           
            
            done();
    });
    
    // it('POST /login', async done => {
    //     let reqBody = {
    //         email: "kodekite@gmail.com",
    //         password: "123"
    //     }
    //     const response = await request
    //         .post('/users/login')
    //         .send(reqBody)
      
    //         expect(response.status).toBe(200);
    //         expect(response.body.token).not.toBe(undefined);
    //         expect(response.body.email).toBe(reqBody.email);
            
    //         done();
    // });


  });