const request = require('supertest')
const app = require('../app')
const {Product,sequelize} = require('../models')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqZXRseTI3c2FuZGl0YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE5NDIzMTl9.MYJqnvOaTReNtlROqsxXXtSOCcSrDZGHyoFRReyK5qI'

beforeAll(() => {
  Product.truncate({
    restartIdentity:true
  })
  .then(result => {
    console.log('Table has been reset')
  })
  .catch(err => {
    console.log(err)
  })
})
afterAll(() => {
  sequelize.close()
})
describe('Product Route', () => {
  describe('Post /product', () => {
    describe('Success 201',() => {
      it('require all attributes', async () => {
        let product = {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock:100,
          price:500000,
          category:"Man",
        }
        const result = await request(app)
                              .post('/product')
                              .set('token',token)
                              .send(product)
        console.log(result)
        expect(result.status).toBe(201)  
        expect(result.body).not.toStrictEqual({
          name:expect.any(String),
          image_url:expect.any(String),
          price:expect.any(Number),
          stock:expect.any(Number),
        })
      })
    })

    describe('Error 401',() => {
      it('Invalid token', async () => {
        let product = {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock:100,
          price:500000
        }
        const result = await request(app)
                              .post('/product')
                              .send(product)

        expect(result.status).toBe(401)  
        expect(result.body).toBe('Invalid token')
      })
    })

    let arrobj = [
      [
        'name is empty or null',
        {
          name:"",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock:100,
          price:1000,
          category:"Man"
        },
        {name:'Please enter a name'}
      ],
      [
        'stock is  null',
        {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: null,
          price:1000,
          category:"Man"
        },
        {stock:'Please enter a stock'}
      ],
      [
        'price is  null',
        {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: 10,
          price:null,
          category:"Man"
        },
        {price:'Please enter a price'}
      ],
      [
        'all require attribute null',
        {
          name:null,
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: null,
          price:null,
          category:"Man"
        },
        {
          price:'Please enter a price',
          name:'Please enter a name',
          stock:'Please enter a stock'
        }
      ],
      [
        'price below one',
        {
          name:'obaku',
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: 10,
          price:-1,
          category:"Man"
        },
        {
          price:"Price can't be zero or less",
        }
      ],
      [
        'stock below zero',
        {
          name:'obaku',
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: -1,
          price:1,
          category:"Man"
        },
        {
          stock:"Stock can't below zero",
        }
      ],
    ]
      describe
          .each(arrobj)('Error 400', (desc,input,expected) => {
            it(desc, async () => {
                const result = await request(app)
                                      .post('/product')
                                      .set('token',token)
                                      .send(input)
                expect(result.status).toBe(400)
                expect(result.body)
                  .toEqual(expected)
            })     
      })
  })

  describe('Get /product', () => {
    describe('Success 200',() => {
      it('require all attributes', async () => {
        const result = await request(app)
                              .get('/product')
                              .set('token',token)

        expect(result.status).toBe(200)  
        expect(Array.isArray(result.body)).toBe(true)
      })
    })
    describe('Error 401',() => {
      it('Invalid token', async () => {
        const result = await request(app)
                              .get('/product')

        expect(result.status).toBe(401)  
        expect(result.body).toBe('Invalid token')
      })
    })
  })

  describe('Get /product/:id', () => {
    describe('Success 200',() => {
      it('require all attributes', async () => {
        const result = await request(app)
                              .get('/product/1')
                              .set('token',token)

        expect(result.status).toBe(200)  
        expect(Array.isArray(result.body)).toBe(false)
      })
    })
    describe('Error 401',() => {
      it('Invalid token', async () => {
        const result = await request(app)
                              .post('/product/id')

        expect(result.status).toBe(401)  
        expect(result.body).toBe('Invalid token')
      })
    })
  })

  describe('Put /product/:id', () => {
    describe('Success 200',() => {
      it('require all attributes', async () => {
        let product = {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock:100,
          price:500000
        }
        const result = await request(app)
                              .put('/product/1')
                              .set('token',token)
                              .send(product)

        expect(result.status).toBe(200)  
        expect(result.body).not.toStrictEqual({
          name:expect.any(String),
          image_url:expect.any(String),
          price:expect.any(Number),
          stock:expect.any(Number),
        })
      })
    })

    describe('Error 401',() => {
      it('Invalid token', async () => {
        let product = {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock:100,
          price:500000
        }
        const result = await request(app)
                              .put('/product/1')
                              .send(product)

        expect(result.status).toBe(401)  
        expect(result.body).toBe('Invalid token')
      })
    })

    describe('Error 400',() => {
      it('Product not found', async () => {
        let product = {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock:100,
          price:500000
        }
        const result = await request(app)
                              .put('/product/2')
                              .set('token',token)
                              .send(product)

        expect(result.status).toBe(400)  
        expect(result.body).toBe('Product not found')
      })
    })

    let arrobj = [
      [
        'name is empty or null',
        {
          name:"",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock:100,
          price:1000
        },
        {name:'Please enter a name'}
      ],
      [
        'stock is  null',
        {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: null,
          price:1000
        },
        {stock:'Please enter a stock'}
      ],
      [
        'price is  null',
        {
          name:"obaku",
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: 10,
          price:null
        },
        {price:'Please enter a price'}
      ],
      [
        'all require attribute null',
        {
          name:null,
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: null,
          price:null
        },
        {
          price:'Please enter a price',
          name:'Please enter a name',
          stock:'Please enter a stock'
        }
      ],
      [
        'price below one',
        {
          name:'obaku',
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: 10,
          price:-1
        },
        {
          price:"Price can't be zero or less",
        }
      ],
      [
        'stock below zero',
        {
          name:'obaku',
          image_url:"https://www.obaku.com/content/watch/V178GXUURZ_ROLIG_GUNTAN.jpg",
          stock: -1,
          price:1
        },
        {
          stock:"Stock can't below zero",
        }
      ],
    ]
      describe
          .each(arrobj)('Error 400', (desc,input,expected) => {
            it(desc, async () => {
                const result = await request(app)
                                      .put('/product/1')
                                      .set('token',token)
                                      .send(input)
                expect(result.status).toBe(400)
                expect(result.body)
                  .toEqual(expected)
            })     
      })
  })
  describe('Delete /product/:id', () => {
    describe('Success 200',() => {
      it('require all attributes', async () => {
        const result = await request(app)
                              .delete('/product/1')
                              .set('token',token)

        expect(result.status).toBe(200)  
        expect(result.body).not.toStrictEqual({
          name:expect.any(String),
          image_url:expect.any(String),
          price:expect.any(Number),
          stock:expect.any(Number),
        })
      })
    })

    describe('Error 401',() => {
      it('Invalid token', async () => {
        const result = await request(app)
                              .delete('/product/1')

        expect(result.status).toBe(401)  
        expect(result.body).toBe('Invalid token')
      })
    })

    describe('Error 400',() => {
      it('Product not found', async () => {
        const result = await request(app)
                              .delete('/product/2')
                              .set('token',token)

        expect(result.status).toBe(400)  
        expect(result.body).toBe('Product not found')
      })
    })
  })
})