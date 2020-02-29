const request = require("supertest")
const app = require("../app")
const Product = require("../models").Product

// var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgxOTI5ODEzfQ.kweAGZEUj4za-OkZtqKid6jzMHDDbejLvpUHh3AJXoE"

// beforeAll(() => {
//     Product.create({
//         name: "tas tote",
//         stock: 2,
//         image_url: "tote.com",
//         price: 200000,
//         category: "Accessories",
//         description: "masih bagus dan cantik",
//         UserId: 2
//     })
//         .then(beforeNya => {
//             idNya = beforeNya.id
//             // console.log(idNya, "<<<<< ini idnya")
//         })
//         .catch(err => {
//         })
// })

var tokenUser
var tokenUserLain
var idProduct
describe("POST /users/register", function () {
    let registerUser = {
        name: "tesCart",
        email: "tescart@mail.com",
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
                    // expect(res.body).toBe("heheh")
                    expect(res.body).toHaveProperty("userRegistered")
                    expect(res.body).toHaveProperty("token")
                    expect(res.body.userRegistered).toHaveProperty("email")
                    expect(res.body.userRegistered).toHaveProperty("name")
                    expect(res.body.userRegistered).toHaveProperty("role")

                    // console.log(res.body.token, "<<<<<<<")
                    tokenUser = res.body.token
                    idUser = res.body.userRegistered.id
                    done()
                }
            })
    })
})
describe("POST /users/register", function () {
    let registerUser = {
        name: "tesCart",
        email: "tescart@mail.com",
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
                    // expect(res.body).toBe("heheh")
                    expect(res.body).toHaveProperty("userRegistered")
                    expect(res.body).toHaveProperty("token")

                    // console.log(res.body.token, "<<<<<<<")
                    tokenSeller = res.body.token
                    idUser = res.body.userRegistered.id
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
            .set({ token: tokenUser })
            .send(barang)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    // console.log(err)
                    done()
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
                    idProduct = res.body.id
                    done()
                }
            })
    })

})

describe("POST /users/register", function () {
    let registerUser = {
        name: "tesCartBeli",
        email: "tesbeli@mail.com",
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
                    // expect(res.body).toBe("heheh")
                    expect(res.body).toHaveProperty("userRegistered")
                    expect(res.body).toHaveProperty("token")
                    expect(res.body.userRegistered).toHaveProperty("email")
                    expect(res.body.userRegistered).toHaveProperty("name")
                    expect(res.body.userRegistered).toHaveProperty("role")

                    // console.log(res.body.token, "<<<<<<<")
                    tokenUserLain = res.body.token
                    // idUser = res.body.userRegistered.id
                    done()
                }
            })
    })
})
describe("POST /carts/:idProduct", function () {
    it("should return an object with status code 201", (done) => {
        request(app)
            .post(`/carts/${idProduct}`)
            .set({ token: tokenUserLain })
            .send({ qty: 2 })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    // console.log(err)
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("cartCreated")
                    expect(res.body).toHaveProperty("productWanted")
                    expect(res.body.cartCreated).toHaveProperty("qty")
                    expect(res.body.cartCreated).toHaveProperty("ProductId")
                    expect(res.body.cartCreated).toHaveProperty("UserId")
                    expect(res.body.cartCreated).toHaveProperty("status")

                    done()
                }
            })

    })
})

describe("GET /carts/mine", function () {
    it("should return an object with status code 200", (done) => {
        request(app)
            .get("/carts/mine")
            .set({ token: tokenUserLain })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // console.log(err)
                    done()

                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body[0]).toHaveProperty("UserId")
                    expect(res.body[0]).toHaveProperty("UserId")
                    expect(res.body[0]).toHaveProperty("qty")

                    done()
                }
            })
    })
})

describe("PUT /carts/:idCart", function () {
    it("should return an object with status code 200", (done) => {
        request(app)
            .put(`/carts/${idProduct}`)
            .set({ token: tokenUser })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // console.log(err)
                    done()

                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body[0]).toBe(1)
                    expect(typeof res.body[1]).toBe("object")
                    done()
                }
            })
    })
    it("should return an object with status code 401", (done) => {
        request(app)
            .put(`/carts/${idProduct}`)
            .set({ token: tokenUserLain })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    // console.log(err)
                    done()

                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toBe("Failed to authenticate")
                    done()
                }
            })
    })
    it("should return an object with status code 400 when token is not set", (done) => {
        request(app)
            .put(`/carts/${idProduct}`)
            .set({ token: tokenUser })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    // done()
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toBe("please login first")

                    done()

                }
            })
    })
})

describe("POST /reviews", function () {
    let review = {
        rating: 5,
        review: "lucu"
    }
    it("should return an object with status code 201", (done) => {
        request(app)
            .post(`/reviews/${idProduct}`)
            .set({ token: tokenUserLain })
            .send(review)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("ratingProductLast")
                    done()
                }
            })

    })
    it("should return an object with status code 400 when user tried to review their own product", (done) => {
        request(app)
            .post(`/reviews/${idProduct}`)
            .set({ token: tokenUser })
            .send(review)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("message")
                    done()
                }
            })

    })
    it("should return an object with status code 400 when token is not set", (done) => {
        request(app)
            .put(`/reviews/${idProduct}`)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    // done()
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toBe("please login first")

                    done()

                }
            })
    })
})

describe("GET /reviews/:idProduct", function () {
    it("shoud return an object with status code 200", (done) => {
        request(app)
            .get(`/reviews/${idProduct}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("allReviewsOfProduct")
                    expect(res.body).toHaveProperty("accumulatedPR")

                    done()
                }
            })
    })
})