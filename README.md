# E-Commerce CMS



## Table of Content

- **E-Commerce CMS-API**
  - [Base URL](#base-url--httpsecommerce-serversideherokuappcom)
  - [Installation](#installation)
  - [Usage](#usage)
  - [List of User Routes](#list-of-users-routes)
  - [List of Products Routes](#list-of-products-routes)
  - [List of Categories Routes](#list-of-categories-routes)
  - [List of Histories Routes](#list-of-histories-routes)
  - [List of Carts Routes](#list-of-carts-routes) 
  - [List of Errors](#list-of-errors)
  - **User Endpoints**
    - [Login](#post-login)
    - [Register](#post-register)
    - [List of Users](#get-users)
    - [Verify User](#get-users-verify)
  - **Product Endpoint**
    - [Show All](#get-products)
    - [Create Product](#post-products)
    - [Show Product by Id](#get-products-by-id)
    - [Change Product Category](#patch-products)
    - [Delete Product](#delete-products)
    - [Filter Products by Category](#get-products-by-category)
    - [Show Products Banner](#get-products-banner)
  - **Category Endpoint**
    - [Show All Categories](#get-categories)
    - [Create Category](#post-categories)
    - [Delete Category](#delete-categories)
  - **History Endpoint**
    - [Show All User Transaction History](#get-histories)
  - **Carts Endpoint**
    - [Show All User Carts](#get-carts)
    - [Add Product into Cart](#post-carts)
    - [Checkout Cart](#put-carts)
    - [Change Qty Product on Cart](#patch-carts)
    - [Delete Cart](#delete-carts)

------

#### **Base URL :** `https://ecommerce-serverside.herokuapp.com/`

#### **Installation:**

Clone this API from repository and install npm, then on `server` directory install the neccessary npm package

```
$ git clone https://github.com/hafizulrifkihawari/e-commerce.git
$ cd ../server
$ npm install
```

#### **Usage:**

Run script from packages by using the command below on `server` directory

```
$ npm run dev
```

#### **List of Users Routes:**

**Base Route :** `/users`

| **Route** | **HTTP** | **Description**                                     |
| --------- | -------- | --------------------------------------------------- |
| /login    | POST     | Log in and get an access token based on credentials |
| /register | POST     | Sign up new user                                    |
| /list     | GET      | Show all registered member                          |
| /verify   | GET      | Verify access token credentials of user             |

#### **List of Products Routes:**

| **Route**                | **HTTP** | **Description**                                          |
| ------------------------ | -------- | -------------------------------------------------------- |
| /products                | GET      | Show all products                                        |
| /products                | POST     | Create new product ***(login required)***                |
| /products/:id            | GET      | Retrieve details of a product by id                      |
| /products/:id            | PUT      | Update details of a product by id ***(login required)*** |
| /products/:id            | DELETE   | Delete specified product by id ***(login required)***    |
| /products/find/:category | GET      | Retrieve every products filtered by category selected    |
| /products/banner         | GET      | Retrieve newly added products limit by 10                |

#### **List of Categories Routes:**

| **Route**       | **HTTP** | **Description**                                        |
| --------------- | -------- | ------------------------------------------------------ |
| /categories     | GET      | Show all categories ***(login required)***             |
| /categories     | POST     | Create new category ***(login required)***             |
| /categories/:id | DELETE   | Delete specified category by id ***(login required)*** |

#### **List of Histories Routes:**

| **Route**  | **HTTP** | **Description**                                              |
| ---------- | -------- | ------------------------------------------------------------ |
| /histories | GET      | Show all transaction history of current user logged in ***(login required)*** |

#### **List of Carts Routes:**

| **Route**  | **HTTP** | **Description**                                              |
| ---------- | -------- | ------------------------------------------------------------ |
| /carts     | GET      | Show all current user cart log ***(login required)***        |
| /carts     | POST     | Create new cart of products ***(login required)***           |
| /carts     | PUT      | Checkout cart and decrease product stock according to cart amount ***(login required)*** |
| /carts/:id | PATCH    | Update cart amount value by input ***(login required)***     |
| /carts/:id | DELETE   | Delete specified cart by id ***(login required)***           |

#### **List of Errors:**

| **Code** | **Name**              | **Description**                                |
| -------- | --------------------- | ---------------------------------------------- |
| 400      | Bad Request           | Incorrect user access or form validation       |
| 401      | Unauthorized Error    | Invalid token access                           |
| 404      | Not Found             | Requested resource not found                   |
| 500      | Internal Server Error | Server currently unable to handle this request |



## **POST Login**

------

- **URL:** `/login`

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
        "name": "John Doe"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "errors": "Incorrect Email or Password"
    }
    ```
    
  - **Status:** `500`

    ```javascript
  {
        "errors": "Server currently unable to handle this request"
    }
    ```

## **POST Register**

------

- **URL:** `/register`

- **Method:** `POST`

- **Description:** `Sign up new user*` `Member only`

- **Request body:**

  ```javascript
  {
      "name": "user", //required
      "email": "email@domain.com", //required
      "password": "password" //required
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "name": "user",
        "email": "email@domain.com",
        "role": "Member"
    }
    ```

- **Error Response:**

  - **Status:**`400`

    ```javascript
    {
        "errors": {
            "name": "Please enter name",
            "email": "Please enter valid email address",
            "password": "Please enter password"
        }
    }
    ```
    
  - **Status:** `500`
    
      ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
      ```
      
      

## GET Users

------

- **URL:** `/list`

- **Method:** `GET`

- **Description:** `Show all member registered on e-commerce`

- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 2,
            "name": "John",
            "email": "user@gmail.com",
            "role": "Member",
            "createdAt": "2020-02-20T05:57:06.712Z",
            "updatedAt": "2020-02-20T05:57:06.712Z"
        },
        {
            "id": 3,
            "name": "Doe",
            "email": "johndoe@gmail.com",
            "role": "Member",
            "createdAt": "2020-02-22T03:36:13.750Z",
            "updatedAt": "2020-02-22T03:36:13.750Z"
        },
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## GET Users Verify

------

- **URL:** `/verify`

- **Method:** `GET`

- **Description:** `Verify given access token into valid credentials`

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
        "user": {
            "id": 1,
            "email": "user@gmail.com",
            "role": "Member",
            "iat": 1582735239
        }
    }
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```



## GET Products

------

- **URL:** `/products`

- **Method:** `GET`

- **Description:** `Show all list of product on e-commerce`

- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 1,
            "name": "Nier:Automata",
            "image_url": "imageURL",
            "price": 260000,
            "stock": 4,
            "CategoryId": 6,
            "createdAt": "2020-02-20T04:39:30.344Z",
            "updatedAt": "2020-02-20T04:47:15.644Z",
            "Category": {
                "id": 6,
                "name": "Role-Playing",
                "image": "imageURL",
                "createdAt": "2020-02-20T03:16:24.214Z",
                "updatedAt": "2020-02-20T03:16:24.214Z"
            }
        },
        {
            "id": 2,
            "name": "Battlefield V",
            "image_url": "imageURL",
            "price": 569000,
            "stock": 12,
            "CategoryId": 2,
            "createdAt": "2020-02-22T08:17:27.992Z",
            "updatedAt": "2020-02-22T08:17:27.992Z",
            "Category": {
                "id": 2,
                "name": "Action",
                "image": "imageURL",
                "createdAt": "2020-02-20T03:07:16.523Z",
                "updatedAt": "2020-02-20T03:07:16.523Z"
            }
        },
        {
            "id": 3,
            "name": "Dark Souls 3",
            "image_url": "imageURL",
            "price": 190000,
            "stock": 4,
            "CategoryId": 6,
            "createdAt": "2020-02-20T04:49:27.854Z",
            "updatedAt": "2020-02-22T08:21:29.535Z",
            "Category": {
                "id": 6,
                "name": "Role-Playing",
                "image": "imageURL",
                "createdAt": "2020-02-20T03:16:24.214Z",
                "updatedAt": "2020-02-20T03:16:24.214Z"
            }
        }
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```



## POST Products

------

- **URL:** `/products`

- **Method:** `POST`

- **Description:** `Create new product to e-commerce`

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request body:** 

  ```javascript
  {
      "name": "Nier:Automata",
      "image_url": "imageURL",
      "price": 25000,
      "stock": 12,
      "CategoryId": 1
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
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

    ```javascript
    {
        "errors": [
            "name: Please enter product name,",
            "price: Please enter product price"
        ]
    }
    ```
  
  - **Status:** `401`
  
    ```javascript
    {
        "errors": "Invalid Token"
    }
    ```
  
  - **Status:** `500`
  
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```
  
    

## GET Product By Id

------

- **URL:** `/products/:id`

- **Method:** `GET`

- **Description:** `Show product filtered by id`

- **URL Params:** 

  ```javascript
  "id": 1, //required
  ```

- **Success Response:**

  - **Status:** `200`
  
    ```javascript
    {
        "id": 1,
        "name": "Nier:Automata",
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

    ```javascript
  {
        "errors": "Invalid Token"
    }
    ```
    
  - **Status:** `404`

    ```javascript
    {
        "errors": "Product not found"
    }
    ```
  
  - **Status:** `500`
  
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```
  
  

## PUT Products

------

- **URL:** `/products/:id`

- **Method:** `PUT`

- **Description:** `Change details of product on specified id` 

- **URL Params:** 

  ```javascript
  "id": 1, //required
  ```

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request Body:**

  ```javascript
  {
      "name": "Nier:Automata",
      "image_url": "imageURL",
      "price": 123456,
      "stock": 25,
      "CategoryId": 6
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "id": 2,
        "name": "Nier:Automata",
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

    ```javascript
  {
        "errors": {
            "name": "Please enter product name",
            "price": "Please enter product price"
        }
    }
    ```
    
  - **Status:** `404`
  
    ```javascript
    {
        "errors": "Product not found"
    }
    ```
  
  - **Status:** `500`
  
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```
  
    

## DELETE Products

------

- **URL:** `/products/:id`

- **Method:** `DELETE`

- **Description:** `Delete specified products from e-commerce product list`

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
        "id": 2,
        "name": "Nier:Automata",
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

    ```javascript
    {
        "errors": "Product not found"
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```

## GET Products by Category

------

- **URL:** `/products/find/:category`

- **Method:** `GET`

- **Description:** `Fetch a list of products filtered by categories`

- **URL Params:** 

  ```javascript
  "category": "Role-Playing" //required
  ```



- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 1,
            "name": "Nier:Automata",
            "image_url": "imageURL",
            "price": 260000,
            "stock": 4,
            "CategoryId": 6,
            "createdAt": "2020-02-20T04:39:30.344Z",
            "updatedAt": "2020-02-20T04:47:15.644Z",
            "Category": {
                "id": 6,
                "name": "Role-Playing",
                "image": "imageURL",
                "createdAt": "2020-02-20T03:16:24.214Z",
                "updatedAt": "2020-02-20T03:16:24.214Z"
            }
        },
        {
            "id": 3,
            "name": "Dark Souls 3",
            "image_url": "imageURL",
            "price": 190000,
            "stock": 4,
            "CategoryId": 6,
            "createdAt": "2020-02-20T04:49:27.854Z",
            "updatedAt": "2020-02-22T08:21:29.535Z",
            "Category": {
                "id": 6,
                "name": "Role-Playing",
                "image": "imageURL",
                "createdAt": "2020-02-20T03:16:24.214Z",
                "updatedAt": "2020-02-20T03:16:24.214Z"
            }
        }
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```

## GET Products Banner

------

- **URL:** `/products/banner`

- **Method:** `GET`

- **Description:** `Fetch a newly 10 newly added products`

- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 3,
            "name": "Nier:Automata",
            "image_url": "imageURL",
            "price": 260000,
            "stock": 4,
            "CategoryId": 6,
            "createdAt": "2020-02-20T04:39:30.344Z",
            "updatedAt": "2020-02-20T04:47:15.644Z",
        },
        {
            "id": 2,
            "name": "Battlefield V",
            "image_url": "imageURL",
            "price": 569000,
            "stock": 12,
            "CategoryId": 2,
            "createdAt": "2020-02-22T08:17:27.992Z",
            "updatedAt": "2020-02-22T08:17:27.992Z",
        },
        ...
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```

## GET Categories

------

- **URL:** `/categories`

- **Method:** `GET`

- **Description:** `Show all categories on e-commerce`

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
            "name": "Action"
            "image": "imageURL"
        },
        {
            "id": 2,
            "name": "Adventure"
            "image": "imageURL"
        },
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```



## POST Categories

------

- **URL:** `/categories`

- **Method:** `POST`

- **Description:** `Create a new categories`

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request Body:**

  ```javascript
  {
      "name": "MOBA",
      "image_url": "imageURL",
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 3,
            "name": "MOBA"
            "image": "imageURL"
        },
    ]
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "errors": {
            "name": "Please enter category name",
        }
    }
    ```

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## DELETE Categories

------

- **URL:** `/categories`

- **Method:** `DELETE`

- **Description:** `Delete category by specified id`

- **URL Params:** 

  ```javascript
  "id": 3 //required
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
    [
        {
            "id": 3,
            "name": "MOBA"
            "image": "imageURL"
        },
    ]
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "errors": "Category MOBA still have products included"
    }
    ```

  - **Status:** `404`

    ```javascript
    {
        "errors": "Product not found"
    }
    ```

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## GET Histories

------

- **URL:** `/histories`

- **Method:** `GET`

- **Description:** `Retrieve transaction history of users `

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
            "id": 9,
            "UserId": 2,
            "product": [
                {
                    "name": "Nier:Automata",
                    "qty": 2,
                    "price": 260000,
                    "subTotal": 520000
                },
                {
                    "name": "Nier:Automata",
                    "qty": 2,
                    "price": 260000,
                    "subTotal": 520000
                },
                {
                    "name": "Nier:Automata",
                    "qty": 1,
                    "price": 260000,
                    "subTotal": 260000
                }
            ],
            "totalQty": 5,
            "totalPrice": 1300000,
            "createdAt": "2020-02-26T16:32:54.293Z",
            "updatedAt": "2020-02-26T16:32:54.293Z"
        },
        ...
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## GET Carts

------

- **URL:** `/carts`

- **Method:** `GET`

- **Description:** `Show all user carts `

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
        "id": 2,
        "name": "user",
        "email": "user@gmail.com",
        "role": "Member",
        "createdAt": "2020-02-22T11:31:08.727Z",
        "updatedAt": "2020-02-22T11:31:08.727Z",
        "Carts": [
            {
                "UserId": 2,
                "ProductId": 6,
                "amount": 1,
                "status": true,
                "createdAt": "2020-02-27T03:24:48.285Z",
                "updatedAt": "2020-02-27T03:24:48.285Z",
                "id": 7,
                "Product": {
                    "id": 6,
                    "name": "The Witcher 3: Wild Hunt",
                    "image_url": "https://storage.googleapis.com/storage-example/hafizul/Witcher.jpg.png",
                    "price": 170000,
                    "stock": 10,
                    "CategoryId": 4,
                    "createdAt": "2020-02-22T16:35:43.388Z",
                    "updatedAt": "2020-02-27T03:24:24.197Z"
                }
            }
        ]
    }
    ```
  
- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## POST Carts

------

- **URL:** `/carts`

- **Method:** `POST`

- **Description:** `Add item into user cart `

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Request Body:**

  ```javascript
  {
      "ProductId": 1,
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "UserId": 2,
        "ProductId": 1,
        "updatedAt": "2020-02-27T04:23:47.107Z",
        "createdAt": "2020-02-27T04:23:47.107Z",
        "amount": 1,
        "id": 220
    }
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## PUT Carts

------

- **URL:** `/carts`

- **Method:** `PUT`

- **Description:** `Proceed checkout and update stock of products and clear user carts `

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
            "id": 3,
            "name": "Age of Empire",
            "image_url": "IMAGEURL",
            "price": 25000,
            "stock": 9,
            "CategoryId": 12,
            "createdAt": "2020-02-22T16:27:20.964Z",
            "updatedAt": "2020-02-27T04:31:45.592Z"
        },
        1,
        {
            "id": 5,
            "UserId": 2,
            "product": [
                {
                    "name": "Age of Empire",
                    "qty": 1,
                    "price": 25000,
                    "subTotal": 25000
                }
            ],
            "totalQty": 1,
            "totalPrice": 25000,
            "updatedAt": "2020-02-27T04:31:45.593Z",
            "createdAt": "2020-02-27T04:31:45.593Z"
        }
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## PATCH Carts

------

- **URL:** `/carts/:id`

- **Method:** `PATCH`

- **Description:** `Change quantity of product on carts  `

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
        "UserId": 2,
        "ProductId": 1,
        "updatedAt": "2020-02-27T04:23:47.107Z",
        "createdAt": "2020-02-27T04:23:47.107Z",
        "amount": 1,
        "id": 220
    }
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

## DELETE Carts

------

- **URL:** `/carts/:id`

- **Method:** `DELETE`

- **Description:** `Delete product on carts  `

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
        "UserId": 2,
        "ProductId": 1,
        "updatedAt": "2020-02-27T04:23:47.107Z",
        "createdAt": "2020-02-27T04:23:47.107Z",
        "amount": 1,
        "id": 220
    }
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```
