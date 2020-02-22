const request = require('supertest');
const app = require('../app')
let Bearer;

describe('POST /admin/register', () => {
  it('POST register user api calls', async () => {
    let objUser = {
      name: "Muhammad Anova",
      email: "anova@gmail.com",
      password: "asdqweasd",
      role: "superadmin"
    }
    const res = await request(app)
                      .post('/admin/register')
                      .send(objUser)
    expect(res.status).toEqual(201)
  })
  it('POST register user api calls', async () => {
    let objUser = {
      name: "Muhammad Anova Nurfaqih",
      email: "anovanur@gmail.com",
      password: "asdqweasd",
      role: "admin"
    }
    const res = await request(app)
                      .post('/admin/register')
                      .send(objUser)
    expect(res.status).toEqual(201)
  })
  it('POST register validation form not empty', async () => {
    let objUser = {
      name: "",
      email: "",
      password: "",
      role: ""
    }
    const res = await request(app)
                      .post('/admin/register')
                      .send(objUser)
    expect(res.status).toEqual(400)
  })
})

describe('POST /admin/login', () => {
  it('POST login api calls', async () => {
    let objUser = {
      email: "anova@gmail.com",
      password: "asdqweasd",
    }
    const res = await request(app)
                      .post('/admin/login')
                      .send(objUser)
    expect(res.status).toEqual(200)
    Bearer = res.body.payload.Token
  });
  it('POST login validation form not empty', async () => {
    let objUser = {
      email: "",
      password: "",
    }
    const res = await request(app)
                      .post('/admin/login')
                      .send(objUser)
    expect(res.status).toEqual(400)
  })
});

describe('GET /admin/users', () => {
  it('GET all users api calls', async () => {
    const res = await request(app)
                      .get('/admin/users')
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  });
  it('GET all users validation bearer api call', async () => {
    const res = await request(app)
                      .get('/admin/users')
    expect(res.status).toEqual(402)
  })
});

describe('GET /admin/user/:id', () => {
  it('GET detail user api call', async () => {
    const res = await request(app)
                      .get('/admin/user/1')
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
  it('GET detail user validation bearer api call', async () => {
    const res = await request(app)
                      .get('/admin/user/1')
    expect(res.status).toEqual(402)
  })
})

describe('PUT /admin/user/:id', () => {
  it('PUT user api call', async () => {
    let updateUser = {
      name: "Muhammad Anova Nurfaqih",
      email: "anova@gmail.com",
      role: "superadmin"
    }
    const res = await request(app)
                      .put('/admin/user/1')
                      .send(updateUser)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
  it('PUT user validation bearer api call', async () => {
    let updateUser = {
      name: "Muhammad Anova Nurfaqih",
      email: "anova@gmail.com",
      role: "superadmin"
    }
    const res = await request(app)
                      .put('/admin/user/1')
                      .send(updateUser)
    expect(res.status).toEqual(402)
  })
  it('PUT user validation form api call', async () => {
    let updateUser = {
      name: "",
      email: "",
      role: ""
    }
    const res = await request(app)
                      .put('/admin/user/1')
                      .send(updateUser)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(400)
  })
})

describe('DELETE /admin/user/:id', () => {
  it('DELETE user validation bearer', async () => {
    const res = await request(app)
                      .delete('/admin/user/2')
                      .send({})
    expect(res.status).toEqual(402)
  })
  it('DELETE user api call', async () => {
    const res = await request(app)
                      .delete('/admin/user/2')
                      .send({})
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)        
  })
})

describe('GET /admin/categories', () => {
  it('GET categories api call', async () => {
    const res = await request(app)
                      .get('/admin/categories')
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
  it('GET categories validation bearer api call', async () => {
    const res = await request(app)
                      .get('/admin/categories')
    expect(res.status).toEqual(402)
  })
})

describe('POST /admin/category', () => {
  it('POST category api call', async () => {
    let objCategory = {
      name: "gadget"
    }
    const res = await request(app)
                      .post('/admin/category')
                      .send(objCategory)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(201)
  })
  it('POST category api call', async () => {
    let objCategory = {
      name: "electronic"
    }
    const res = await request(app)
                      .post('/admin/category')
                      .send(objCategory)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(201)
  })
  it('POST category validation bearer api call', async () => {
    let objCategory = {
      name: "gadget"
    }
    const res = await request(app)
                      .post('/admin/category')
                      .send(objCategory)
    expect(res.status).toEqual(402)
  })
  it('POST category validation form api call', async () => {
    let objCategory = {
      name: ""
    }
    const res = await request(app)
                      .post('/admin/category')
                      .send(objCategory)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(400)
  })
})

describe('GET /admin/category/:id', () => {
  it('GET category by id api call', async () => {
    const res = await request(app)
                      .get('/admin/category/1')
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
  it('GET category by id validation api call', async () => {
    const res = await request(app)
                      .get('/admin/category/1')
    expect(res.status).toEqual(402)
  })
})

describe('PUT /admin/category/:id', () => {
  it('PUT category by id api call', async () => {
    let updateCategory = {
      name: "furniture"
    }
    const res = await request(app)
                      .put('/admin/category/2')
                      .send(updateCategory)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
  it('PUT category by id validation bearer api call', async () => {
    let updateCategory = {
      name: "furniture"
    }
    const res = await request(app)
                      .put('/admin/category/2')
                      .send(updateCategory)
    expect(res.status).toEqual(402)
  })
  it('PUT category by id validation form api call', async () => {
    let updateCategory = {
      name: ""
    }
    const res = await request(app)
                      .put('/admin/category/2')
                      .send(updateCategory)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(400)
  })
})

describe('DELETE /admin/category/:id', () => {
  it('DELETE category validation bearer api call', async () => {
    const res = await request(app)
                      .delete('/admin/category/2')
    expect(res.status).toEqual(402)
  })
  it('DELETE category by id api call', async () => {
    const res = await request(app)
                      .delete('/admin/category/2')
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
})

describe('GET /admin/products', () => {
  it('GET products api call', async () => {
    const res = await request(app)
                      .get('/admin/products')
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
  it('GET products validation bearer api call', async () => {
    const res = await request(app)
                      .get('/admin/products')
    expect(res.status).toEqual(402)
  })
})

describe('POST /admin/product', () => {
  it('POST product api call', async () => {
    let objProduct = {
      name: "Mackbook Pro 2020",
      image_url: "https://cdn.mos.cms.futurecdn.net/6xWkh7NfmxVqoT8YMtLGB3.jpg",
      price: 45000000,
      stock: 10,
      categoryId: 1
    }
    const res = await request(app)
                      .post('/admin/product')
                      .send(objProduct)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(201)
  })
  it('POST product validation bearer api call', async () => {
    let objProduct = {
      name: "Mackbook Pro 2020",
      image_url: "https://cdn.mos.cms.futurecdn.net/6xWkh7NfmxVqoT8YMtLGB3.jpg",
      price: 45000000,
      stock: 10,
      categoryId: 1
    }
    const res = await request(app)
                      .post('/admin/product')
                      .send(objProduct)
    expect(res.status).toEqual(402)
  })
  it('POST product validation form api call', async () => {
    let objProduct = {
      name: "",
      image_url: "",
      price: null,
      stock: null,
      categoryId: null
    }
    const res = await request(app)
                      .post('/admin/product')
                      .send(objProduct)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(400)
  })
})

describe('GET /admin/product/:id', () => {
  it('GET product by id api call', async () => {
    const res = await request(app)
                      .get('/admin/product/1')
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
  it('GET product by id validation api call', async () => {
    const res = await request(app)
                      .get('/admin/product/1')
    expect(res.status).toEqual(402)
  })
})

describe('PUT /admin/product/:id', () => {
  it('PUT product by id api call', async () => {
    let updateProduct = {
      name: "Macbook Air 2020",
      image_url: "https://cdn.mos.cms.futurecdn.net/6xWkh7NfmxVqoT8YMtLGB3.jpg",
      price: 23000000,
      stock: 15,
      categoryId: 1
    }
    const res = await request(app)
                      .put('/admin/product/1')
                      .send(updateProduct)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
  it('PUT product by id validation bearer api call', async () => {
    let updateProduct = {
      name: "Macbook Air 2019",
      image_url: "https://cdn.mos.cms.futurecdn.net/6xWkh7NfmxVqoT8YMtLGB3.jpg",
      price: 23000000,
      stock: 15,
      categoryId: 1
    }
    const res = await request(app)
                      .put('/admin/product/1')
                      .send(updateProduct)
    expect(res.status).toEqual(402)
  })
  it('PUT product by id validation form api call', async () => {
    let updateProduct = {
      name: "",
      image_url: "",
      price: null,
      stock: null,
      categoryId: null
    }
    const res = await request(app)
                      .put('/admin/product/1')
                      .send(updateProduct)
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(400)
  })
})

describe('DELETE /admin/product/:id', () => {
  it('DELETE product validation bearer api call', async () => {
    const res = await request(app)
                      .delete('/admin/product/1')
    expect(res.status).toEqual(402)
  })
  it('DELETE product by id api call', async () => {
    const res = await request(app)
                      .delete('/admin/product/1')
                      .set('Bearer', Bearer)
    expect(res.status).toEqual(200)
  })
})