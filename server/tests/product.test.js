const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const user = {
    name: "purandra",
    email: "purandrar@gmail.com",
    password: "1234"
};
const token = jwt.sign({ name: user.name, email: user.email }, "wiesoo");

describe("get all article", function() {
    it("respond with json", async () => {
        const res = await request(app)
            .get("/products")
            .set("token", token)
            .expect("content-type", /json/);
        expect(res.statusCode).toEqual(200);
    });
});

describe("add an article to server", function() {
    it("respond with message", async () => {
        let objInput = {
            name: "purandra",
            img_url: "www.makandonut.com",
            price: "20",
            stock: -1
        };
        const res = await request(app)
            .post("/products")
            .send(objInput)
            .expect("content-type", /json/);
        expect(res.statusCode).not.toEqual(201);
    });
});

describe("add an article to server", function() {
    it("respond with message", async () => {
        let objInput = {
            name: "purandra",
            img_url: "www.makandonut.com",
            price: "20",
            stock: 2
        };
        const res = await request(app)
            .post("/products")
            .set("token", token)
            .send(objInput)
            .expect("content-type", /json/);
        expect(res.statusCode).toEqual(201);
    });
});

describe("update an article", function() {
    it("respond with message and show all article", async () => {
        let objInput = {
            name: "purandrar",
            img_url: "www.makandonut.com",
            price: "20",
            stock: 20
        };
        const res = await request(app)
            .put("/products/1")
            .set("token", token)
            .send({ objInput, token: token })
            .expect("content-type", /json/);
        expect(res.statusCode).toEqual(200);
    });
});

describe("delete an article from server", function() {
    it("respond with message", async () => {
        const res = await request(app)
            .delete("/products/1")
            .set("token", token)
            .expect(200)
            .expect("content-type", /json/);
        expect(res.statusCode).toEqual(200);
    });
});
