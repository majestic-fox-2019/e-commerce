// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//     expect(true).toBe(true)
//   })
// })

const request = require('supertest');
const app = require('../app');

describe("User", () => {
  describe("POST /users/register", () => {
    tst("should create user", async () => {
      const res = await request(app)
        .post("/users/register")
        .send({
          name: "Sulthon Abdul Malik",
          email: "sulthon.almalik@gmail.com",
          password: "secret"
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("access_token");
    });
  });
  describe("POST /users/login", () => {
    test("should login user", async () => {
      const res = await request(app)
        .post("/users/login")
        .send({
          email: "sulthon.almalik@gmail.com",
          password: "secret"
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("access_token");
    });
  });
});
