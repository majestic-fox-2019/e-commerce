# e-commerce

e-Commerce Project: Client & Server & API Documentation

# Link Demo
    Backend: 
    Frontend: 


# Client & Server Documentation

## Client

    Tools: HTML, CSS, JAVASCRIPT, Vue JS

### Dependencies 
|   Package Name                |   Version     |
| ---------------               | ------------  |
|  core-js                      | ^3.6.4        |
|  superagent                   | ^5.2.2        |
|  vue                          | ^2.6.11       |
|  vue-router                   | ^3.1.5        |
|  vuex                         | ^3.1.2        |
|  vuetify                      | ^2.2.11       |

### Dev Dependencies
|   Package Name                |   Version     |
| ---------------               | ------------  |
|  @vue/cli-plugin-babel        | ~4.2.0        |
|  @vue/cli-plugin-e2e-cypress  | ~4.2.0        |
|  @vue/cli-plugin-eslint       | ~4.2.0        |
|  @vue/cli-plugin-unit-jest    | ~4.2.0        |
|  @vue/cli-service             | ~4.2.0        |
|  @vue/eslint-config-airbnb    | ^5.0.2        |
|  @vue/test-utils              | 1.0.0-beta.31 |
|  babel-eslint                 | ^10.0.3       |
|  eslint                       | ^6.7.2        |
|  eslint-plugin-import         | ^2.20.1       |
|  eslint-plugin-vue            | ^6.1.2        |
|  sass                         | ^1.19.0       |
|  sass-loader                  | ^8.0.0        |
|  vue-cli-plugin-vuetify       | ~2.0.5        |
|  vue-template-compiler        | ^2.6.11       |
|  vuetify-loader               | ^1.3.0        |



### Running Client

    npm run serve


## Server

    Tools: NodeJS, Express, sequelize, postgresql, Jest, Supertest

### Dependencies 
|   Package Name    |   Version     |
| ---------------   | ------------  |
|  bcrypt           | ^3.0.8        |
|  cors             | ^2.8.5        |
|  dotenv           | ^8.2.0        |
|  express          | 4.17.1        |
|  jsonwebtoken     | ^8.5.1        |
|  pg               | ^7.18.1       |
|  sequelize        | ^5.21.3       |

### Dev Dependencies 
|   Package Name    |   Version     |
| ---------------   | ------------  |
|  jest             | ^25.1.0       |
|  supertest        | ^4.0.2        |



### Example .env

    jwt_key="pengen kayak boncabe, rokstar yang sayang emak....!!uwouwo"

### Default Port

    3000

### Running Server Testing

    npm run test



### Running Server

    npm run dev


# API Documentation

## Base Url: http://localhost:3000

## Table Responses

| Code   | Description    | 
| -------------     | ------------- |
| 200     | Response Sukses      | 
| 201     | Data berhasil ditambahkan      | 
| 400     | Request yang diberikan tidak lengkap atau salah      | 
| 403     | Tidak memiliki otoritas      | 
| 404     | Data tidak ditemukan / tidak ada      | 
| 500     | Error dari sisi server / tidak diduga-duga :v      | 


## Users

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /users/register       | POST      | Membuat user baru
| /users/login          | POST      | User Login

### Example Request and Response
    
    [POST] localhost:3000/users/register


    Request header:

    {
        "Content-Type": "application/json"
    }

    Request body:

    {
        "email": "onesinus@gmail.com",
        "password": "123"
    }

    Response:

    {
        "id": 22,
        "email": "onesinus@gmail.com",
        "password": "$2b$10$sY4m96dzMITm0rOUXkRLlupASqs2wYFvkslTcqsGiwtd.C4E94a9W",
        "role": "User",
        "updatedAt": "2020-02-22T04:50:05.314Z",
        "createdAt": "2020-02-22T04:50:05.314Z"
    }

    Response With exist email:

    {
        "error": [
            "Email is already exist."
        ]
    }

    Response with validations (empty email, invalid email):

    {
        "error": [
            "Email cannot be empty!",
            "Invalid email format, e.g: onesinus231@gmail.com"
        ]
    }

    [POST] localhost:3000/users/login


    Request header:

    {
        "Content-Type": "application/json"
    }

    Request body:

    {
        "email": "onesinus@gmail.com",
        "password": "123"
    }

    Response:
    
    {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9uZXNpbnVzQGdtYWlsLmNvbSIsImlhdCI6MTU4MjM0NzIxNn0.IUX3oKkorcQIps_TAmj_3rGckVWmgK4Cl43pMqMjUYg"
    }

    Response with invalid email or password

    {
       "error": "Invalid username or password"
    }

## Products 

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /products             | GET       | Mendapatkan list product
| /products             | POST      | Menambahkan product baru
| /products/:id         | PUT       | Mengubah product
| /projects/:id         | DELETE    | Menghapus product

### Example Request and Response

    [GET] localhost:3000/products


    Response with empty token / invalid token in request header:

    {
       "error": "Un-authorized"
    }


    Request header:

    {
        "Content-Type": "application/json",
        "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtvZGVraXRlQGdtYWlsLmNvbSIsImlhdCI6MTU4MjM0MjU4NH0.SRZmkzvhH1mPmLbZ5Aki8iIo3JQ52l_GsTcU4ClFopc"
    }

    Request body:

    {}

    Response:

    [
        {
            "id": 40,
            "name": "3 Days with mysql for your application",
            "image_url": null,
            "price": 10000,
            "stock": 130,
            "createdAt": "2020-02-20T05:31:04.488Z",
            "updatedAt": "2020-02-21T10:19:31.868Z"
        },
        {
            "id": 38,
            "name": "React JS With Ant Design",
            "image_url": "",
            "price": 250000,
            "stock": 175,
            "createdAt": "2020-02-20T04:06:45.161Z",
            "updatedAt": "2020-02-21T10:20:08.060Z"
        },
        {
            "id": 34,
            "name": "Odoo Technical For Beginner",
            "image_url": "",
            "price": 150000,
            "stock": 89,
            "createdAt": "2020-02-20T03:46:46.675Z",
            "updatedAt": "2020-02-21T10:20:13.299Z"
        }
    ];

    [POST] localhost:3000/products

    Request Body:

    {
        "name": "Buku pemrograman untuk profesional",
        "price": 20000,
        "stock": 75,
        "image_url": ""
    }

    Response Body:

    {
        "product": {
            "id": 41,
            "name": "Buku pemrograman untuk profesional",
            "image_url": "",
            "price": 20000,
            "stock": 75,
            "updatedAt": "2020-02-22T05:00:39.578Z",
            "createdAt": "2020-02-22T05:00:39.578Z"
        },
        "message": "Product has been added!"
    }

    [PUT] localhost:3000/products/1

    Request Body:

    {
        "name": "Buku pemrograman untuk profesional",
        "price": 20000,
        "stock": 75,
        "image_url": "www.google.com/asdlkasjdalsmkdla"
    }

    Response Body:

        "Product has been updated!"
    
    [DELETE] localhost:3000/products/1

    Request Body: 
    
    {}

    Response Body:

        "Product has been deleted!"

