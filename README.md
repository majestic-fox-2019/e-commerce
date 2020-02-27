# Disekrip dokumentasi API

# Deploy pages

clientadmin : https://disekrip-commerce-cms.firebaseapp.com/<br>
clientuser : https://disekrip-commerce-client.firebaseapp.com/<br>
server : https://disekrip-cms.herokuapp.com/

# Route Users

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /users/register     | POST    | none            | register user
| /users/admin     | GET    | none            | get all user data
| /users/admin     | POST    | none            | create admin
| /users/admin/login     | POST    | none            | Login local
| /users/admin/:user_id     | PUT    | user_id            | Update user data admin only
| /users/admin/:user_id     | DELETE    | user_id            | Delete user data admin only
| /users/detail/:user_id     | GET    | user_id            | Get user detail

## 1. Path users/register (POST METHOD) // Register User

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/users/register)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| name       | STRING    | required
| email | STRING    | required
| password      | INTEGER   | required
| roles      | INTEGER   | required

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 1,
    "name": "Arona Nur Tatula",
    "email": "arona.nur@gmail.com",
    "password": "$2a$10$aAZi5/rR4JPdCL0.DVDXVeQb4iTftFe9yJvRzZFm/8bmayM6h/qzO",
    "roles" : "user"
    "updatedAt": "2020-02-14T17:19:03.018Z",
    "createdAt": "2020-02-14T17:19:03.018Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "name": "Name is required!",
    "email": "Incorrect email format!",
    "password": "Password is required!",
    "roles" : "Roles is required!"
}
```

## 2. Path users/admin (GET METHOD) // Get All User Data

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/users/admin)
```
## Request Body
**Request Body** is empty.

## Parameter
**Parameter** is empty.

## Query String
| Query       | Data type |
| ----------- | --------- |
| name | STRING |

## Response 

## 1. Status Code 200 (OK)

```javascript
[
    {
        "id": 1,
        "name": "Admin E-Commerce",
        "email": "admin@mail.com",
        "password": "$2a$10$x4Id6XUnITmguxZDYqKiR.OUxvVfYI2efisdZ035h0vedO8yFRLO.",
        "roles": "admin",
        "createdAt": "2020-02-22T09:59:48.597Z",
        "updatedAt": "2020-02-22T09:59:48.597Z"
    },
    {
        "id": 2,
        "name": "Admin 2",
        "email": "admin2@gmail.com",
        "password": "$2a$10$/GZVBH8XYJCQbSpy.Blsd.ijX/b.IytvTQn0iSLtT7t8qai9jG6Vm",
        "roles": "admin",
        "createdAt": "2020-02-22T10:09:29.102Z",
        "updatedAt": "2020-02-22T10:09:38.359Z"
    }
]
```
## 2. Status Code 200 But user is empty

```javascript
"User is empty!"
```

## 3. Path users/admin (POST METHOD) // Create Admin

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/users/admin)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| name       | STRING    | required
| email | STRING    | required
| password      | INTEGER   | required

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 2,
    "name": "Admin",
    "email": "admin@gmail.com",
    "roles" : "admin"
    "password": "$2a$10$aAZi5/rR4JPdCL0.DVDXVeQb4iTftFe9yJvRzZFm/8bmayM6h/qzO",
    "updatedAt": "2020-02-14T17:19:03.018Z",
    "createdAt": "2020-02-14T17:19:03.018Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "name": "Name is required!",
    "email": "Incorrect email format!",
    "password": "Password is required!",
}
```

## 4. Path users/admin/Login (POST METHOD)

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/users/admin/login)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| name       | STRING    | required
| email | STRING    | required
| password      | INTEGER   | required


## Parameter
**Parameter** is empty.

## Query String


## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "email": "arona.nur.tetulis@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFyb25hIE51ciBUZXR1bGlzIiwiZW1haWwiOiJhcm9uYS5udXIudGV0dWxpc0BnbWFpbC5jb20iLCJpYXQiOjE1ODE3MDAzNTZ9.8rJJPzP6M1ztuO8eXs7L2dgC5X5_kUGXqriWPCB5LME"
} 
```
## 2. Status Code 404 (No Data / Not Found)

```javascript
1. "Email doesn't exist!" (email doesnt exist)
2. "Wrong email or password!" (wrong password)
```

## 5. Path users/admin/:user_id (PUT METHOD) // Update User

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/users/admin/:user_id)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| name       | STRING    | required
| email | STRING    | required
| password      | INTEGER   | required

## Parameter
| Query       | Data type |
| ----------- | --------- |
| user_id | INTEGER |


## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 2,
    "name": "Admin Baru",
    "email": "admin@gmail.com",
    "roles" : "admin"
    "password": "$2a$10$aAZi5/rR4JPdCL0.DVDXVeQb4iTftFe9yJvRzZFm/8bmayM6h/qzO",
    "updatedAt": "2020-02-14T17:19:03.018Z",
    "createdAt": "2020-02-14T17:19:03.018Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "name": "Name is required!",
    "email": "Incorrect email format!",
    "password": "Password is required!",
}
```

## 3. Status Code 404 (User not found)

```javascript
"User doesn't exist!"
```

## 6. Path users/admin/:user_id (DELETE METHOD) // DELETE User

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/users/admin/:user_id)
```
## Request Body
**Request body** is empty

## Parameter
| Query       | Data type |
| ----------- | --------- |
| user_id | INTEGER |


## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 2,
    "name": "Admin Baru",
    "email": "admin@gmail.com",
    "roles" : "admin"
    "password": "$2a$10$aAZi5/rR4JPdCL0.DVDXVeQb4iTftFe9yJvRzZFm/8bmayM6h/qzO",
    "updatedAt": "2020-02-14T17:19:03.018Z",
    "createdAt": "2020-02-14T17:19:03.018Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
"User doesn't exist!"
```

## 7. Path users/detail/:user_id (GET METHOD) // Detail User

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/users/detail/:user_id)
```
## Request Body
**Request body** is empty

## Parameter
| Query       | Data type |
| ----------- | --------- |
| user_id | INTEGER |


## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 1,
    "name": "Arona Nur Tatula",
    "email": "arona.nur.tetulis@gmail.com",
    "roles" : "user"
    "password": "$2a$10$aAZi5/rR4JPdCL0.DVDXVeQb4iTftFe9yJvRzZFm/8bmayM6h/qzO",
    "updatedAt": "2020-02-14T17:19:03.018Z",
    "createdAt": "2020-02-14T17:19:03.018Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
"User doesn't exist!"
```

# Route Products

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /products/     | POST    | none            | get all products
| /products/admin | POST | none | Create Products
| /products/admin/:product_id | PUT | product_id | Update products
| /products/admin/:product_id | PATCH | product_id | Update status products into published or unpublished
| /products/admin/:product_id | DELETE | product_id | Delete products
| /products/detail/:product_id | GET | product_id | Get products id

## 1. Path products/ (Get METHOD) // Get Products

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/products/)
```
## Request Body
**Request Body** is empty.


## Parameter
**Parameter** is empty.

## Query String
| Query       | Data type |
| ----------- | --------- |
| name | String |

## Response 

## 1. Status Code 200 (OK)

```javascript
[
    {
        "id": 1,
        "name": "Hp xiaomi",
        "image_url": "https://storage.googleapis.com/storage-example/arona/1582366208791.png",
        "price": 200000,
        "stock": 1,
        "CategoryId": 1,
        "description": "1",
        "status_product": "published",
        "createdAt": "2020-02-22T10:10:09.181Z",
        "updatedAt": "2020-02-22T10:10:09.181Z",
        "Category": {
            "id": 1,
            "category_name": "Elektronik",
            "createdAt": "2020-02-22T09:59:48.617Z",
            "updatedAt": "2020-02-22T09:59:48.617Z"
        }
    }
]
```
## 3. Status Code 200 (Product is empty!)

```javascript
{
    "message": "Product is empty!"
}
```

## 2. Path products/admin (POST METHOD) // Create Products

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/users/admin)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| name       | STRING    | required
| image_url | STRING    | -
| price      | INTEGER   | required & must be a number
| stock      | INTEGER   | required & must be a number
| CategoryId      | INTEGER   | required
| description      | INTEGER   | required
| status_product      | INTEGER   | (default value is published)

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 3,
    "name": "Hp baru",
    "image_url": "https://storage.googleapis.com/storage-example/arona/1582366208791.png",
    "price": 100000,
    "stock": 10,
    "CategoryId": 2,
    "description": "Hp baru nih",
    "status_product": "published",
    "updatedAt": "2020-02-22T13:10:44.649Z",
    "createdAt": "2020-02-22T13:10:44.649Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "name": "Product name is required!",
    "price": "Price must be a number!",
    "stock": "Stock must be a number!",
    "CategoryId": "Category is required!",
    "description": "Description is required!"
}
```

## 3. Path products/admin/:product_id (PUT METHOD) // Create Products

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/products/admin/:product_id)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| name       | STRING    | required
| image_url | STRING    | -
| price      | INTEGER   | required & must be a number
| stock      | INTEGER   | required & must be a number
| CategoryId      | INTEGER   | required
| description      | INTEGER   | required
| status_product      | INTEGER   | (default value is published)

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 3,
    "name": "Hp baru update",
    "image_url": "https://storage.googleapis.com/storage-example/arona/1582366208791.png",
    "price": 100000,
    "stock": 10,
    "CategoryId": 2,
    "description": "Hp baru nih",
    "status_product": "published",
    "updatedAt": "2020-02-22T13:10:44.649Z",
    "createdAt": "2020-02-22T13:10:44.649Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "name": "Product name is required!",
    "price": "Price must be a number!",
    "stock": "Stock must be a number!",
    "CategoryId": "Category is required!",
    "description": "Description is required!"
}
```

## 3. Status Code 404 (Products Not Found)

```javascript
{
    "error": "Product doesn't exist!"
}
```

## 4. Path products/admin/:product_id (PATCH METHOD) // Update Status Products

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/products/admin/:product_id)
```
## Request Body
**Request body** is empty.

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 2,
    "name": "Hp xiamo 2",
    "image_url": "",
    "price": 20000,
    "stock": 1,
    "CategoryId": 1,
    "description": "111",
    "createdAt": "2020-02-22T10:12:53.835Z",
    "updatedAt": "2020-02-22T13:18:31.849Z",
    "status_product": "unpublished"
}
```
## 2. Status Code 404 (Products Not Found)

```javascript
{
    "error": "Product doesn't exist!"
}
```

## 5. Path products/admin/:product_id (DELETE METHOD) // Delete Products

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/products/admin/:product_id)
```
## Request Body
**Request body** is empty.

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 2,
    "name": "Hp xiamo 2",
    "image_url": "",
    "price": 20000,
    "stock": 1,
    "CategoryId": 1,
    "description": "111",
    "createdAt": "2020-02-22T10:12:53.835Z",
    "updatedAt": "2020-02-22T13:18:31.849Z",
    "status_product": "unpublished"
}
```
## 2. Status Code 404 (Products Not Found)

```javascript
{
    "error": "Product doesn't exist!"
}
```

## 6. Path products/detail/:product_id (GET METHOD) // Delete Products

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/products/detail/:product_id)
```
## Request Body
**Request body** is empty.

## Parameter
**Parameter** is empty.

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 1,
    "name": "Hp xiaomi",
    "image_url": "https://storage.googleapis.com/storage-example/arona/1582366208791.png",
    "price": 200000,
    "stock": 1,
    "CategoryId": 1,
    "description": "1",
    "status_product": "published",
    "createdAt": "2020-02-22T10:10:09.181Z",
    "updatedAt": "2020-02-22T10:10:09.181Z"
}
```
## 2. Status Code 404 (Products Not Found)

```javascript
{
    "error": "Product doesn't exist!"
}
```

# Route Categories

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /categories/     | GET    | none            | get all categories
| /categories/ | POST | none | create category
| /categories/ | PUT | category_id | create category
| /categories/ | DELETE | category_id | create category


## 1. Path categories/ (Get METHOD) // Get Categories

## Authentication
  Headers **token** is required

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/categoies/)
```
## Request Body
**Request Body** is empty.


## Parameter
**Parameter** is empty.

## Query String
| Query       | Data type |
| ----------- | --------- |
| status(category_name) | String |

## Response 

## 1. Status Code 200 (OK)

```javascript
[
    {
        "id": 1,
        "category_name": "Elektronik",
        "createdAt": "2020-02-22T09:59:48.617Z",
        "updatedAt": "2020-02-22T09:59:48.617Z"
    },
    {
        "id": 2,
        "category_name": "Fashion",
        "createdAt": "2020-02-22T09:59:48.617Z",
        "updatedAt": "2020-02-22T09:59:48.617Z"
    },
    {
        "id": 3,
        "category_name": "ATK",
        "createdAt": "2020-02-22T09:59:48.617Z",
        "updatedAt": "2020-02-22T09:59:48.617Z"
    }
]
```
## 2. Status Code 200 (Product is empty!)

```javascript
{
    message : 'Category is empty!'
}
```

## 2. Path categories/admin (POST METHOD) // Create Category

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/categoies/)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| category_name       | STRING    | required


## Parameter
**Parameter** is empty.

## Query String
**Query string** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 4,
    "category_name": "gadget",
    "updatedAt": "2020-02-22T13:57:32.608Z",
    "createdAt": "2020-02-22T13:57:32.608Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "category_name": "Category name is required!"
}
```

## 3. Path categories/admin/:category_id (PUT METHOD) // Update Category

## Authentication
  Headers **token** is required

## Authorization
**Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/categoies/)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| category_name       | STRING    | required

## Parameter
**Parameter** is empty.

## Query String
**Query string** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 4,
    "category_name": "Gadgets",
    "createdAt": "2020-02-22T13:57:32.608Z",
    "updatedAt": "2020-02-22T14:09:32.415Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "category_name": "Category name is required!"
}
```

## 3. Path categories/admin/:category_id (DELETE METHOD) // Delete Category

## Authentication
  Headers **token** is required

## Authorization
 **Admin** Only

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/categoies/)
```
## Request Body
| Field       | Data type | Validation Type
| ----------- | --------- | ---------
| category_name       | STRING    | required

## Parameter
**Parameter** is empty.

## Query String
**Query string** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "id": 4,
    "category_name": "Gadgets",
    "createdAt": "2020-02-22T13:57:32.608Z",
    "updatedAt": "2020-02-22T14:09:32.415Z"
}
```
## 2. Status Code 400 (Request Body Doesnt Complete The Validation)

```javascript
{
    "category_name": "Category name is required!"
}
```

# Route Transaction

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /transaction/:user_id | GET    | user_id            | Get transaction data
| /transaction/:user_id | PUT | user_id | Checkout Transaction
| /transaction/:user_id/:product_id | POST | user_id, product_id | Add Transaction
| /transaction/:user_id/:transaction_id | DELETE | category_id | Delete Transaction
| /transaction/:user_id/:product_id/:transaction_id | Patch | category_id | Patch transaction quantity

## 1. Path transaction/:user_id (Get METHOD) // Get All transaction from the user

## Authentication
  Headers **token** is required

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/transaction/:user_id)
```
## Request Body
**Request Body** is empty.


## Parameter
| params       | Data type |
| ----------- | --------- |
| user_id | Integer |

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
[
    {
        "id": 33,
        "ProductId": 12,
        "UserId": 39,
        "qty": 1,
        "total": 2000000,
        "status": "unhandled",
        "createdAt": "2020-02-27T05:33:07.792Z",
        "updatedAt": "2020-02-27T05:33:07.792Z",
        "User": {
            "id": 39,
            "name": "Arona Tetulis",
            "email": "aronatetulis@gmail.com",
            "password": "$2a$10$Ofi3TWrmChJYeme6.b8UVerTJem0XVR7SjRkYqo79DJA4xSUO5/Ke",
            "roles": "user",
            "createdAt": "2020-02-26T05:27:51.287Z",
            "updatedAt": "2020-02-26T05:27:51.287Z"
        },
        "Product": {
            "id": 12,
            "name": "Hp xiaomi note 8",
            "image_url": "https://storage.googleapis.com/storage-example/arona/1582358468845.png",
            "price": 2000000,
            "stock": 1,
            "CategoryId": 1,
            "description": "Hp baru",
            "status_product": "published",
            "createdAt": "2020-02-22T08:01:08.874Z",
            "updatedAt": "2020-02-27T05:15:58.953Z"
        }
    }
]
```

## 2. Path transaction/:user_id (PUT METHOD) // Checkout Transaction

## Authentication
  Headers **token** is required

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/transaction/:user_id)
```
## Request Body
| params       | Data type |
| ----------- | --------- |
| cart | array of object |


## Parameter
| params       | Data type |
| ----------- | --------- |
| user_id | Integer |


## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
'Success checkout'
```

## 2. Status Code 400 (Out Of Stock)

```javascript
'Out of stock'
```

## 3. Path transaction/:user_id (POST METHOD) // Create Transaction

## Authentication
  Headers **token** is required

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/transaction/:user_id/:product_id)
```
## Request Body
| params       | Data type |
| ----------- | --------- |
| qty | integer |


## Parameter
| params       | Data type |
| ----------- | --------- |
| user_id | Integer |
| product_id | Integer |

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
{
    "message": "Created new cart",
    "body": {
        "id": 34,
        "ProductId": 20,
        "UserId": 39,
        "qty": 1,
        "status": "unhandled",
        "updatedAt": "2020-02-27T05:53:02.289Z",
        "createdAt": "2020-02-27T05:53:02.289Z",
        "total": 8000000
    }
}
```
 ### Tidak terdapat validasi karena ketika tidak disii otomatis keisi nilai 1

## 4. Path transaction/:user_id/:transaction_id (DELETE METHOD) // Delete transaction

## Authentication
  Headers **token** is required

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/transaction/:user_id/:transaction_id)
```
## Request Body
**Request Body** is empty.


## Parameter
| params       | Data type |
| ----------- | --------- |
| user_id | Integer |
| transaction_id | Integer |

## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
[
    1 //item terhapus
]
```

## 5. Path transaction/:user_id/:product_id/:transaction_id (DELETE METHOD) // Delete transaction

## Authentication
  Headers **token** is required

## Path

```javascript
    [GitHub](https://disekrip-cms.herokuapp.com/transaction/:user_id/:product_id/:transaction_id)
```
## Request Body
| params       | Data type |
| ----------- | --------- |
| qty | integer |


## Parameter
| params       | Data type |
| ----------- | --------- |
| user_id | Integer |
| product_id | Integer |
| transaction_id | Integer |


## Query String
**Query String** is empty.

## Response 

## 1. Status Code 200 (OK)

```javascript
[
    {
        "id": 33,
        "ProductId": 12,
        "UserId": 39,
        "qty": 1,
        "total": 2000000,
        "status": "unhandled",
        "createdAt": "2020-02-27T05:33:07.792Z",
        "updatedAt": "2020-02-27T05:58:30.260Z"
    }
]
```