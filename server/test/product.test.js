const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbWFzQG1haWwuY29tIiwiaWQiOjEsImlhdCI6MTU4MTk0NTg0Mn0.naopkrOUBjN02MoPZZC5blGoNPjsDFDQSZdIZoWGRd8"




const request = require('supertest')
const app = require('../app')

describe('POST /products', function () {
  it('responds with json', function (done) {
    let dataBarang = {
      name: 'Mainan',
      image_url: 'https/image.com',
      price: 150000,
      stock: 10
    }
    request(app)
      .post('/products')
      .send(dataBarang)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          done()
        }
      })
  });
});

describe('GET /products', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          done()
        }
      })
  });
});

describe('PUT /products/1', function () {
  it('responds with json', function (done) {
    let dataBarang = {
      name: 'Mainan anak laki',
      image_url: 'https/image1.com',
      price: 200000,
      stock: 10
    }
    request(app)
      .put('/products/1')
      .send(dataBarang)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          done()
        }
      })
  });
});

describe('DELETE /products/1', function () {
  it('responds with json', function (done) {
    request(app)
      .delete('/products/1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          done()
        }
      })
  });
});
