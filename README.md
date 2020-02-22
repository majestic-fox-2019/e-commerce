# e-commerce
E-Commerce CMS by Muhammad Anova Nurfaqih

## POST Register

Method : "POST"
End Point : "http://localhost:3000/admin/registrasi"

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

Method : "POST"
End Point : "http://localhost:3000/login"

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

Method : "GET"
End Point : "http://localhost:3000/admin/users"

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

Method : "POST"
End Point : "http://localhost:3000/admin/user"

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

Method : "GET"
End Point : "http://localhost:3000/admin/user/:id"

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

Method : "PUT"
End Point : "http://localhost:3000/admin/user/:id"

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

Method : "Patch"
End Point : "http://localhost:3000/admin/user/:id"

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

Method : "DELETE"
End Point : "http://localhost:3000/admin/user/:id"

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

Method : "GET"
End Point : "http://localhost:3000/admin/categories"

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

Method : "POST"
End Point : "http://localhost:3000/admin/category"

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

Method : "GET"
End Point : "http://localhost:3000/admin/category/:id"

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

Method : "PUT"
End Point : "http://localhost:3000/admin/category/:id"

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

Method : "DELETE"
End Point : "http://localhost:3000/admin/category/:id"

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

Method : "GET"
End Point : "http://localhost:3000/admin/products"

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

Method : "POST"
End Point : "http://localhost:3000/admin/product"

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

Method : "GET"
End Point : "http://localhost:3000/admin/product/:id"

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

Method : "PUT"
End Point : "http://localhost:3000/admin/product/:id"

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

Method : "DELETE"
End Point : "http://localhost:3000/admin/product/:id"

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