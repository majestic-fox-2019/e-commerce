Link Deploy:

https://arduishop-f0a45.firebaseapp.com/

Admin Account:

email: admin@arduishop.com

password: admin

## 

    npm install
    sequelize db:migrate
    sequelize db:seed:all --> seed admin & product

# E-Commerce 

Route on My E-Commerce API is:



# -- USER --

## 1. POST /api/register

    To Register User to E-Commerce

* **URL:**

http://localhost:3000/api/register

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8"
}
```

* **REQUEST BODY**

```javascript
{
    "name": "<<your_name>>",
    "email": "<<your_email>>",
    "password": "<<your_password>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "name": "fajrin",
    "email": "fajrin@oke.com",
    "role": "member"
    "password": "$2b$10$YOA.1DTgLgpxlQyg0pEImevUpw3BcRxmjdALJB0BZdZj.voB046Ti",
    "updatedAt": "2020-02-08T09:50:25.644Z",
    "createdAt": "2020-02-08T09:50:25.644Z"
}
```

If request failed because validations error:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty>>"
    }
]
```

If request failed because email already exist:

* Status Code: 400

```javascript
[
    {
        "msg": "Email already exist."
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 2. POST /api/login

    Logged in on E-Commerce

* **EXAMPLE URL:**

http://localhost:3000/api/login


* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8"
}
```

* **REQUEST BODY**

```javascript
{
    "email": "<<your_email>>",
    "password": "<<your_password>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "token": "<<jwt_token>>"
}
```

If request failed because username or password is wrong:

* Status Code: 400

```javascript
{
    "error": "Username / Password Wrong"
}
```

If request failed because user not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 3. PUT /api/users/:id

    Edit user profile

* **EXAMPLE URL:**

http://localhost:3000/api/users/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**

```javascript
{   
    "name" : "<<your_name>>",
    "role": "<<role>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "name": "Fajrin Noor Rachman",
    "role": "customer"
}
```


If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty">>
    }
]
```

If request failed because user not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 4. GET /api/users

    List all users

* **EXAMPLE URL:**

http://localhost:3000/api/users

* **REQUEST HEADER**

```javascript
{
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
[
    {
        "id": 1,
        "name": "Fajrin Noor Rachman",
        "email": "fajrin@mail.com",
        "password": "<<bcrypt password>>",
        "role": "admin",
        "createdAt": "2020-02-13T21:51:09.910Z",
        "updatedAt": "2020-02-13T21:51:09.910Z",
    },
    {
        "id": 2,
        "name": "Rizky Ihsan Ramadhan Rachman",
        "email": "ihsan@mail.com",
        "password": "<<bcrypt password>>",
        "role": "customer",
        "createdAt": "2020-02-13T21:51:09.910Z",
        "updatedAt": "2020-02-13T21:51:09.910Z",
    }
]
```

If request success but theres no data found:

* Status Code: 200

```javascript
{
    "User is empty."
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 5. DELETE /api/users/:id

    Delete user

* **EXAMPLE URL:**

http://localhost:3000/api/users/2

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
     	"id": 2,
        "name": "Rizky Ihsan Ramadhan Rachman",
        "email": "ihsan@mail.com",
        "password": "<<bcrypt password>>",
        "role": "customer",
        "createdAt": "2020-02-13T21:51:09.910Z",
        "updatedAt": "2020-02-13T21:51:09.910Z",
}
```

If request failed because project not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

# -- PRODUCTS --

## 6. POST /api/products

    Add/Create Product

* **EXAMPLE URL:**

http://localhost:3000/api/products

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**

```javascript
{
    "name": "Arduino Uno",
    "description": "blablablablablablablablablablablablablablablablablabla"
    "image_url": "https://arduino.com/arduino-uno",
    "price": "1300000",
    "stock": 5
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "name": "Arduino Uno",
    "description": "blablablablablablablablablablablablablablablablablabla",
    "image_url": "https://arduino.com/arduino-uno",
    "price": "1300000",
    "stock": 5,
    "updatedAt": "2020-02-14T15:48:12.936Z",
    "createdAt": "2020-02-14T15:48:12.936Z"
}
```

If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_is_empty>>"
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```


## 7. GET /api/products

    List all products

* **EXAMPLE URL:**

http://localhost:3000/api/products

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
[
    {
        "id": 1,
        "name": "Arduino Uno",
        "description": "blablablablablablablablablablablablablablablablablabla",
        "image_url": "https://arduino.com/arduino-uno",
        "price": "1300000",
        "stock": 5,
        "updatedAt": "2020-02-14T15:48:12.936Z",
        "createdAt": "2020-02-14T15:48:12.936Z"
    },
    {
        "id": 2,
        "name": "Arduino Mega",
        "description": "blablablablablablablablablablablablablablablablablabla",
        "image_url": "https://arduino.com/arduino-mega",
        "price": "900000",
        "stock": 5,
        "updatedAt": "2020-02-14T15:48:12.936Z",
        "createdAt": "2020-02-14T15:48:12.936Z"
    }
]
```

If request success but theres no data found:

* Status Code: 200

```javascript
{
    "Product is empty."
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 8. GET /api/products/:id 

    Get product by id

* **EXAMPLE URL:**

http://localhost:3000/api/products/1

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
      "id": 1,
      "name": "Arduino Uno",
      "description": "blablablablablablablablablablablablablablablablablabla",
      "image_url": "https://arduino.com/arduino-uno",
      "price": "1300000",
      "stock": 5,
      "updatedAt": "2020-02-14T15:48:12.936Z",
      "createdAt": "2020-02-14T15:48:12.936Z"
}
```

If request failed caused no data found:

* Status Code: 400

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 9. PUT /api/products/:id

    Edit product

* **EXAMPLE URL:**

http://localhost:3000/api/products/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**

```javascript
{
   "name": "Arduino Uno",
   "description": "blablablablablablablablablablablablablablablablablabla",
   "image_url": "https://arduino.com/arduino-uno",
   "price": "1300000",
   "stock": 5,
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
   "name": "Arduino Uno",
   "description": "blablablablablablablablablablablablablablablablablabla",
   "image_url": "https://arduino.com/arduino-uno",
   "price": "1300000",
   "stock": 5,
}
```


If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty"
    }
]
```

If request failed because project not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 10. DELETE /api/products/:id

    Delete product

* **EXAMPLE URL:**

http://localhost:3000/api/products/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
      "name": "Arduino Uno",
      "description": "blablablablablablablablablablablablablablablablablabla",
      "image_url": "https://arduino.com/arduino-uno",
      "price": "1300000",
      "stock": 5,
}
```

If request failed because project not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

# -- CART --

## 11. GET /api/carts

    Get all product that user buy

* **EXAMPLE URL:**

http://localhost:3000/api/carts

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
[
    {
        "id": 1,
        "name": "Arduino Mega",
        "description": "The MEGA 2560 is designed for more complex projects. With 54 digital I/O pins, 16 analog inputs and a larger space for your sketch it is the recommended board for 3D printers and robotics projects. This gives your projects plenty of room and opportunities.",
        "image_url": "https://store-cdn.arduino.cc/usa/catalog/product/cache/1/image/520x330/604a3538c15e081937dbfbd20aa60aad/a/0/a000067_featured_1_.jpg",
        "price": "800000",
        "stock": 10,
        "createdAt": "2020-02-22T06:00:13.656Z",
        "updatedAt": "2020-02-22T06:00:13.656Z",
        "Cart": {
            "UserId": 2,
            "ProductId": 2,
            "createdAt": "2020-02-22T06:08:33.043Z",
            "updatedAt": "2020-02-22T06:08:33.043Z"
        }
    }
]
```

If request failed caused no data found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 12. POST /api/carts/:id

    Add product to cart

* **EXAMPLE URL:**

http://localhost:3000/api/carts/3

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "UserId": 1,
    "ProductId": 3,
    "updatedAt": "2020-02-22T10:09:32.041Z",
    "createdAt": "2020-02-22T10:09:32.041Z",
    "id": 1
}
```

If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_is_empty>>"
    }
]
```
 
If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 13. PUT /api/carts/:productId

    Edit amount cart

* **EXAMPLE URL:**

http://localhost:3000/api/carts/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**

```javascript
{
   "amount": 2
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
   "message": "Successfully Edit Amount"
}
```


If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty"
    }
]
```

If request failed because project not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 14. DELETE /api/carts/:productId

    Delete products on cart

* **EXAMPLE URL:**

http://localhost:3000/api/carts/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
     "messages": "Successfully deleted cart"
}
```

If request failed because project not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

# -- TRANSACTION --

## 15. GET /api/transactions

    Get all transactions

* **EXAMPLE URL:**

http://localhost:3000/api/transactions

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
[
    {
        "id": 1,
        "products": [
            "Arduino Uno",
            "Arduino Mega"
        ],
        "status": false,
        "date": "27 February 2020",
        "amount": [
            1,
            6
        ],
        "UserId": 2,
        "createdAt": "2020-02-27T04:25:29.827Z",
        "updatedAt": "2020-02-27T04:25:29.827Z"
    }
]
```

If request failed caused no data found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 16. POST /api/transactions

    Add transaction, update stock product, and delete the whole cart

* **EXAMPLE URL:**

http://localhost:3000/api/transactions

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "message": "Succesfully checkout!"
}
```

If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_is_empty>>"
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 