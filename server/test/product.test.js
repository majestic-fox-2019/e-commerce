const app =  require('../app');
const request = require('supertest');
let adminToken = ''
let userToken = ''
let unexistingUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwZXRvcmFAbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwOCQxY3VzR05YVWtRandhT3hVclFaNzRlS0ZVSG1DZjdtaFhZUW5nMDdJNmUvdkpWbXpaZGVkbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4MTk5OTA0NX0.I2Fi3iIxb_Po8lddQWeYrxE4waeEwEeU2fMNiI49QV8'

let newUser = {
    email : 'jovi@test.com',
    password: 'test'
}

let adminUser = {
    email : 'admin@mail.com',
    password: '4dm1n'
}

let newProduct = {
    name : 'Kaus Merah',
    price: '100000',
    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
    stock: 1,
}

let editProduct = {
    name : 'Kaus Merah Edited',
    price: '100000',
    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
    stock: 1,
}

jest.setTimeout(10000);


describe.only('Product endpoints' , ()=>{

    beforeAll(done => {
        request(app)
            .post('/user/register')
            .send(newUser)
            .end((err,res)=> {
                expect(res.error).toBeFalsy()
                expect(res.statusCode).toEqual(201)
                expect(res.body).not.toBeNull()
                userToken += res.body
            })
        request(app)
            .post('/user/register')
            .send(adminUser)
            .end((err,res)=> {
                expect(res.error).toBeFalsy()
                expect(res.statusCode).toEqual(201)
                expect(res.body).not.toBeNull()
                adminToken += res.body
                done()
            })
    })


    describe('Post new product through POST /product', ()=>{
        it('should post a new product with response code 201', async ()=>{
            const res = await request(app)
                    .post('/product')
                    .set('token', adminToken)
                    .send(newProduct)
                expect(res.body).toHaveProperty('name','Kaus Merah')
                expect(res.statusCode).toEqual(201)
                expect(res.body).not.toBeNull()
                expect(res.err).toBeFalsy()
                expect(typeof res.body).toBe('object')
                expect(Array.isArray(res.body)).not.toBeTruthy()
                expect(res.body).toHaveProperty('price',100000)
                expect(res.body).toHaveProperty('stock',1)
                expect(res.body).toHaveProperty('id',expect.any(Number))
        })

        it('should return an error due null token, status code 401', async ()=>{
            const res = await request(app)
                .post('/product')
                .send(newProduct)
            expect(res.statusCode).toEqual(401)
            expect(res.error).not.toBeNull()
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Invalid token')
            
        })

        it('should return an error due to unauthorized token, status code 401', async ()=>{
            const res = await request(app)
                .post('/product')
                .set('token', userToken)
                .send(newProduct)
            expect(typeof res.body).toBe('object')
            expect(res.statusCode).toEqual(401)
            expect(res.error).not.toBeNull()
            expect(res.body).toHaveProperty('msg', 'Unauthorized')

        })

        it('should return an error due to unexisting user token, status code 401', async ()=>{
            const res = await request(app)
                .post('/product/1')
                .set('token', unexistingUserToken)
                .send(newProduct)
            expect(typeof res.body).toBe('object')
            expect(res.statusCode).toEqual(401)
            expect(res.error).not.toBeNull()
            expect(res.body).toHaveProperty('msg', 'Invalid token')

        })

        it('should return an error due to null name, status code 400', async ()=>{
            const res = await request(app)
                .post('/product/')
                .set('token', adminToken)
                .send({
                    name : null,
                    price: '100000',
                    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
                    stock: 1,
                })
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Product name is required')
        })
        
        it('should return an error due to price has negative value, status code 400', async ()=>{
            const res = await request(app)
                .post('/product/')
                .set('token', adminToken)
                .send({
                    name : 'Kaus Merah Edited',
                    price: '-100000',
                    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
                    stock: 1,
                })
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', "Price can't be minus")
        })
        
        it('should return an error due to stock below 1, status code 400', async ()=>{
            const res = await request(app)
                .post('/product/')
                .set('token', adminToken)
                .send({
                    name : 'Kaus Merah Edited',
                    price: '100000',
                    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
                    stock: 0,
                })
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', "Stock can't be less than 1")
        })
    })
    
    describe('Read all products',()=>{
        it('should return a successful response body, status code 200', async ()=>{
            const res = await request(app)
                .get('/product/')
                .set('token', userToken)
            expect(Array.isArray(res.body)).toBeTruthy()
            expect(res.statusCode).toEqual(200)
            expect(res.error).not.toBeNull()
            expect(res.body[0]).toHaveProperty('name', 'Kaus Merah')
            expect(res.body[0]).toHaveProperty('price', 100000)
            expect(res.body[0]).toHaveProperty('stock', 1)
        })
    })
    
    describe('Read one product',()=>{
        it('should return a successful response body, status code 200', async ()=>{
            const res = await request(app)
                .get('/product/1')
                .set('token', userToken)
            expect(typeof res.body).toBe('object')
            expect(Array.isArray(res.body)).not.toBeTruthy()
            expect(res.body).not.toBeFalsy()
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('price',100000)
            expect(res.body).toHaveProperty('stock',1)
            expect(res.body).toHaveProperty('id',expect.any(Number))
        })
        
        it('should return an error due to unexisting product id, status code 404', async ()=>{
            const res = await request(app)
                .get('/product/121')
                .set('token', userToken)
            expect(typeof res.body).toBe('object')
            expect(res.body).toBeNull()
        })

        it('should return an error due to unathorized token, status code 401', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', userToken)
                .send(editProduct)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Unauthorized')
        })
        
        it('should return an error due to invalid token, status code 401', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', unexistingUserToken)
                .send(editProduct)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Invalid token')
        })
    })
    
    describe('Update a product through PUT /product', ()=>{
        it('should return a successful response body, status code 200', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', adminToken)
                .send(editProduct)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Item sucessfully updated')
        })
        
        it('should return an error due to null name, status code 400', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', adminToken)
                .send({
                    name : null,
                    price: '100000',
                    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
                    stock: 1,
                })
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Product name is required')
        })
        
        it('should return an error due to null price, status code 400', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', adminToken)
                .send({
                    name : 'Kaus Merah Edited',
                    price : null,
                    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
                    stock: 1,
                })
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Price is required')
        })
        
        it('should return an error due to price has negative value, status code 400', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', adminToken)
                .send({
                    name : 'Kaus Merah Edited',
                    price: '-100000',
                    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
                    stock: 1,
                })
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', "Price can't be minus")
        })
        
        it('should return an error due to stock below 1, status code 400', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', adminToken)
                .send({
                    name : 'Kaus Merah Edited',
                    price: '100000',
                    img_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/1/20/847060/847060_26b0531e-6a29-4dbe-803b-a80565c16689.jpg',
                    stock: 0,
                })
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', "Stock can't be less than 1")
        })
        
        it('should return an error due to unathorized token, status code 401', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', userToken)
                .send(editProduct)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Unauthorized')
        })
        
        it('should return an error due to invalid token, status code 401', async ()=>{
            const res = await request(app)
                .put('/product/1')
                .set('token', unexistingUserToken)
                .send(editProduct)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg', 'Invalid token')
        })
        
    })

    describe('Delete a product through DELETE /product/:id', ()=>{
        it('should return an error due to unauthorized token, status code 401', async ()=>{
            const res = await request(app)
                .delete('/product/1')
                .set('token', userToken)
            expect(res.body).toHaveProperty('msg', 'Unauthorized')
            expect(res.statusCode).toEqual(401)
            expect(res.body).not.toBeNull()
        })
        
        it('should return an error due to unexisting item, status code 404', async ()=>{
            const res = await request(app)
                .delete('/product/152')
                .set('token', adminToken)
            expect(res.body).toHaveProperty('msg', 'Product not found')
            expect(res.statusCode).toEqual(404)
            expect(res.body).not.toBeNull()
        })

        it('should return a successful response body, status code 200', async ()=>{
            const res = await request(app)
                .delete('/product/1')
                .set('token', adminToken)
            expect(res.body).toHaveProperty('msg', 'Item sucessfully deleted')
            expect(res.statusCode).toEqual(200)
            expect(res.body).not.toBeNull()
        })
    })
    
})