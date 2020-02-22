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