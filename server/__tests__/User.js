const app       = require('../app');

const supertest = require('supertest');
const request   = supertest(app);

describe('/users', function() {
    it('POST /login', async done => {
        let reqBody = {
            email: "kodekite@gmail.com",
            password: "123"
        }
        const response = await request
            .post('/users/login')
            .send(reqBody)
      
        expect(response.status).toBe(200)
        expect(response.body.token).not.toBe(undefined);
        expect(response.body.email).toBe(reqBody.email);
        
        done()
    });
  });