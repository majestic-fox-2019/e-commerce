const app = require("../app");
const request = require("supertest");
// const request = supertest(app);
const obj = {
  email: "marcelus@gmail.com",
  password: "12345",
  admin: false
};

let token = null;

//USER CHECK
describe("User Register", () => {
  //REGISTER
  it("should create a new post", done => {
    request(app)
      .post("/register")
      .send(obj)
      .expect(201)
      .end(function(err, res) {
        console.log(err, "ini eror");

        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("email");
        expect(res.body).toHaveProperty("password");
        done();
      });
  });
  //LOGIN
  it("User Login", done => {
    let { email, password } = obj;
    request(app)
      .post("/login")
      .send({
        email,
        password
      })
      .end((err, res) => {
        // console.log(res.body, "ini password");
        // expect(res.body).toHaveProperty("email");
        // expect(res.body).toHaveProperty("password");
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
        done();
      });
  });
});

const objproduk = [
  {
    name: "bangku taman",
    image_url: "apalaha.co.id",
    price: 200000,
    stock: 100
  },
  {
    name: "bohlam pijar",
    image_url: "osrammm@yahoo.com",
    price: 15000,
    stock: 50
  }
];

//PRODUCT CHECK
describe("Product CRUD", () => {
  //add product
  it("Should Create a new product", async () => {
    // let { name, image_url, price, stock } = obj;
    const res = await request(app)
      .post("/products")
      .set("token", token)
      .send(objproduk);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("image_url");
    expect(res.body).toHaveProperty("price");
    expect(res.body).toHaveProperty("stock");
  });

  it("Should Read all of the products", async () => {
    const res = await request(app)
      .get("/products")
      .set("token", token);
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Should Find the product ", async () => {
    const res = await request(app)
      .get("/products/1")
      .set("token", token);
    // console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("name");
  });

  it("Should edit the product", async () => {
    const res = await request(app)
      .put("/products/1")
      .set("token", token)
      .send({
        name: "ketoprak humor",
        price: 50000,
        stock: 23
      });
    // console.log(res, "INI RES BODY");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("price");
    expect(res.body).toHaveProperty("stock");
  });

  it("Should delete the product", async () => {
    const res = await request(app)
      .delete("/products/1")
      .set("token", token);
    console.log(res.body);
    expect(res.body);
  });
});
