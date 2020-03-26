# e-commerce
akun yang sudah di buat (bisa buat akun admin / customer lain) 
akun admin = budi@gmail.com 
akun customer = putra@gmail.com 
password = 123456

Dokumentasi RESTFUL API my-e-commerce.

### environment variabeles

```PORT = 
PORT=3000
JWT_SECRET=sungguhrahasia
KEY_FILENAME = ./e-commerce-4c2852bbf9fe.json
BUCKET_NAME = itemimage
```

## USAGE

```text
javascript
npm install
npm run dev
```

## BASE URL

```
https://
```

##  ACCESS

```````text
Access server port: 3000
Access client port: 8080
```````

- ## USER ROUTES

  | Routing         | HTTP | Header(s)                         | Body                                                         | Response                                           | Description       |
  | --------------- | ---- | --------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- | ----------------- |
  | /users/register | POST | application/x-www-form-urlencoded | username : String (***required***), email : String (***required***), password : String (***required***), role : String (***required***) | Error: Internal server error Success: add new user | Create new user   |
  | /users/login    | POST | application/x-www-form-urlencoded | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login user   | normal user login |
  |                 |      |                                   |                                                              |                                                    |                   |

  ## USER REGISTER

  - **URL's**

    ```
    /users/register
    ```

  - **URL Params**

    - Require : `none`
    - Optional : `none`

  - **Data Params**

    - Require : `username:string` , `email:string` , `password:string`,`role:string`

  - **Headers**

    - application/x-www-form-urlencoded

  - **HTTP Method**

    `POST`

  - **Success Response**

    - Code : 201 CREATED

    - Content :

      ```
      {
          "user": {
              "id": 1,
              "email": "azp@gmail.com",
              "password": "$2b$08$HUDRcjzjEsQYvy2HVsdtkeBH46CJigTrWQO8WroBa0xA5jUMgS.ve",
              "username": "azp",
              "role": "admin",
              "updatedAt": "2020-02-13T17:06:40.371Z",
              "createdAt": "2020-02-13T17:06:40.371Z"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTgxNjEzNjAwfQ.DRJCc6p1CodG1KgdiBExf2Rhs7hto9eXX2UQFHY-hnk"
      }
      ```

  - **Error Response**

    - Validation name

      - Code : 400 Bad Request

      - Content :

        ```
        "Please fill username"
        ```

        - Code : 400 Bad Request

        - Content :

          ```
          "please enter your username"
          ```

    - Validation password

      - Code : 400 Bad Request

      - Content :

        ```
        "Please fill password"
        ```

      - Code : 400 Bad Request

      - Content :

        ```
        "Please enter your password"
        ```

    - Validation role

      - Code : 400 Bad Request

      - Content :

        ```
        "Please fill role"
        ```

      - Code : 400 Bad Request

      - Content :

        ```
        "Please enter your role"
        ```

    - Validation Email

      - Code : 400 Bad Request

      - Content :

        ```
        "Please fill email"
        ```

      - Code : 400 Bad Request

      - Content :

        ```
        "Please enter your email"
        ```

      - Code : 400 Bad Request

      - Content :

        ```
        "format email wrong"
        ```

    - Validation Unique Email

      - Code : 400 Bad Request

      - Content :

        ```
        "email already exist"
        ```

    - Validation Unique username

      - Code : 400 Bad Request

      - Content :

        ```
        "username already exist"
        ```

    - Validation min length password

      - Code : 400 Bad Request

      - Content :

        ```
        "minimal password 6"
        ```

    - Validation format email

      - Code : 400 Bad Request

      - Content :

        ```
        "format email wrong"
        ```

  ## USER LOGIN

  - **URL's**

    ```
    /users/login
    ```

  - **URL Params**

    - Require : `none`
    - Optional : `none`

  - **Data Params**

    - Require : `email:string` , `password:string`

  - **Headers**

    - application/x-www-form-urlencoded

  - **HTTP Method**

    `POST`

  - **Success Response**

    - Code : 201 CREATED

    - Content :

      ```
      {
          "user": {
              "id": 1,
              "email": "azp@gmail.com",
              "password": "$2b$08$HUDRcjzjEsQYvy2HVsdtkeBH46CJigTrWQO8WroBa0xA5jUMgS.ve",
              "username": "azp",
              "role": "admin",
              "updatedAt": "2020-02-13T17:06:40.371Z",
              "createdAt": "2020-02-13T17:06:40.371Z"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTgxNjEzNjAwfQ.DRJCc6p1CodG1KgdiBExf2Rhs7hto9eXX2UQFHY-hnk"
      }
      ```

  - **Error Response**

    - Validation email or password

      - Code : 400 Bad Request

      - Content :

        ```
        "email/password wrong"
        ```

## PRODUCT GET ALL

- **URL's**

  ```
  /products
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `none`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    [
        {
            "id": 2,
            "name": "pakaian keren wanita",
            "description": "baju keren sepanjang masa",
            "image_url": "https://storage.googleapis.com/itemimage/1582122688775-shirt.gif",
            "price": 200000,
            "stock": 20,
            "UserId": 2,
            "category": "Pakaian Wanita",
            "createdAt": "2020-02-19T14:31:29.671Z",
            "updatedAt": "2020-02-22T04:12:44.906Z"
        },
        {
            "id": 8,
            "name": "pakaian keren",
            "description": "keren ga pakean prianya",
            "image_url": "https://storage.googleapis.com/itemimage/1582168546979-1578708113260.png",
            "price": 10000,
            "stock": 30,
            "UserId": 2,
            "category": "Pakaian Pria",
            "createdAt": "2020-02-20T02:01:40.994Z",
            "updatedAt": "2020-02-22T04:47:25.683Z"
        },
        {
            "id": 10,
            "name": "mainan anak anak keren",
            "description": "keren sekali mainan anak anak ini",
            "image_url": "https://storage.googleapis.com/itemimage/1582169346861-ryu_drbl.gif",
            "price": 20000,
            "stock": 2,
            "UserId": 2,
            "category": "Pakaian Pria",
            "createdAt": "2020-02-20T03:29:12.506Z",
            "updatedAt": "2020-02-22T04:47:32.325Z"
        }
    ]
    ```

## PRODUCT GET ONE

- **URL's**

  ```
  /products/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 8,
        "name": "pakaian keren",
        "description": "keren ga pakean prianya",
        "image_url": "https://storage.googleapis.com/itemimage/1582168546979-1578708113260.png",
        "price": 10000,
        "stock": 30,
        "UserId": null,
        "category": "Pakaian Pria",
        "createdAt": "2020-02-20T02:01:40.994Z",
        "updatedAt": "2020-02-22T04:47:25.683Z"
    }
    ```

      ## PRODUCT UPDATE

- **URL's**

  ```
  /products/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `name:string` , `description:string` , `image_url:string` , `price:integer` , `stock:20`, `category:string` , `UserId:integer`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 8,
        "name": "pakaian keren",
        "description": "keren ga pakean prianya",
        "image_url": "https://storage.googleapis.com/itemimage/1582168546979-1578708113260.png",
        "price": 10000,
        "stock": 20,
        "UserId": null,
        "category": "Pakaian Pria",
        "createdAt": "2020-02-20T02:01:40.994Z",
        "updatedAt": "2020-02-22T08:41:40.400Z"
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

  - Authorization Admin

    - Code : 401 Unauthorized

    - Content :

      ```
      "you are not admin"
      ```

## PRODUCT DELETE

- **URL's**

  ```
  /products/:id
  ```

- **URL Params** : 

  - Optional : `none`
  - Require : `id:[string]`

- **Data Params**

  - Require : `none`
  - Optional : `id:[string]`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `DELETE`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 8,
        "name": "pakaian keren",
        "description": "keren ga pakean prianya",
        "image_url": "https://storage.googleapis.com/itemimage/1582168546979-1578708113260.png",
        "price": 10000,
        "stock": 20,
        "UserId": null,
        "category": "Pakaian Pria",
        "createdAt": "2020-02-20T02:01:40.994Z",
        "updatedAt": "2020-02-22T08:41:40.400Z"
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

  - Authorization Admin

    - Code : 401 Unauthorized

    - Content :

      ```
      "you are not admin"
      ```

## PRODUCT POST

- **URL's**

  ```
  /products
  ```

- **URL Params**: `id: [string]`

  - Optional : `none`
  - Require : `id: [string]`

- **Data Params**

  - Require : `name:string` , `description:string` , `image_url:string` , `price:integer` , `stock:integer`, `category:string` , `UserId:integer`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 4,
        "title": "todo 9",
        "assignTo": "putra",
        "description": "description keren",
        "category": "back-log",
        "UserId": 2,
        "updatedAt": "2020-02-13T23:38:07.380Z",
        "createdAt": "2020-02-13T23:38:07.380Z"
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

  - Authorization Admin

    - Code : 401 Unauthorized

    - Content :

      ```
      "you are not admin"
      ```

  - Validation wrong category

    - Code : 400 bad request

    - Content :

      ```
      "please add correct category"
      ```

  - Validation minimal price

    - Code : 400 bad request

    - Content :

      ```
      "minimal price Rp.1000"
      ```

  - Validation name

    - Code : 400 bad request

    - Content:

      ```
      "please fill name"
      ```

  - Validation description

    - Code : 400 bad request

    - Content:

      ```
      "please fill description"
      ```

  - Validation price

    - Code : 400 bad request

    - Content:

      ```
      "please fill price"
      ```

  - Validation image_url

    - Code : 400 bad request

    - Content:

      ```
      "please fill image_url"
      ```

  - Validation stock

    - Code : 400 bad request

    - Content:

      ```
      "please fill stock"
      ```

  - Validation category

    - Code : 400 bad request

    - Content:

```
"please fill category"
```

## CART POST

- **URL's**

  ```
  /carts
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `id: [string]`

- **Data Params**

  - Require : `productId:string` , `qty:string`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 1,
        "ProductId": 8,
        "UserId": 1,
        "qty": 5,
        "status": "in cart"
        "updatedAt": "2020-02-13T23:38:07.380Z",
        "createdAt": "2020-02-13T23:38:07.380Z"
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```




## CART GET CART "IN CART"

- **URL's**

  ```
  /carts
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    [
        {
            "id": 1,
            "ProductId": 8,
            "UserId": 1,
            "qty": 5,
            "status": "in cart"
            "Product": [
                        {
                    "id": 8,
                    "name": "pakaian keren",
                    "description": "keren ga pakean prianya",
                    "image_url": "https://storage.googleapis.com/itemimage/1582168546979-								1578708113260.png",
                    "price": 10000,
                    "stock": 20,
                    "UserId": 2,
                    "category": "Pakaian Pria",
                    "createdAt": "2020-02-20T02:01:40.994Z",
                    "updatedAt": "2020-02-22T08:41:40.400Z"
                }
            ]
            "updatedAt": "2020-02-13T23:38:07.380Z",
            "createdAt": "2020-02-13T23:38:07.380Z"
        },
        {
            "id": 1,
            "ProductId": 2,
            "UserId": 1,
            "qty": 5,
            "status": "in cart"
            "Product": [
                        {
                            "id": 2,
                            "name": "pakaian keren wanita",
                            "description": "baju keren sepanjang masa",
                            "image_url": "https://storage.googleapis.com/itemimage/1582122688775-shirt.gif",
                            "price": 200000,
                            "stock": 20,
                            "UserId": 2,
                            "category": "Pakaian Wanita",
                            "createdAt": "2020-02-19T14:31:29.671Z",
                            "updatedAt": "2020-02-22T04:12:44.906Z"
                        },
            ]
            "updatedAt": "2020-02-13T23:38:07.380Z",
            "createdAt": "2020-02-13T23:38:07.380Z"
        }
    ]
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

## CART GET CART STATUS "Process" && "Completed"

- **URL's**

  ```
  /carts/onProcess
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    [
        {
            "id": 1,
            "ProductId": 1,
            "UserId": 1,
            "qty": 5,
            "status": "Process"
            "Product": [
                        {
                    "id": 8,
                    "name": "pakaian keren",
                    "description": "keren ga pakean prianya",
                    "image_url": "https://storage.googleapis.com/itemimage/1582168546979-								1578708113260.png",
                    "price": 10000,
                    "stock": 20,
                    "UserId": 2,
                    "category": "Pakaian Pria",
                    "createdAt": "2020-02-20T02:01:40.994Z",
                    "updatedAt": "2020-02-22T08:41:40.400Z"
                }
            ]
            "updatedAt": "2020-02-13T23:38:07.380Z",
            "createdAt": "2020-02-13T23:38:07.380Z"
        },
        {
            "id": 1,
            "ProductId": 2,
            "UserId": 1,
            "qty": 5,
            "status": "Completed"
            "Product": [
                        {
                            "id": 2,
                            "name": "pakaian keren wanita",
                            "description": "baju keren sepanjang masa",
                            "image_url": "https://storage.googleapis.com/itemimage/1582122688775-shirt.gif",
                            "price": 200000,
                            "stock": 20,
                            "UserId": 2,
                            "category": "Pakaian Wanita",
                            "createdAt": "2020-02-19T14:31:29.671Z",
                            "updatedAt": "2020-02-22T04:12:44.906Z"
                        },
            ]
            "updatedAt": "2020-02-13T23:38:07.380Z",
            "createdAt": "2020-02-13T23:38:07.380Z"
        }
    ]
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

## CART DELETE

- **URL's**

  ```
  /carts/:id
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `id: [string]`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `DELETE`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    [1]
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

## CART PUT QUANTITY

- **URL's**

  ```
  /carts/:id
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `id: [string]`

- **Data Params**

  - Require : `productId:string` , `qty:string`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    [1]
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

  - stock product < quantity

    - Code : 400 bad request

    - Content :

    ```
    "product has only stock 4"
    ```

- quantity < 1

  - Code : 400 bad request

  - Content :

    ```
    "minimal buy product 1"
    ```

## CART CHECKOUT

- **URL's**

  ```
  /carts/checkout
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `id: [string]`

- **Data Params**

  - Require : `productId:string` , `qty:string`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    "Success Checkout"
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

## CART COMPLETE CHECKOUT

- **URL's**

  ```
  /carts/complete/:id
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `id: [string]`

- **Data Params**

  - Require : `productId:integer` , `qty:integer`, `subTotal:integer`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    "Success Transaction"
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

## TRANSACTION POST

- **URL's**

  ```
  /transactions
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `id: [string]`

- **Data Params**

  - Require : `productId:integer` , `qty:integer`, `subTotal:integer`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "id": 1,
        "ProductId": 8,
        "UserId": 1,
        "qty": 5,
        "subTotal": 50000
        "status": "in cart"
        "updatedAt": "2020-02-13T23:38:07.380Z",
        "createdAt": "2020-02-13T23:38:07.380Z"
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

## TRANSACTION GET

- **URL's**

  ```
  /transactions
  ```

- **URL Params**: 

  - Optional : `none`
  - Require : `id: [string]`

- **Data Params**

  - Require : `productId:integer` , `qty:integer`, `subTotal:integer`
  - Optional : `none`

- **Headers**

  - Require : `token:string`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    [
        {
            "id": 1,
            "ProductId": 8,
            "UserId": 1,
            "qty": 5,
            "subTotal": 50000,
            "status": "in cart"
            "updatedAt": "2020-02-13T23:38:07.380Z",
            "createdAt": "2020-02-13T23:38:07.380Z"
        }
    ]
    ```

- **Error Response**

  - Authentication User

    - Code : 400 bad request

    - Content :

      ```
      "not found Token"
      ```

















