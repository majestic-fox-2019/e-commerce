const request = require("supertest")
const app = require("../app")

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgxOTI5ODEzfQ.kweAGZEUj4za-OkZtqKid6jzMHDDbejLvpUHh3AJXoE



var token
describe("POST /users/register", function () {
    let registerUser = {
        name: "Amel",
        email: "amel@mail.com",
        password: "secret",
        role: "user",
    }
    it("should responds with status code 201 and return token", (done) => {
        request(app)
            .post("/users/register")
            .send(registerUser)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    done()
                } else {
                    expect(res.body).toHaveProperty("userRegistered")
                    expect(res.body).toHaveProperty("token")
                    expect(res.body.userRegistered).toHaveProperty("email")
                    expect(res.body.userRegistered).toHaveProperty("name")
                    expect(res.body.userRegistered).toHaveProperty("role")
                    expect(res.body.userRegistered.email).toBe("amel@mail.com")
                    expect(res.body.userRegistered.name).toBe("Amel")
                    expect(res.body.userRegistered.role).toBe("user")
                    done()
                }
            })
    })

    it("should return error with status code 400 when user register with same email", (done) => {
        request(app)
            .post("/users/register")
            .send(registerUser)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    //done()
                    done()
                } else {
                    // expect(res.body).toHaveProperty("message")
                    expect(res.body).toBe("email already registered")
                    done()
                }
            })
    })

    it("shoul return error with status code 400 when user register with null datas", (done) => {
        request(app)
            .post("/users/register")
            .send({
                name: "kucing",
                email: "",
                password: "",
                role: ""
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    // console.log(err)
                    done()
                } else {
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message[0]).toBe("password should not be empty")
                    expect(res.body.message[1]).toBe("Email is invalid")
                    expect(res.body.message[2]).toBe("email should not be empty")
                    done()
                }
            })
    })
})

describe("POST /users/login", function () {
    let userLogin = {
        email: "amel@mail.com",
        password: "secret"
    }
    it("should return an object contains token with status code 200", (done) => {
        request(app)
            .post("/users/login")
            .send(userLogin)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done()
                } else {
                    expect(res.body).toHaveProperty("token")
                    expect(res.body).toHaveProperty("userLoginFound")
                    expect(res.body.userLoginFound).toHaveProperty("email")
                    expect(res.body.userLoginFound).toHaveProperty("role")
                    expect(res.body.userLoginFound).toHaveProperty("name")
                    expect(res.body.userLoginFound.email).toBe("amel@mail.com")
                    expect(res.body.userLoginFound.role).toBe("user")
                    expect(res.body.userLoginFound.name).toBe("Amel")
                    token = res.body.token
                    done()
                }
            })
    })

    it("should return an error with status code 400 when user input wrong password", (done) => {
        request(app)
            .post("/users/login")
            .send({
                email: "amel@mail.com",
                password: "salah"
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done()
                } else {
                    expect(res.body).toBe("wrong email/password")
                    done()
                }
            })
    })
    it("should return an error with status code 400 when user input non-existant email", (done) => {
        request(app)
            .post("/users/login")
            .send({
                email: "gaada@mail.com",
                password: "secret"
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done()
                } else {
                    expect(res.body).toBe("wrong email/password")
                    done()
                }
            })
    })
})

describe('GET /users', function () {
    it('responds with json', function () {
        request(app)
            .get('/users')
            .end(function (err, res) {
                if (err) {
                    throw err
                } else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty("name")
                    expect(res.body).toHaveProperty("role")
                    expect(res.body).toHaveProperty("email")
                    expect(res.body.email).toBe("admin@mail.com")
                }
            })
    });
});
