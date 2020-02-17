Link Deploy:



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
    "password": "<<your_password>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "name": "Fajrin Noor Rachman",
    "password": "12345"
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

## 

# -- PRODUCTS --

## 4. POST /api/products

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
    "name": "Adidas Predator",
    "image_url": "https://adidas.com/predator",
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
    "title": "Adidas Predator",
    "description": "https://adidas.com/predator",
    "category": "1300000",
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


## 5. GET /api/products

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
        "title": "Adidas Predator",
        "image_url": "https://adidas.com/predator",
        "price": "1300000",
        "stock": 5,
        "createdAt": "2020-02-13T21:51:09.910Z",
        "updatedAt": "2020-02-13T21:51:09.910Z",
    },
    {
        "id": 2,
        "title": "Arduino Uno",
        "image_url": "https://arduino.com/uno",
        "price": "500000"
        "stock": 5,
        "createdAt": "2020-02-13T23:53:54.353Z",
        "updatedAt": "2020-02-13T23:53:54.353Z",
    }
]
```

If request success but theres no data found:

* Status Code: 404

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

## 6. GET /api/products/:id 

    Get product by id

* **EXAMPLE URL:**

http://localhost:3000/api/products/1

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
      "id": 1,
      "title": "Adidas Predator",
      "image_url": "https://adidas.com/predator",
      "price": "1300000",
      "stock": 5,
      "createdAt": "2020-02-13T21:51:09.910Z",
      "updatedAt": "2020-02-13T21:51:09.910Z"
}
```

If request success but theres no data found:

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

## 7. PUT /api/products/:id

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
    "title": "Adidas Predator",
    "image_url": "https://adidas.com/predator",
    "price": "1350000"
    "stock": 6,
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "title": "Adidas Predator",
    "image_url": "https://adidas.com/predator",
    "price": "1350000"
    "stock": 6,
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

## 8. DELETE /api/products/:id

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
      "id": 1,
      "title": "Adidas Predator",
      "image_url": "https://adidas.com/predator",
      "price": "1300000",
      "stock": 5,
      "createdAt": "2020-02-13T21:51:09.910Z",
      "updatedAt": "2020-02-13T21:51:09.910Z"
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