# e-commerce
E-Commerce CMS

## POST Register

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/register"
```

- Request Body
```
{
  "name": "Muhammad Anova",
  "email": "anova@gmail.com",
  "password": "asdqweasd",
  "role": "superadmin"
}
```
- Response
```
status code (200) :
{
  "code": 201,
  "message": "Register user successfull",
  "payload": {
    "id": 1,
    "name": "Muhammad Anova",
    "email": "anova@gmail.com",
    "password": "$2b$10$Xnu1yq7J7Ko8YuevAUcn1Of9NXVzmjgnyUpi6Aayw8cnNlriwo5dC",
    "role": "superadmin",
    "updatedAt": "2020-02-22T07:18:11.592Z",
    "createdAt": "2020-02-22T07:18:11.592Z"
  }
}

status code (400) :
{
  "name": "Name must be filled",
  "email": "Email must be filled",
  "password": "Password must be filled",
  "role": "Role must be filled"
}

status code (500) :
{
  "message": "Error not found"
}
```

## POST Login

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/login"
```

- Request Body
```
{
  "email": "anova@gmail.com",
  "password": "asdqweasd"
}
```

- Response
```
status code (200) :
{
  "code": 200,
  "message": "Login successfull",
  "payload": {
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODIzNTA3Nzl9.cVciaUfWrnLr4EXtBGhNbi5WecjTYL-dIdW1g2_Fn0I",
    "users": {
        "name": "Muhammad Anova Nurfaqih",
        "email": "anova@gmail.com",
        "role": "superadmin"
    }
  }
}

status code (400) :
{
  "email": 'Email must be filled',
  "password": 'Password must be filled'
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Users

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/users"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get data user successfull",
  "payload": [
    {
      "id": 2,
      "name": "Anova Nurfaqih",
      "email": "anov@gmail.com",
      "role": "admin",
      "createdAt": "2020-02-22T07:44:57.199Z",
      "updatedAt": "2020-02-22T07:45:59.526Z"
    },
    {
      "id": 1,
      "name": "Muhammad Anova",
      "email": "anova@gmail.com",
      "role": "superadmin",
      "createdAt": "2020-02-22T07:18:11.592Z",
      "updatedAt": "2020-02-22T07:18:11.592Z"
    }
  ]
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## POST User

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/user"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Request Body
```
{
  "name": "Muhammad Anova",
  "email": "anova@gmail.com",
  "password": "asdqweasd",
  "role": "superadmin"
}
```
- Response
```
status code (200) :
{
  "code": 201,
  "message": "Register user successfull",
  "payload": {
    "id": 1,
    "name": "Muhammad Anova",
    "email": "anova@gmail.com",
    "password": "$2b$10$Xnu1yq7J7Ko8YuevAUcn1Of9NXVzmjgnyUpi6Aayw8cnNlriwo5dC",
    "role": "superadmin",
    "updatedAt": "2020-02-22T07:18:11.592Z",
    "createdAt": "2020-02-22T07:18:11.592Z"
  }
}

status code (400) :
{
  "name": "Name must be filled",
  "email": "Email must be filled",
  "password": "Password must be filled",
  "role": "Role must be filled"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET DETAIL User

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/user/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get detail user successfull",
  "payload": {
    "id": 1,
    "name": "Muhammad Anova",
    "email": "anova@gmail.com",
    "role": "superadmin",
    "createdAt": "2020-02-22T07:18:11.592Z",
    "updatedAt": "2020-02-22T07:18:11.592Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "User not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## PUT Edit User

```
Method : "PUT"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/user/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Request Body
```
{
  "name": "Muhammad Anova",
  "email": "anova@gmail.com",
  "role": "superadmin"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Update user successfull",
  "payload": {
    "id": 1,
    "name": "Muhammad Anova",
    "email": "anova@gmail.com",
    "password": "$2b$10$1CG4Gy9E2TtmXdwwncYlMuC8sAqIda55EBe6Ud8k7EvyQYCGFZ386",
    "role": "superadmin",
    "createdAt": "2020-02-22T07:18:11.592Z",
    "updatedAt": "2020-02-22T07:18:11.592Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "User not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## PATCH Change Password User

```
Method : "Patch"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/user/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Request Body
```
{
  "password": "asdqweasd"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Change password user successfull"
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "User not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## DELETE User

```
Method : "DELETE"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/user/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Delete user successfull",
  "payload": {
    "id": 1,
    "name": "Muhammad Anova",
    "email": "anova@gmail.com",
    "password": "$2b$10$1CG4Gy9E2TtmXdwwncYlMuC8sAqIda55EBe6Ud8k7EvyQYCGFZ386",
    "role": "superadmin",
    "createdAt": "2020-02-22T07:18:11.592Z",
    "updatedAt": "2020-02-22T07:18:11.592Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "User not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Categories

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/categories"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get category list successfull",
  "payload": [
    {
      "id": 1,
      "name": "gadget",
      "createdAt": "2020-02-22T07:18:32.006Z",
      "updatedAt": "2020-02-22T07:18:32.006Z"
    },
    {
      "id": 2,
      "name": "electronic",
      "createdAt": "2020-02-22T07:24:37.396Z",
      "updatedAt": "2020-02-22T07:24:37.396Z"
    }
  ]
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## POST Category

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/category"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Request Body
```
{
  "name": "Gadget"
}
```
- Response
```
status code (200) :
{
  "code": 201,
  "message": "Create category successfull",
  "payload": {
    "id": 1,
    "name": "gadget",
    "updatedAt": "2020-02-22T07:18:32.006Z",
    "createdAt": "2020-02-22T07:18:32.006Z"
  }
}

status code (400) :
{
  "name": "Name must be filled"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET DETAIL Category

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/category/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get detail category successfull",
  "payload": {
    "id": 1,
    "name": "gadget",
    "createdAt": "2020-02-22T07:18:32.006Z",
    "updatedAt": "2020-02-22T07:18:32.006Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "Category not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## PUT Edit Category

```
Method : "PUT"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/category/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Request Body
```
{
  "name": "Gadget"
}
```
- Response
```
status code (201) :
{
  "code": 200,
  "message": "Update category successfull",
  "payload": {
    "id": 1,
    "name": "gadget",
    "createdAt": "2020-02-22T07:18:32.006Z",
    "updatedAt": "2020-02-22T07:18:32.006Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "Category not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## DELETE Category

```
Method : "DELETE"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/category/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Delete category successfull",
  "payload": {
    "id": 1,
    "name": "gadget",
    "createdAt": "2020-02-22T07:18:32.006Z",
    "updatedAt": "2020-02-22T07:18:32.006Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "Category not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Products

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/products"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get product list successfull",
  "payload": [
    {
      "id": 1,
      "name": "Macboook Pro 2019",
      "image_url": null,
      "price": 34000000,
      "stock": 15,
      "CategoryId": 1,
      "createdAt": "2020-02-22T07:25:32.119Z",
      "updatedAt": "2020-02-22T07:25:32.119Z",
      "Category": {
        "id": 1,
        "name": "gadget",
        "createdAt": "2020-02-22T07:18:32.006Z",
        "updatedAt": "2020-02-22T07:18:32.006Z"
      }
    }
  ]
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## POST Product

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/product"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Request Body
```
{
  "name": "Macbook Pro 2019",
  "image_url": "null",
  "price": 34000000,
  "stock": 10,
  "CategoryId": 1,
}
```
- Response
```
status code (201) :
{
  "code": 201,
  "message": "Create product successfull",
  "payload": {
    "id": 1,
    "name": "Macbook Pro 2019",
    "image_url": "null",
    "price": 34000000,
    "stock": 10,
    "CategoryId": 1,
    "updatedAt": "2020-02-22T07:18:32.006Z",
    "createdAt": "2020-02-22T07:18:32.006Z"
  }
}

status code (400) :
{
  "name": "Name must be filled"
  "image_url": "Image Url must be filled"
  "price": "Price must be filled"
  "stock": "Stock must be filled"
  "CategoriId": "CategoriId must be filled"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET DETAIL Product

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/product/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get detail product successfull",
  "payload": {
    "id": 1,
    "name": "Macbook Pro 2019",
    "image_url": null,
    "price": 34000000,
    "stock": 15,
    "CategoryId": 1,
    "createdAt": "2020-02-22T07:25:32.119Z",
    "updatedAt": "2020-02-22T08:26:48.573Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "Product not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## PUT Edit Product

```
Method : "PUT"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/product/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Update product successfull",
  "payload": {
    "id": 1,
    "name": "Macbook Pro 2019",
    "image_url": "null",
    "price": 34000000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2020-02-22T07:25:32.119Z",
    "updatedAt": "2020-02-22T09:58:57.379Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "Product not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## DELETE Product

```
Method : "DELETE"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/product/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Delete product successfull",
  "payload": {
    "id": 1,
    "name": "Macbook Pro 2019",
    "image_url": "null",
    "price": 34000000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2020-02-22T07:25:32.119Z",
    "updatedAt": "2020-02-22T09:58:57.379Z"
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "Product not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Transactions

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//admin/transactions"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get all transactions successfull",
  "payload": [
    {
      "id": 2,
      "code_transaction": 12262020,
      "name": "Muhammad Anova",
      "address": "Jl. Ahmad Yani No.47 Tanah Sareal Kota Bogor",
      "products": "Nike Air Force 1 Low 1pcs, Nike EXP-X14 1pcs",
      "total_price": 3600000,
      "createdAt": "2020-02-26T12:25:04.332Z",
      "updatedAt": "2020-02-26T12:25:04.332Z"
    },
    {
      "id": 3,
      "code_transaction": 22272020,
      "name": "Muhammad Anova",
      "address": "Jl. Iskandar Muda No 8",
      "products": "Nike Air Force 1 Low 1pcs",
      "total_price": 2000000,
      "createdAt": "2020-02-27T01:15:29.433Z",
      "updatedAt": "2020-02-27T01:15:29.433Z"
    }
  ]
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

E-Commerce Frontend

## POST Register

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//register"
```

- Request Body
```
{
  "name": "Muhammad Anova",
  "email": "anova@gmail.com",
  "password": "asdqweasd"
}
```
- Response
```
status code (200) :
{
  "code": 201,
  "message": "Register user successfull",
  "payload": {
    "id": 1,
    "name": "Muhammad Anova",
    "email": "anova@gmail.com",
    "role": "member",
    "updatedAt": "2020-02-22T07:18:11.592Z",
    "createdAt": "2020-02-22T07:18:11.592Z"
  }
}

status code (400) :
{
  "name": "Name must be filled",
  "email": "Email must be filled",
  "password": "Password must be filled",
  "role": "Role must be filled"
}

status code (500) :
{
  "message": "Error not found"
}
```

## POST Login

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//login"
```

- Request Body
```
{
  "email": "anova@gmail.com",
  "password": "asdqweasd"
}
```

- Response
```
status code (200) :
{
  "code": 200,
  "message": "Login successfull",
  "payload": {
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODIzNTA3Nzl9.cVciaUfWrnLr4EXtBGhNbi5WecjTYL-dIdW1g2_Fn0I",
    "users": {
        "name": "Muhammad Anova Nurfaqih",
        "email": "anova@gmail.com",
        "role": "member"
    }
  }
}

status code (400) :
{
  "email": 'Email must be filled',
  "password": 'Password must be filled'
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Categories

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//categories"
```

- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get category list successfull",
  "payload": [
    {
      "id": 1,
      "name": "sneakers",
      "createdAt": "2020-02-22T07:18:32.006Z",
      "updatedAt": "2020-02-22T07:18:32.006Z"
    },
    {
      "id": 2,
      "name": "shirts",
      "createdAt": "2020-02-22T07:24:37.396Z",
      "updatedAt": "2020-02-22T07:24:37.396Z"
    }
  ]
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Products

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//products"
```

- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get product list successfull",
  "payload": [
    {
      "id": 1,
      "name": "Nike Air Max 90",
      "image_url": "https://storage.googleapis.com/storage-example/anova/nike-air-max-90-new.jpg.png",
      "price": 3700000,
      "stock": 10,
      "CategoryId": 1,
      "createdAt": "2020-02-22T07:25:32.119Z",
      "updatedAt": "2020-02-25T14:12:08.560Z",
      "Category": {
        "id": 1,
        "name": "sneakers",
        "createdAt": "2020-02-22T07:18:32.006Z",
        "updatedAt": "2020-02-25T05:13:52.450Z"
      }
    },
    {
      "id": 3,
      "name": "Nike Mercurial Vapor 2019",
      "image_url": "https://storage.googleapis.com/storage-example/anova/nike-mercurial-vapor-new.jpg.png",
      "price": 4800000,
      "stock": 15,
      "CategoryId": 2,
      "createdAt": "2020-02-25T05:16:28.374Z",
      "updatedAt": "2020-02-25T14:12:20.850Z",
      "Category": {
        "id": 2,
        "name": "sports",
        "createdAt": "2020-02-22T07:24:37.396Z",
        "updatedAt": "2020-02-25T05:16:41.151Z"
      }
    },
  ]
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET DETAIL Product

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//product/:id"
```

- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get detail product successfull",
  "payload": {
    "id": 1,
    "name": "Nike Air Max 90",
    "image_url": "https://storage.googleapis.com/storage-example/anova/nike-air-max-90-new.jpg.png",
    "price": 1690000,
    "stock": 15,
    "CategoryId": 1,
    "createdAt": "2020-02-22T07:25:32.119Z",
    "updatedAt": "2020-02-22T08:26:48.573Z"
  }
}

status code (404) :
{
  "message": "Product not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Cart By User

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//carts/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get all cart successfull",
  "total": 0,
  "payload": {
    "id": 5,
    "name": "Muhammad Anova",
    "email": "anov@gmail.com",
    "role": "member",
    "createdAt": "2020-02-25T12:53:06.921Z",
    "updatedAt": "2020-02-25T12:53:06.921Z",
    "Carts": []
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## POST Add Item to Cart

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//cart"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Request Body
```
{
  "UserId": 1,
  "ProductId": 1,
  "quantity": 1
}
```
- Response
```
status code (201) :
{
  "code": 201,
  "message": "Create cart successfull",
  "payload": {
    "id": 1,
    "UserId": 1,
    "ProductId": 1,
    "quantity": 1,
    "updatedAt": "2020-02-22T07:18:32.006Z",
    "createdAt": "2020-02-22T07:18:32.006Z"
  }
}

status code (400) :
{
  "UserId": "User ID must be filled"
  "ProductId": "Product ID must be filled"
  "quantity": "Quantity must be filled"
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Quantity Change Plus for Update Quantity

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//cart/plusquantity/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Update quantity successfull",
  "total": 0,
  "payload": {
    "id": 1,
    "UserId": 1,
    "ProductId": 1,
    "quantity": 2,
    "createdAt": "2020-02-25T12:53:06.921Z",
    "updatedAt": "2020-02-25T12:53:06.921Z",
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Quantity Change Minus for Update Quantity

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//cart/minquantity/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Update quantity successfull",
  "total": 0,
  "payload": {
    "id": 1,
    "UserId": 1,
    "ProductId": 1,
    "quantity": 1,
    "createdAt": "2020-02-25T12:53:06.921Z",
    "updatedAt": "2020-02-25T12:53:06.921Z",
  }
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## DELETE Cart

```
Method : "DELETE"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//cart/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Delete cart successfull"
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "Cart product not found"
}

status code (500) :
{
  "message": "Error not found"
}
```

## GET Transactions By User

```
Method : "GET"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//transactions/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Get all transactions successfull",
  "payload": [
    {
      "id": 2,
      "code_transaction": 12262020,
      "name": "Muhammad Anova",
      "address": "Jl. Ahmad Yani No.47 Tanah Sareal Kota Bogor",
      "products": "Nike Air Force 1 Low 1pcs, Nike EXP-X14 1pcs",
      "total_price": 3600000,
      "createdAt": "2020-02-26T12:25:04.332Z",
      "updatedAt": "2020-02-26T12:25:04.332Z"
    }
  ]
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## POST Add Transaction After Buying

```
Method : "POST"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//transaction/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Request Body
```
{
  "name": "Muhammad Anova",
  "address": "Jl. Hacktiv8 Jakarta Barat",
  "products": "Nike Air Max 90",
  "total_price": "1800000"
}
```
- Response
```
status code (201) :
{
  "code": 201,
  "message": "Transaction berhasil di tambah dan cart berhasil di delete",
  "payload": {
    code_transaction: "122022020"
  }
}

status code (400) :
{
  "code_transaction": "Code transaction must be filled"
  "name": "Name must be filled",
  "address": "Address must be filled",
  "products": "Products must be filled",
  "total_price": "1800000"
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```

## DELETE Transaction

```
Method : "DELETE"
End Point : "https://e-commerce-backend-portofolio.herokuapp.com//transaction/:id"
```

- Request Header
```
{
  "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm92YUBnbWFpbC5jb20iLCJpYXQiOjE1ODE2NjM4NzJ9.7OCHSkEJzk1o8LVzYdjDjpiw_aBKjc7QKGoskNqyvyU"
}
```
- Response
```
status code (200) :
{
  "code": 200,
  "message": "Delete transaction successfull"
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (404) :
{
  "message": "Transaction not found"
}

status code (500) :
{
  "message": "Error not found"
}
```