const request = require("supertest")
const app = require("../app")

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgxOTI5ODEzfQ.kweAGZEUj4za-OkZtqKid6jzMHDDbejLvpUHh3AJXoE"
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
                    console.log(err)
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
                    console.log(err)
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
                    console.log(err)
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
                    console.log(err)
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
                    console.log(err)
                } else {
                    expect(res.body).toBe("wrong email/password")
                    done()
                }
            })
    })
})
describe("POST /products", function () {
    let barang = {
        name: "dress",
        stock: 14,
        image_url: "lala.com",
        price: 200000,
        category: "Clothing",
        description: "masih bagus"
    }
    it("should return an object with status code 201", (done) => {
        request(app)
            .post("/products")
            .set({ token: token })
            .send(barang)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.body).toHaveProperty("category")
                    expect(res.body).toHaveProperty("image_url")
                    expect(res.body).toHaveProperty("name")
                    expect(res.body).toHaveProperty("description")
                    expect(res.body).toHaveProperty("stock")
                    expect(res.body).toHaveProperty("rating")
                    expect(res.body).toHaveProperty("UserId")
                    expect(res.body.category).toBe("Clothing")
                    expect(res.body.image_url).toBe("lala.com")
                    expect(res.body.name).toBe("dress")
                    expect(res.body.description).toBe("masih bagus")
                    expect(res.body.stock).toBe(14)
                    expect(res.body.price).toBe(200000)
                    done()
                }
            })
    })
    it("should return an object with status code 400 when token is not set", (done) => {
        request(app)
            .post("/products")
            .send(barang)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    done()
                } else {

                    done()
                }
            })
    })

})

describe("Get /products", function () {
    // let expectedArray = 
    it("should return an object with status code 200", (done) => {
        request(app)
            .get("/products")
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.body[0]).toHaveProperty("category")
                    expect(res.body[0]).toHaveProperty("name")
                    expect(res.body[0]).toHaveProperty("image_url")
                    expect(res.body[0]).toHaveProperty("description")
                    expect(res.body[0]).toHaveProperty("price")
                    done()
                }
            })
    })
})

describe("GET /products/mine", function () {
    it("should return an object with status code 200", (done) => {
        request(app)
            .get("/products/mine")
            .set({ token: token })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body[0]).toHaveProperty("category")
                    expect(res.body[0]).toHaveProperty("description")
                    expect(res.body[0]).toHaveProperty("name")
                    expect(res.body[0]).toHaveProperty("price")
                    expect(res.body[0]).toHaveProperty("stock")
                    done()
                }
            })
    })
})

describe("PUT /products/:idProduct", function () {
    let barangUpdate = {
        name: "dress baru",
        stock: 20,
        image_url: "lala.com",
        price: 200000,
        category: "Clothing",
        description: "masih bagus banget"
    }
    it("should return an object with status code 200", (done) => {
        request(app)
            .put("/products/1")
            .set({ token: token })
            .send(barangUpdate)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {

                    expect(typeof res.body).toBe("object")
                    expect(res.body[0]).toBe(1)
                    expect(typeof res.body[1]).toBe("object")
                    expect(res.body[1][0].name).toBe("dress baru")
                    expect(res.body[1][0].description).toBe("masih bagus banget")
                    expect(res.body[1][0].stock).toBe(20)
                    expect(res.body[1][0].name).toBe("dress baru")
                    done()
                }
            })
    })
})

// describe("DELETE /products/:idProduct", function () {
//     it("should return an object with status code 200", (done) => {
//         request(app)
//             .delete("/products/1")
//             .set({ token: token })
//             .expect(200)
//             .end((err, res) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     expect(typeof res.body).toBe("object")
//                     expect(res.body).toHaveProperty("terhapus")
//                     expect(typeof res.body.terhapus).toBe("object")
//                     expect(res.body.terhapus.name).toBe("dress baru")
//                     expect(res.body.terhapus.name).toBe("dress baru")
//                     expect(res.body.terhapus.price).toBe(200000)
//                     expect(res.body.terhapus.stock).toBe(20)
//                     done()
//                 }
//             })
//     })
// })
describe("POST /reviews/:idProduct", function () {
    it("should return an object with status code 201", (done) => {

        request(app)
            .post("/reviews/1")
            .set({ token: token })
            .send({
                rating: 3,
                review: "boleh lah"
            })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("ratingProductLast")
                    done()
                }
            })
    })
    it("should return an object with status code 401 if token is not set", (done) => {

        request(app)
            .post("/reviews/2")
            .send({
                rating: 3,
                review: "boleh lah"
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    done()
                } else {
                    done()
                }
            })
    })
})

describe("GET /reviews/:idProduct", function () {
    it("should return an object with status code 200", (done) => {
        request(app)
            .get("/reviews/1")
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    done()
                } else {
                    expect(typeof res.body).toBe("object")

                    done()
                }
            })
    })
})

describe("POST /carts/:idProduct", function () {
    it("should return an object with status code 201", (done) => {
        request(app)
            .post(`/carts/1`)
            .set({ token: token })
            .send({ qty: 2 })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("ProductId")
                    expect(res.body).toHaveProperty("qty")
                    expect(res.body).toHaveProperty("UserId")
                    expect(res.body).toHaveProperty("status")
                    expect(res.body).toHaveProperty("totalPrice")
                    expect(res.body.qty).toBe(2)
                    expect(res.body.status).toBe("unpaid")
                    expect(res.body.totalPrice).toBe(400000)

                    done()
                }
            })

    })
})

describe("GET /carts/mine", function () {
    it("should return an object with status code 200", (done) => {
        request(app)
            .get("/carts/mine")
            .set({ token: token })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    done()

                } else {
                    expect(typeof res.body).toBe("object")
                    done()
                }
            })
    })
})

describe("PUT /carts/:idCart", function () {
    it("should return an object with status code 200", (done) => {
        request(app)
            .put("/carts/1")
            .set({ token: token })
            .send({
                qty: 1
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done()

                } else {
                    done()
                }
            })
    })
})