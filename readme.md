## e-commerce

### installation

[e-commerce repository](https://github.com/erneryn/e-commerce.git) - Clone Repository here

```sh
$ cd ../server & cd ../client
```

run script from packages by using the comment bellow on server and client
```sh
$ npm start-dev // on server
$ npm run serve // on client http://localhost:8080
```


### list of user Routes :
| Route | HTTP | Description |
| ------ | ------ | ----------- |
| /login | POST  | Login and get access token |
| /register | POST | Aign up new user |


### list of Product Routes :
| Route | HTTP | Description |
| ------ | ------ | ----------- |
| /product | GET  | Get all product ( (authentication, login required) |
| /product | POST | Add new product (authentication, login required) |
| /product/:id | GET | Get a single product by id (authentication, login required) |
| /product/:id | PUT | Update values of product (authentication, login required) |
| /product/:id | DELETE | Delete a single product (authentication, login required) |

### list of errors  :
| Code | Name | Description |
| ------ | ------ | ----------- |
| 400 | Bad Request  | Incorrect user access of form validation |
| 403 | Forbiden | Unauthorized acess |
| 404 | Not Found | Request Resource not Found |
| 500 | Internal Server Error | Server currently unable to handle this request |


### POST Login
- url: /login
- Method: POST
- Request body:

```
{
    "email": "admin@admin.com", //required
    "password": "admin" //required
}
```

- Success Response
```
status 200

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYWZpenVscmlma2loYXdhcmlAZ21haWwuY29tIiwiaWF0IjoxNTgxNjQ0ODM4fQ.cUwd7Tv2KeusXaa58oEeHsF7L9SzK0HxPLWkb8Vfa88",
}
```
- error Response

```
status: 404

{
    "message": "email or password wrong"
}
```

### POST Register
- url: /register
- Method: POST
- Request body:

```
{
    "name": "admin1"
    "email": "admin@admin.com", //required
    "password": "admin" //required
    "secretkey": "newadmin"
}
```

- Success Response
```
status 200
{
    "id": 4,
    "name": "admin1",
    "email": "admin1@admin.com",
    "password": "$2a$10$n6ETpMwuNk2KT1hY.kfX1OLN3BGwA2OHVO9OxHk0sKu6gUxi8leJi",
    "updatedAt": "2020-02-22T10:05:06.533Z",
    "createdAt": "2020-02-22T10:05:06.533Z",
}
```
- error Response

```
status: 404

{
    "message": "email already exists"
}
```
```
status: 404

{
    "message": "Invalid Secret Key"
}
```


### GET Product
- url: /product
- Method: GET
- Request Headers:

```
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYWZpenVscmlma2loYXdhcmlAZ21haWwuY29tIiwiaWF0IjoxNTgxNjQ0ODM4fQ.cUwd7Tv2KeusXaa58oEeHsF7L9SzK0HxPLWkb8Vfa88",  
}
```

- Success Response
```
status 200
[
    {
        "id": 9,
        "name": "Shimano 105 Pedal",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
        "createdAt": "2020-02-20T03:18:49.789Z",
        "updatedAt": "2020-02-20T18:18:27.136Z"
    },
]
```
- error Response

```
status: 403

{
    "message": "Unathentication"
}
```

### POST Product
- url: /product
- Method: POST
- Request Headers:

```
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYWZpenVscmlma2loYXdhcmlAZ21haWwuY29tIiwiaWF0IjoxNTgxNjQ0ODM4fQ.cUwd7Tv2KeusXaa58oEeHsF7L9SzK0HxPLWkb8Vfa88",  
}
```
- Request Body:

```
{
        "id": 9,
        "name": "Shimano 105 Pedal",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
}
```

- Success Response
```
status 200
[
    {
        "id": 9,
        "name": "Shimano 105 Pedal",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
        "createdAt": "2020-02-20T03:18:49.789Z",
        "updatedAt": "2020-02-20T18:18:27.136Z"
    },
]
```
- error Response

```
status: 403
{
    "message": "Unathentication"
}
```
```
status: 400
{
    "message": [
        "Product Name Cannot Empty",
        "Price Cannot Empty",
        "stock at least 1"
    ]
}
```

### GET Product by id
- url: /product:id
- Method: GET
- URL Params:
```
"id":9
```
- Request Header:

```
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYWZpenVscmlma2loYXdhcmlAZ21haWwuY29tIiwiaWF0IjoxNTgxNjQ0ODM4fQ.cUwd7Tv2KeusXaa58oEeHsF7L9SzK0HxPLWkb8Vfa88",  
}
```

```
{
        "id": 9,
        "name": "Shimano 105 Pedal",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
}
```

- Success Response
```
status 200
[
    {
        "id": 9,
        "name": "Shimano 105 Pedal",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
        "createdAt": "2020-02-20T03:18:49.789Z",
        "updatedAt": "2020-02-20T18:18:27.136Z"
    },
]
```
- error Response

```
status: 403
{
    "message": "Unathentication"
}
```
```
status: 404
{
    "message": "Data not found!",
}
```


### PUT Product by id
- url: /product:id
- Method: PUT
- URL Params:
```
"id":9
```
- Request Header:

```
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYWZpenVscmlma2loYXdhcmlAZ21haWwuY29tIiwiaWF0IjoxNTgxNjQ0ODM4fQ.cUwd7Tv2KeusXaa58oEeHsF7L9SzK0HxPLWkb8Vfa88",  
}
```

```
{
        "id": 9,
        "name": "Shimano",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
}
```

- Success Response
```
status 200
[
    {
        "id": 9,
        "name": "Shimano",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
        "createdAt": "2020-02-20T03:18:49.789Z",
        "updatedAt": "2020-02-20T18:18:27.136Z"
    },
]
```
- error Response

```
status: 403
{
    "message": "Unathentication"
}
```
```
status: 400
{
    "message": [
        "Product Name Cannot Empty",
        "Price Cannot Empty",
        "stock at least 1"
    ]
}
```


### DELETE Product by id
- url: /product:id
- Method: PUT
- URL Params:
```
"id":9
```
- Request Header:

```
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYWZpenVscmlma2loYXdhcmlAZ21haWwuY29tIiwiaWF0IjoxNTgxNjQ0ODM4fQ.cUwd7Tv2KeusXaa58oEeHsF7L9SzK0HxPLWkb8Vfa88",  
}
```

```
{
        "id": 9,
        "name": "Shimano",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
}
```

- Success Response
```
status 200
[
    {
        "id": 9,
        "name": "Shimano",
        "price": 1999988,
        "stock": 10,
        "imageurl": "https://www.rodalink.com/pub/media/catalog/product/cache/image/880x704/e9c3970ab036de70892d86c6d221abfe/7/2/721685001.jpg",
        "createdAt": "2020-02-20T03:18:49.789Z",
        "updatedAt": "2020-02-20T18:18:27.136Z"
    },
]
```
- error Response

```
status: 403
{
    "message": "Unathentication"
}
```


### Internal server error
- error cause server
```
status: 500
{
    "message": "Internal server error"
}
```
