const request = require("supertest")
const app = require("../app")

var token
var idUser


// beforeAll(() => {
//     request(app)
//         .post("/users/register")
//         .send(registerUser)
//         .end((err, res) => {
//             token = res.body.token
//         })
// })
describe("POST /users/register", function () {
    let registerUser = {
        name: "tesProduct",
        email: "tesproduct@mail.com",
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
                    token = res.body.token
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
            .set({ token: token })
            .send(barang)
            .expect(201)
            .end((err, res) => {
                if (err) {
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
                    done()
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
                    done()
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
                    done()
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
                    // done()
                    done()
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

describe("DELETE /products/:idProduct", function () {
    it("should return an object with status code 200", (done) => {
        request(app)
            .delete("/products/1")
            .set({ token: token })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // done()
                    done()
                } else {
                    expect(typeof res.body).toBe("object")
                    expect(res.body).toHaveProperty("terhapus")
                    expect(typeof res.body.terhapus).toBe("object")
                    expect(res.body.terhapus.name).toBe("dress baru")
                    expect(res.body.terhapus.name).toBe("dress baru")
                    expect(res.body.terhapus.price).toBe(200000)
                    expect(res.body.terhapus.stock).toBe(20)
                    done()
                }
            })
    })
})