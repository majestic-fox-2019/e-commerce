const request = require("supertest");
const app = require("../app");

describe("register", function() {
    it("register", async () => {
        let objInput = {
            name: "purandra",
            email: "purandrar@gmail.com",
            password: "1234"
        };
        const res = await request(app)
            .post("/users/register")
            .send(objInput)
            .expect("content-type", /json/);
        expect(res.statusCode).toEqual(200);
    });
});

describe("login", function() {
    it("login", async () => {
        let objInput = {
            email: "purandrar@gmail.com",
            password: "1234"
        };
        const res = await request(app)
            .post("/users/login")
            .send(objInput)
            .expect("content-type", /json/);
        expect(res.statusCode).toEqual(200);
    });
});
