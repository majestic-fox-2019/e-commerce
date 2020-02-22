# Ecommerce-cms



## Table of Content

- **Kanban-API**
  - [Base URL](#base-url)
  
  - [Installation](#installation)
  
  - [Usage](#usage)
  
  - [List of Routes User](#list-of-routes-user)
  
  - [List of Errors](#list-of-errors)
  
  - **User Endpoints**
    - [Login](#post-login)
    - [create admin](#post-create)
    
  - **Category Endpoint**
    
    - [Show All](#get-category)
    
    - [Create category](#post-category)
    
    - [Delete category](#delete-category)
  - **Product Endpoint**
    
    - [Show All](#get-product)
    
    - [Create product](#post-product)

    - [Edit product](#put-product)
    
    - [Delete product](#delete-product)
      

------

#### **Base URL :** https://ecommerce-cms.herokuapp.com/

#### **Installation:**

Clone this API from repository and install npm, then on `server` directory install the neccessary npm package

```
$ git clone https://github.com/jetlysandita/e-commerce.git
$ cd ../server
$ npm install
```

Do the same on `client` directory

#### **Usage:**

Run script from packages by using the command below on `server` directory

```
$ npm run dev
```

Run script from packages by using the command below on `client` directory

```
$ npm start
```

#### List of User Routes:**

| **Route**   | **HTTP** | **Description**                                    |
| ----------- | -------- | -------------------------------------------------- |
| /user/login | POST     | Log in and get an access token based on credential |
| /user       | GET      | get all user role admin                            |
| /user       | POST     | create admin                                       |
| /user       | DELETE   | delete admin                                       |

#### **List of Category Routes:**

| **Route**     | **HTTP** | **Description**                        |
| ------------- | -------- | -------------------------------------- |
| /category     | GET      | Show all category *(login required)*   |
| /category     | POST     | Create new category *(login required)* |
| /category/:id | DELETE   | Delete category *(login required)*     |

#### **List of Product Routes:**

| **Route**     | **HTTP** | **Description**   |
| --------------------- | ------ | ---------------------------------------------- |
| /product              | POST   | Create new product *(login required)*          |
| /product              | GET    | find all product (login required)              |
| /product/category/:id | GET    | find product per category (login required)     |
| /:product/id          | GET    | select detail product                          |
| /:product/id          | PATCH  | update image                                   |
| /:product/id          | PUT    | update product                                 |
| /:product/id          | DELETE | delete product                                 |

#### **List of Errors:**

| **Code** | **Name**              | **Description**                                |
| -------- | --------------------- | ---------------------------------------------- |
| 400      | Bad Request           | Incorrect user access or form validation       |
| 403      | Forbidden             | Unauthorized access                            |
| 404      | Not Found             | Requested resource not found                   |
| 500      | Internal Server Error | Server currently unable to handle this request |



## **POST Login**

------

- **URL:** `/user/login`

- **Method:** `POST`

- **Description:** `Log in and get an access token based on credentials`

- **Request body:**

  ```javascript
  {
      "email": "email@domain.com", //required
      "password": "password" //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYWZpenVscmlma2loYXdhcmlAZ21haWwuY29tIiwiaWF0IjoxNTgxNjQ0ODM4fQ.cUwd7Tv2KeusXaa58oEeHsF7L9SzK0HxPLWkb8Vfa88",
        "name": "jetly sandita"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "message": "Email not found"
    }
    or
    {
        "message": "Password wrong"
  }
    ```

  - **Status:** `500`
  
    ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
    ```

## **POST Create**

------

- **URL:** `/user

- **Method:** `POST`

- **Description:** Create admin

- **Request body:**

  ```javascript
  {
      "name": "user", //required
      "email": "email@domain.com", //required
      "password": "password" //required,
      "role": "role" 
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "email": "test@mail.com",
        "name": "jetlya",
    }
    ```

- **Error Response:**

  - **Status:**`400`

    ```javascript
    {
        "name": "Please enter a name",
        "email": "Format email wrong",
        "password": "Please enter a password"
    }
    ```
  
- **Status:** `500`
  
  ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
  ```



## **DELETE user**

------

- **URL:** `/user/:id

- **Method:** delete

- **Description:** delete admin

- **URL params:**

  ```javascript
  "id": 1 //required
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "email": "test@mail.com",
        "name": "jetlya",
    }
    ```

- **Error Response:**

  - **Status:**`400`

    ```javascript
    {
        "message": "User not found"
    }
    ```

- **Status:** `500`

  ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
  ```



## GET Category

------

- **URL:** `/category`

- **Method:** `GET`

- **Description:** `Show all category `

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-02-11T08:25:50.954Z",
            "updatedAt": "2020-02-11T08:25:50.954Z",
        }
    ]
    ```
  
- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
    ```



## POST Category

------

- **URL:** `/category`

- **Method:** `POST`

- **Description:** `Create new category `

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request body:** Acceptable value of `category` in table category

  ```javascript
  {
      "name": "test"
  }
  ```
  
- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "id": 19,
        "name": "test",
        "updatedAt": "2020-02-14T09:15:17.071Z",
        "createdAt": "2020-02-14T09:15:17.071Z"
    }
    ```
  
- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "name": "Please enter a name",
    }
    ```
    
  - **Status:** `500`
  
    ```javascript
    {
        "message": "Server currently unable to handle this request"
    }
    ```
  

## DELETE Category

------

- **URL:** `/category/:id`

- **Method:** `DELETE`

- **Description:** `Delete category`

- **URL Params:** 

  ```javascript
  "id": 1 //required
  ```
  
- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```


- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "id": 6,
        "name": "Man",
        "createdAt": "2020-02-13T09:50:51.289Z",
        "updatedAt": "2020-02-13T09:50:51.289Z"
    }
    ```
  
- **Error Response:**

  - **Status:** `404`

    ```javascript
    {
        "message": "category not found"
    }
    ```
    
  - **Status**: 400
    
    {
        "message": "category still have products"
    }
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```

## GET Product

------

- **URL:** `/product`

- **Method:** `GET`

- **Description:** `Show all list of product on e-commerce`

- **Request Header:**

  ```
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```
    [
        {
            "id": 1,
            "name": "Man",
            "image_url": "imageURL",
            "price": 260000,
            "stock": 4,
            "CategoryId": 6,
            "createdAt": "2020-02-20T04:39:30.344Z",
            "updatedAt": "2020-02-20T04:47:15.644Z",
        }
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## 

## POST Product

------

- **URL:** `/product`

- **Method:** `POST`

- **Description:** `Create new product to e-commerce`

- **Request Header:**

  ```
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request body:**

  ```
  {
      "name": "Man",
      "image_url": "imageURL",
      "price": 25000,
      "stock": 12,
      "category": "Man"
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```
    {
        "id": 1,
        "name": "Nier:Automata",
        "image_url": "imageURl",
        "price": 25000,
        "stock": 12,
        "CategoryId": 1,
        "updatedAt": "2020-02-22T09:33:20.944Z",
        "createdAt": "2020-02-22T09:33:20.944Z"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```
    {
        "errors": [
            "name: Please enter product name,",
            "price: Please enter product price"
        ]
    }
    ```

  - **Status:** `401`

    ```
    {
        "errors": "Invalid Token"
    }
    ```

  - **Status:** `500`

    ```
    {
        "errors": "Server currently unable to handle this request"
    }
    ```

## 

## GET Product By Id

------

- **URL:** `/product/:id`

- **Method:** `GET`

- **Description:** `Show product filtered by id`

- **URL Params:**

  ```
  "id": 1, //required
  ```

- **Request Header:**

  ```
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```
    {
        "id": 1,
        "name": "Man",
        "image_url": "imageURL",
        "price": 260000,
        "stock": 4,
        "CategoryId": 6,
        "createdAt": "2020-02-20T04:39:30.344Z",
        "updatedAt": "2020-02-20T04:47:15.644Z"
    }
    ```

- **Error Response:**

  - **Status:** `401`

    ```
    
    ```

  { "errors": "Invalid Token" }

  ```
  - **Status:** `404`
  
  ​```javascript
  {
      "errors": "Product not found"
  }
  ```

  - **Status:** `500`

    ```
    {
        "errors": "Server currently unable to handle this request"
    }
    ```

## 

## PUT Product

------

- **URL:** `/product/:id`

- **Method:** `PUT`

- **Description:** `Change details of product on specified id`

- **URL Params:**

  ```
  "id": 1, //required
  ```

- **Request Header:**

  ```
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request Body:**

  ```
  {
      "name": "Man",
      "price": 123456,
      "stock": 25,
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```
    {
        "id": 2,
        "name": "Man",
        "image_url": "imageURL",
        "price": 123456,
        "stock": 2,
        "CategoryId": 6,
        "createdAt": "2020-02-20T04:49:27.854Z",
        "updatedAt": "2020-02-22T09:44:51.005Z"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```
    
    ```

  { "errors": { "name": "Please enter product name", "price": "Please enter product price" } }

  ```
  - **Status:** `404`
  
  ​```javascript
  {
      "errors": "Product not found"
  }
  ```

  - **Status:** `500`

    ```
      {
          "errors": "Server currently unable to handle this request"
      }
    ```

## 

## DELETE Product

------

- **URL:** `/product/:id`

- **Method:** `DELETE`

- **Description:** `Delete specified products from e-commerce product list`

- **URL Params:**

  ```
  "id": 1 //required
  ```

- **Request Header:**

  ```
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```
    {
        "id": 2,
        "name": "Man",
        "image_url": "imageURL",
        "price": 123456,
        "stock": 2,
        "CategoryId": 6,
        "createdAt": "2020-02-20T04:49:27.854Z",
        "updatedAt": "2020-02-22T09:44:51.005Z"
    }
    ```

- **Error Response:**

  - **Status:** `404`

    ```
    {
        "errors": "Product not found"
    }
    ```

  - **Status:** `500`

    ```
      {
          "errors": "Server currently unable to handle this request"
      }
    ```

## 

## GET Product by Category

------

- **URL:** `/product/category/:id`

- **Method:** `GET`

- **Description:** `Fetch a list of products filtered by categories`

- **URL Params:**

  ```
  "category": "Man" //required
  ```

- **Request Header:**

  ```
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```
    [
        {
            "id": 1,
            "name": "Man",
            "image_url": "imageURL",
            "price": 260000,
            "stock": 4,
            "CategoryId": 6,
            "createdAt": "2020-02-20T04:39:30.344Z",
            "updatedAt": "2020-02-20T04:47:15.644Z",
            "Category": {
                "id": 6,
                "name": "Man",
                "createdAt": "2020-02-20T03:16:24.214Z",
                "updatedAt": "2020-02-20T03:16:24.214Z"
            }
        }
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```
      {
          "errors": "Server currently unable to handle this request"
      }
    ```