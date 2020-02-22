# E-Commerce API Documentation

```
Deploy Server : https://ecommerce-v2.herokuapp.com
Deploy Client : https://kanmarz-v2.firebaseapp.com
```

How to run locally :

```
npm i (server side)
npm run dev (server run)
npm run serve (client side)
```

## Users Routes

### POST /users/login

---

Login with existing account

> #### Headers :

```
none
```

> #### Request Body :

```
{
    email: <your email goes here>,
    password: <your password here>
}
```

> #### Success Reponse

```
200 : {
    data : {
        id: <id>,
        name: <name>,
        role: <role>,
        shop_name: <shopname>
    },
    token : <your jwt token>,
    msg: 'Login success'
}
```

### POST /users/register

---

Register a new account

> #### Headers :

```
none
```

> #### Request Body :

```
{
    name: <your name here>,
    phone: <your phone here>
    email: <your email goes here>,
    password: <your password here>
}
```

> #### Success Reponse

```
200 : {
    data : {
        id: <id>,
        name: <name>,
        role: <role>,
        shop_name: <shopname>
    },
    token : <your jwt token>,
    msg: 'User created'
}
```

### PATCH /users/create-shop

---

CREATE shop to sell item

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
{
    shop_name: <shopname>
}
```

> #### Success Reponse

```
200 : {
    msg: 'Shop created'
}
```

### GET /users

---

GET detail logged on user information

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "id": 6,
    "name": "Admin",
    "role": "premium",
    "shop_name": "Admin Shop"
}
```

## Products Routes

### GET /products

---

Get all products

> #### Headers :

```
none
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : [
    {
        "id": 5,
        "name": "Mellophone Teman",
        "description": "kriiiing .. kkriiiiiiing",
        "price": "12000000",
        "stocks": 12,
        "image_url": "https://storage-ecommerce-mashumuro.s3.ap-southeast-1.amazonaws.com/1582173137003-yamaha-mello.jpg",
        "status": "new",
        "category": "Brass",
        "UserId": 1,
        "createdAt": "2020-02-20T04:32:17.416Z",
        "updatedAt": "2020-02-20T04:32:17.416Z",
        "User": {
            "name": "Admin",
            "shop_name": "Admin Shop"
        }
    },
    {
        "id": 6,
        "name": "Snare 2222222",
        "description": "DRAAAAMBEEEEEEN",
        "price": "19000000",
        "stocks": 12,
        "image_url": "https://storage-ecommerce-mashumuro.s3.ap-southeast-1.amazonaws.com/1582173291351-yamaha-snare.jpg",
        "status": "second",
        "category": "Battery",
        "UserId": 6,
        "createdAt": "2020-02-20T04:34:52.032Z",
        "updatedAt": "2020-02-20T04:36:56.245Z",
        "User": {
            "name": "Amalya",
            "shop_name": "AmelShop"
        }
    }
]
```

### GET /products/user/my-products

---

GET all user's products

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : [
    {
        "id": 6,
        "name": "Snare 2222222",
        "description": "DRAAAAMBEEEEEEN",
        "price": "19000000",
        "stocks": 12,
        "image_url": "https://storage-ecommerce-mashumuro.s3.ap-southeast-1.amazonaws.com/1582173291351-yamaha-snare.jpg",
        "status": "second",
        "category": "Battery",
        "UserId": 6,
        "createdAt": "2020-02-20T04:34:52.032Z",
        "updatedAt": "2020-02-20T04:36:56.245Z",
        "User": {
            "name": "Amalya",
            "shop_name": "AmelShop"
        }
    }
]
```

### GET /products/:id

---

Get detail products

> #### Headers :

```
none
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "id": 5,
    "name": "Mellophone Teman",
    "description": "kriiiing .. kkriiiiiiing",
    "price": "12000000",
    "stocks": 12,
    "image_url": "https://storage-ecommerce-mashumuro.s3.ap-southeast-1.amazonaws.com/1582173137003-yamaha-mello.jpg",
    "status": "new",
    "category": "Brass",
    "UserId": 1,
    "createdAt": "2020-02-20T04:32:17.416Z",
    "updatedAt": "2020-02-20T04:32:17.416Z",
    "User": {
        "name": "Admin",
        "shop_name": "Admin Shop"
    }
}
```

### GET /products/categories/:category

---

Get products by category

> #### Headers :

```
none
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : [
    {
        "id": 6,
        "name": "Snare 2222222",
        "description": "DRAAAAMBEEEEEEN",
        "price": "19000000",
        "stocks": 12,
        "image_url": "https://storage-ecommerce-mashumuro.s3.ap-southeast-1.amazonaws.com/1582173291351-yamaha-snare.jpg",
        "status": "second",
        "category": "Battery",
        "UserId": 6,
        "createdAt": "2020-02-20T04:34:52.032Z",
        "updatedAt": "2020-02-20T04:36:56.245Z",
        "User": {
            "name": "Amalya",
            "shop_name": "AmelShop"
        }
    }
]
```

### POST /products

---

Post new products by authenticated user

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
{
    name: 'Barang mewah 2',
    description: 'Ini barang mewah',
    price: '40000',
    stocks: 7,
    category: 'Brass',
    status: 'new',
    image_url: 'http://gambar.com'
}
```

> #### Success Reponse

```
200 : {
    "data": {
        name: 'Barang mewah 2',
        description: 'Ini barang mewah',
        price: '40000',
        stocks: 7,
        category: 'Brass',
        status: 'new',
        image_url: 'http://gambar.com'
    },
    "msg": "New product created"
}
```

### PUT /products/:id

---

Edit product by authenticated user

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
{
    name: 'Barang mewah 2',
    description: 'Ini barang mewah',
    price: '40000',
    stocks: 7,
    category: 'Brass',
    status: 'new',
    image_url: 'http://gambar.com'
}
```

> #### Success Reponse

```
200 : {
    "msg": "Product updated"
}
```

### DELETE /products/:id

---

DELETE product by authenticated user

> #### Headers :

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "msg": "Product deleted"
}
```

## Error Responses

```
> User errors
400: {
    code: 400,
    msg: <error msg>
}
401: {
    code: 401,
    msg: <error msg>
}
403: {
    code: 403,
    msg: <error msg>
}
404: {
    code: 404,
    msg: <error msg>
}
> Server error
500: {
    code: 500,
    msg: <error msg>
}
```
