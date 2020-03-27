const app = require("../app");
const request = require("supertest");

describe("Register an User", function() {
  it("Should register an user", function(done) {
    let user = {
      email: "coba@mail.com",
      password: "coba123",
      username: "coba"
    };
    request(app)
      .post("/user/register")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(201);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe("Register an User", function() {
  it("Should not register an user when email is empty", function(done) {
    let user = {
      email: "",
      password: "coba123",
      username: "coba"
    };
    request(app)
      .post("/user/register")
      .send(user)
      .then(res => {
        expect(res.statusCode).not.toEqual(201);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe("Register an User", function() {
  it("Should not register an user when password is empty", function(done) {
    let user = {
      email: "coba@mail.com",
      password: "",
      username: "coba"
    };
    request(app)
      .post("/user/register")
      .send(user)
      .then(res => {
        expect(res.statusCode).not.toEqual(201);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe("Register an User", function() {
  it("Should not register an user when username is empty", function(done) {
    let user = {
      email: "coba@mail.com",
      password: "1234",
      username: ""
    };
    request(app)
      .post("/user/register")
      .send(user)
      .then(res => {
        expect(res.statusCode).not.toEqual(201);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe("Login an User", function() {
  it("Should login an user", function(done) {
    let user = { email: "coba@mail.com", password: "coba123" };
    request(app)
      .post("/user/login")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(201);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe("Login an User", function() {
  it("Should not Login an user when password null", function(done) {
    let user = { email: "coba@mail.com", password: "" };
    request(app)
      .post("/user/login")
      .send(user)
      .then(res => {
        expect(res.statusCode).not.toEqual(201);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe("Login an User", function() {
  it("Should login an user when password is wrong", function(done) {
    let user = { email: "coba@mail.com", password: "coba1234" };
    request(app)
      .post("/user/login")
      .send(user)
      .then(res => {
        expect(res.statusCode).not.toEqual(201);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});

describe("Login an User", function() {
  it("Should login an user when email is wrong", function(done) {
    let user = { email: "cobaaa@mail.com", password: "coba123" };
    request(app)
      .post("/user/login")
      .send(user)
      .then(res => {
        expect(res.statusCode).not.toEqual(201);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});
