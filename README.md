# e-commerce FACE UP
<br>

| Method      | Route   | Description |
| --------- | ------- | ------- |
| POST | /register | Registration page for user |
| POST | /login | Login for user and admin|
| GET | /products | Show all products |
| POST | /products | Add a new product |
| GET | /products/:id | Show one product by id |
| PUT | /products/:id | Update one product |
| DELETE | /products/:id | Delete one product |
| GET | /categories | Show all categories |
| POST | /categories | Add new category |
| GET | /categories/:id | Show one category by id |
| PUT | /categories/:id | Update selected category |
| DELETE | /categories/:id | Delete selected category |
| POST | /carts/:ProductId | Add new product to cart |
| GET | /carts | Show user carts |
| PUT | /carts | Checkout user carts |
| DELETE | /carts/:ProductId | Delete selected product from cart |
| PUT | /carts/:ProductId | Update selected product from cart |

<br>

### **POST /register**
---
*Create a new user.*
> Request Body:
* Schema

  Value:
    - name: string,
    - email: string,
    - password: string,

  Example
    ```javascript
    {
    "name": "Ajeng",
    "email": "ajeng@gmail.com"
    "password": "ajenghacktiv8"
    }
    ```

<br>

> Response:
* 201


  Example:
  ```javascript
  {
    "id": 6,
    "name": "Ajeng",
    "email": "ajeng@gmail.com"
    "password": "$2a$10$.nhegcxKFs56KKw1XTOf..fptzznZT4.ZshIwlNz5Uuvg7tGRcrCu",
    "updatedAt": "2020-02-14T17:46:58.266Z",
    "createdAt": "2020-02-14T17:46:58.266Z"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "email": "E-mail should not be empty!"
  } 
  ```

* 500

<br>

### **POST /login**
---
*User login.*
> Request Body:
* Schema

  Value:
    - email: string,
    - password: string,

  Example
    ```javascript
    {
    "email": "ajeng@gmail.com"
    "password": "ajenghacktiv8"
    }
    ```

<br>

> Response:
* 201

  Example:
  ```javascript
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4MjM2MTAyOX0.5qzFgjsecNAoSDsWSmUJx9jThv179RfSJsgL_m7q6NI",
    "role": "user",
    "name": "Ajeng" 
  }
  ```

* 400

  Example:
  ```javascript
  "Invalid email / password!"
  ```

* 404

  Example:
  ```javascript
  "User not found!" 
  ```

* 500

<br>

---
*Admin login.*
> Request Body:
* Schema

  Value:
    - email: string,
    - password: string,

  Example
    ```javascript
    {
    "email": "admin@mail.com"
    "password": "admin12345"
    }
    ```

<br>

> Response:
* 201

  Example:
  ```javascript
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4MjM2MTAyOX0.5qzFgjsecNAoSDsWSmUJx9jThv179RfSJsgL_m7q6NI",
    "role": "admin",
    "name": "Admin"
  }
  ```

* 400
  Example:
  ```javascript
  "Invalid email / password!"
  ```

* 500

<br>

### **GET /products**
---
*Show all products list.*

> Response:
* 200

  Example:
  ```javascript
  [
    {
        "id": 18,
        "name": "Milani Perfect 2-in-1 Foundation",
        "image": "https://images.ulta.com/is/image/Ulta/2529590?op_sharpen=1&resMode=bilin&qlt=85&wid=800&hei=800&fmt=jpg",
        "price": 1200000,
        "stock": 17,
        "CategoryId": 1,
        "createdAt": "2020-02-22T05:59:09.622Z",
        "updatedAt": "2020-02-22T05:59:09.622Z",
        "Category": {
            "id": 1,
            "name": "Face",
            "createdAt": "2020-02-19T08:47:28.157Z",
            "updatedAt": "2020-02-19T08:47:28.157Z"
        }
    }
  ]
  ```

* 500

<br>

### **POST /products**
---
*Create a new products.*
> Request Body:
* Schema

  Value:
    - name: string,
    - image: string,
    - price: integer,
    - stock: integer,
    - CategoryId: integer

  Example
  ```javascript
  {
    "id": 28,
    "name": "bb cream",
    "image": "http://bbcream.png",
    "price": 15000000,
    "stock": 100,
    "CategoryId": 1,
    "updatedAt": "2020-02-22T10:06:02.575Z",
    "createdAt": "2020-02-22T10:06:02.575Z"
  }
  ```
<br>

> Response:
* 201

  Example:
  ```javascript
  {
    "id": 28,
    "name": "bb cream",
    "image": "http://bbcream.png",
    "price": 15000000,
    "stock": 100,
    "CategoryId": 1,
    "updatedAt": "2020-02-22T10:06:02.575Z",
    "createdAt": "2020-02-22T10:06:02.575Z"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Validation error:  Name should not be empty"
  }
  ```

* 500

<br>


<br>

### **GET /products/:id**
---
*Show products list by id.*
> Request Params:

  id: integer <br>
  example: http://localhost:3000/products/20

<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 20,
    "name": "MAC Powder Blush",
    "image": "https://m.maccosmetics.com/media/export/cms/products/640x600/mac_sku_M22017_640x600_0.jpg",
    "price": 325000,
    "stock": 25,
    "CategoryId": 12,
    "createdAt": "2020-02-22T06:03:44.675Z",
    "updatedAt": "2020-02-22T09:10:01.393Z"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Not found!"
  }
  ```

<br>

### **PUT /products/:id**
---
*Update products list by id.*

> Request params:<br>

  id: integer <br>
  example: http://localhost:3000/products/20

<br>

> Request Body:
* Schema

  Value:
    - name: string,
    - image: string,
    - price: integer,
    - stock: integer,
    - CategoryId: integer,
<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 20,
    "name": "MAC Powder Blush",
    "image": "https://m.maccosmetics.com/media/export/cms/products/640x600/mac_sku_M22017_640x600_0.jpg",
    "price": 325000,
    "stock": 25,
    "CategoryId": 12,
    "createdAt": "2020-02-22T06:03:44.675Z",
    "updatedAt": "2020-02-22T09:10:01.393Z"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Validation error: Name must be filled!"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Error 404, Not found!"
  }
  ```

* 500

<br>

### **DELETE /products/:id**
---
*Delete products list by id.*

> Request params: <br>

  id: integer <br>
  example: http://localhost:3000/products/3

<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 20,
    "name": "MAC Powder Blush",
    "image": "https://m.maccosmetics.com/media/export/cms/products/640x600/mac_sku_M22017_640x600_0.jpg",
    "price": 325000,
    "stock": 25,
    "CategoryId": 12,
    "createdAt": "2020-02-22T06:03:44.675Z",
    "updatedAt": "2020-02-22T09:10:01.393Z"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Error 404, Not found!"
  }
  ```

* 500

<br>

### **GET /categories**
---
*Show all categories.*

> Response:
* 200

  Example:
  ```javascript
  [
    {
        "id": 1,
        "name": "Face",
        "createdAt": "2020-02-19T08:47:28.157Z",
        "updatedAt": "2020-02-19T08:47:28.157Z"
    },
    {
        "id": 2,
        "name": "Lips",
        "createdAt": "2020-02-19T08:47:28.157Z",
        "updatedAt": "2020-02-19T08:47:28.157Z"
    }
  ]
  ```

* 500

<br>

### **POST /categories**
---
*Create a new categories.*
> Request Body:
* Schema

  Value:
    - name: string,

  Example
  ```javascript
  {
    "name": "Blush",
  }
  ```
<br>

> Response:
* 201

  Example:
  ```javascript
  {
    "id": 13,
    "name": "Blush",
    "updatedAt": "2020-02-22T10:13:50.686Z",
    "createdAt": "2020-02-22T10:13:50.686Z"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Validation error:  Name should not be empty"
  }
  ```

* 500

<br>


<br>

### **GET /categories/:id**
---
*Show categories list by id.*
> Request Params:

  id: integer <br>
  example: http://localhost:3000/categories/1

<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 1,
    "name": "Face",
    "createdAt": "2020-02-19T08:47:28.157Z",
    "updatedAt": "2020-02-19T08:47:28.157Z",
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Not found!"
  }
  ```

<br>

### **PUT /categories/:id**
---
*Update categories list by id.*

> Request params:<br>

  id: integer <br>
  example: http://localhost:3000/categories/1

<br>

> Request Body:
* Schema

  Value:
    - name: string,
<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 1,
    "name": "Face",
    "createdAt": "2020-02-19T08:47:28.157Z",
    "updatedAt": "2020-02-19T08:47:28.157Z",
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Validation error: Name must be filled!"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Error 404, Not found!"
  }
  ```

* 500

<br>

### **DELETE /categories/:id**
---
*Delete categories list by id.*

> Request params: <br>

  id: integer <br>
  example: http://localhost:3000/categories/1

<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 1,
    "name": "Face",
    "createdAt": "2020-02-19T08:47:28.157Z",
    "updatedAt": "2020-02-19T08:47:28.157Z",
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Error 404, Not found!"
  }
  ```

* 500

<br>

### **GET /carts**
---
*Show all carts.*

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 2,
    "name": "tes",
    "email": "tes@mail.com",
    "password": "$2a$10$C2xUw6o6r1Zp.W2BUtmLROoY12fTl03YcbgOXojGoy4j/BVVpMlmG",
    "role": "user",
    "createdAt": "2020-02-25T05:47:05.779Z",
    "updatedAt": "2020-02-25T05:47:05.779Z",
    "Products": [
        {
            "id": 3,
            "name": "Benefit Gimme Brow+ Volumizing Eyebrow Gel",
            "image": "https://images.ulta.com/is/image/Ulta/2529256_prod_altimg_1?op_sharpen=1&resMode=bilin&qlt=85&wid=800&hei=800&fmt=jpg",
            "price": 350000,
            "stock": 18,
            "rating": null,
            "CategoryId": 3,
            "createdAt": "2020-02-25T05:41:13.109Z",
            "updatedAt": "2020-02-27T04:13:17.981Z",
            "UserProduct": {
                "UserId": 2,
                "ProductId": 3,
                "amount": 1,
                "createdAt": "2020-02-27T04:29:49.014Z",
                "updatedAt": "2020-02-27T04:29:49.014Z"
            }
        }
    ]
  }
  ```

* 500

<br>

### **POST /carts**
---
*Create a new carts.*
> Request Params:
* ProductId: Integer

  Example
  ```javascript
    http://localhost:3000/carts/1
  ```
<br>

> Response:
* 201

  Example:
  ```javascript
  {
    "ProductId": 1,
    "UserId": 2,
    "amount": 1,
    "updatedAt": "2020-02-27T04:39:38.668Z",
    "createdAt": "2020-02-27T04:39:38.668Z",
    "id": 1
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Invalid token!"
  }
  ```

* 500

<br>


### **PUT /carts/:ProductId**
---
*Update cart list by ProductId.*
> Request Params:
* ProductId: Integer

  Example
  ```javascript
    http://localhost:3000/carts/3
  ```
<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 136,
    "UserId": 2,
    "ProductId": 3,
    "amount": 3,
    "createdAt": "2020-02-27T04:29:49.014Z",
    "updatedAt": "2020-02-27T04:41:07.471Z"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Amount can't be 0!"
  }
  ```

* 500

<br>



### **PUT /carts**
---
*Checkout all product in carts.*

> Response:
* 200

  Example:
  ```javascript
  [
    10
  ]
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Out of Stock!"
  }
  
  ```

* 500

<br>

### **DELETE /carts/:ProductId**
---
*Delete product in carts by ProductId.*

> Request Params:
* ProductId: Integer

  Example
  ```javascript
    http://localhost:3000/carts/3
  ```
<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "message": "succesfully delete item!"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Item not found!"
  }
  ```

* 500