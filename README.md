# E-Commerce
​
------
​
#### **Base URL :** `https://k-commerce-efc59.firebaseapp.com/`
​
#### **Installation:**
​
```
$ git clone https://github.com/Kev1ntan/e-commerce.git
$ npm install both client and server
```
​
#### **Usage:**
​
Run script from packages by using the command below on `server` directory
​
```
$ nodemon app.js
```
​
Run script from packages by using the command below on `client` directory
​
```
$ npm run dev
```
​
#### **User Routes:**
| **Route**                   | **HTTP** | **Description**                                     |
| --------------------------- | -------- | --------------------------------------------------- |
| /user/register              | POST     | Register user                                       |-
| /user/login                 | POST     | Login user                                          |-
| /user/listUser              | GET      | Get List of users                                   |-
| /user/history               | GET      | Get user personal history                           |-
| /user/allhistory            | GET      | Get all users history                               |-

#### **Product Routes:**
| **Route**                              | **HTTP** | **Description**                                           |
| -------------------------------------- | -------- | --------------------------------------------------------- |
| /product/adminListProduct              | GET      | Get all list of products(include 0 stock)                 |-
| /product/listProduct                   | GET      | Get list of products                                      |-
| /product/listProduct/category/:id      | GET      | Get list of products filter by category                   |-
| /product/adminListProduct/category/:id | GET      | Get list of products filter by category (include 0 stock) |-
| /product/addProduct                    | POST     | Add product                                               |-
| /product/banner                        | GET      | Get new product list                                      |-
| /product/deleteProduct:id              | DELETE   | Delete product                                            |-
| /product/updateProduct:id              | PUT      | Update product                                            |-

#### **Category Routes:**
| **Route**                      | **HTTP** | **Description**                                     |
| ------------------------------ | -------- | --------------------------------------------------- |
| /category/listcategory         | GET      | Get category list                                   |-
| /category/addcategory          | POST     | Add category                                        |-
| /category/deletecategory/:id   | DELETE   | Delete category                                     |-
| /category/updatecategory/:id   | PUT      | Update category                                     |-

#### **Cart Routes:**
| **Route**                      | **HTTP** | **Description**                                     |
| ------------------------------ | -------- | --------------------------------------------------- |
| /cart                          | GET      | Get cart list                                       |-
| /cart                          | POST     | Add cart                                            |-
| /cart                          | DELETE   | Delete cart                                         |-
| /cart                          | PUT      | Update cart                                         |-
| /cart/payment                  | DELETE   | Delete all cart                                     |-

#### **List of Errors:**
| **Code** | **Name**              | **Description**                                |
| -------- | --------------------- | ---------------------------------------------- |
| 400      | Bad Request           | Incorrect form validation                      |
| 401      | Unauthenticated       | Not authenticated                              |
| 403      | Unauthorized          | Not authorized                                 |
| 404      | Page Not Found        | Incorrect Url                                  |
| 500      | Internal Server Error | Server currently unable to handle this request |
​
​
## **User register**
​
- **URL:** `/user/register`
​
- **Method:** `POST`
​
- **Description:** `register user`
​
- **Request body:**
​
  ```javascript
  {
    "username":"insom" //required, not empty
    "email":"insom@mail.com" //required, not empty
    "password":"insomnia" //required, min 8
  }
  ```
​
- **Success Response:**
​
  - **Status:** `201`
​
    ```javascript
    {
      "id": 3,
      "username": "insom",
      "email": "insom@mail.com"
    }
    ```
​
- **Error Response:**
​
  - **Status:** `400`
​
    ```javascript
    {
      "error": [
        "Password length min 8",
        "must using email format"
      ]
    }
    ```
​
  - **Status:** `500`
​
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```
​
## **POST login**
​
- **URL:** `/user/login`
​
- **Method:** `POST`
​
- **Description:** `Login user`
​
- **Request body:**
​
  ```javascript
  {
    "email": "insom@mail.com",
    "password": "insomnia"
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidJpbnNvbSIsInJvbGUiOiJtZW1iZXIiLCJlbWFpbCI6Imluc29tQG1haWwuY29tIiwiaWF0IjoxNTgyAyfQ.fVe7bDJBW4XWlRph4DKIPb04PgTMTc5IEkae84NN8Ao",
      "email": "insom@mail.com"
    }
    ```
​
- **Error Response:**
​
  - **Status:** `500`
​
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```
​
## GET userlist
​
- **URL:** `/user/userlist`
​
- **Method:** `GET`
​
- **Description:** `userlist`

- **Request Header:**
​
  ```javascript
  {
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrZXZpbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoia2V2aW50YW4yMDNAZ21haWwuY29tIiwiaWF0IogxfQ._P4Q80dm_f5GwqXStXAh6rrODKsFOgqtcHQOHAkoENY, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    [
      {
        "id": 1,
        "username": "kevin",
        "role": "admin",
        "email": "kevintan203@gmail.com",
        "createdAt": "2020-02-20T03:33:33.807Z",
        "updatedAt": "2020-02-20T03:33:33.807Z"
      },
      {
        "id": 2,
        "username": "coba",
        "role": "member",
        "email": "coba@gmail.com",
        "createdAt": "2020-02-21T14:50:12.583Z",
        "updatedAt": "2020-02-21T14:50:12.583Z"
      },
      {
        "id": 3,
        "username": "insom",
        "role": "member",
        "email": "insom@mail.com",
        "createdAt": "2020-02-26T18:49:25.704Z",
        "updatedAt": "2020-02-26T18:49:25.704Z"
      }
    ]
    ```
​
- **Error Response:**
  - **Status:** `400`
​
    ```javascript
    {
      "error": "invalid token"
    }
    ```

  - **Status:** `500`
​
    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```
​
## GET allhistory
​
- **URL:** `/user/allhistory`
​
- **Method:** `GET`
​
- **Description:** `get all user history`

- **Request Header:**
​
  ```javascript
  {
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrZXZpbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoia2V2aW50YW4yMDNAZ21haWwuY29tIiwiaWF0IogxfQ._P4Q80dm_f5GwqXStXAh6rrODKsFOgqtcHQOHAkoENY, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    [
      {
        "id": 3,
        "email": "coba@gmail.com",
        "items": [
          {
            "name": "cod",
            "price": 12121,
            "quantity": 2,
            "totalprice": 24242
          }
        ],
        "totalquantity": 2,
        "totalprice": 24242,
        "createdAt": "2020-02-26T13:39:24.350Z",
        "updatedAt": "2020-02-26T13:39:24.350Z"
      },
      {
        "id": 2,
        "email": "coba@gmail.com",
        "items": [
          {
            "name": "qewqd",
            "price": 2,
            "quantity": 1,
            "totalprice": 2
          },
          {
            "name": "mantap",
            "price": 1111,
            "quantity": 2,
            "totalprice": 2222
          },
          {
            "name": "wqeqw",
            "price": 12,
            "quantity": 2,
            "totalprice": 24
          },
          {
            "name": "ini dia",
            "price": 4343,
            "quantity": 3,
            "totalprice": 13029
          }
        ],
        "totalquantity": 8,
        "totalprice": 15277,
        "createdAt": "2020-02-26T03:16:53.953Z",
        "updatedAt": "2020-02-26T03:16:53.953Z"
      },
      {
        "id": 1,
        "email": "coba@gmail.com",
        "items": [
          {
            "name": "cod",
            "price": 12121,
            "quantity": 13,
            "totalprice": 157573
          }
        ],
        "totalquantity": 13,
        "totalprice": 157573,
        "createdAt": "2020-02-25T14:13:59.685Z",
        "updatedAt": "2020-02-25T14:13:59.685Z"
      }
    ]
    ```
​
- **Error Response:**
  - **Status:** `400`
​
    ```javascript
    {
      "error": "invalid token"
    }
    ```

  - **Status:** `500`
​
    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```
​
## GET history
​
- **URL:** `/user/history`
​
- **Method:** `GET`
​
- **Description:** `get personal history`

- **Request Header:**
​
  ```javascript
  {
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrZXZpbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoia2V2aW50YW4yMDNAZ21haWwuY29tIiwiaWF0IogxfQ._P4Q80dm_f5GwqXStXAh6rrODKsFOgqtcHQOHAkoENY, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    [
      {
        "id": 7,
        "email": "insom@mail.com",
        "items": [
          {
            "name": "baru",
            "price": 5555,
            "quantity": 1,
            "totalprice": 5555
          },
          {
            "name": "baru",
            "price": 5555,
            "quantity": 1,
            "totalprice": 5555
          }
        ],
        "totalquantity": 2,
        "totalprice": 11110,
        "createdAt": "2020-02-27T01:45:47.750Z",
        "updatedAt": "2020-02-27T01:45:47.750Z"
      }
    ]
    ```
​
- **Error Response:**
  - **Status:** `400`
​
    ```javascript
    {
      "error": "invalid token"
    }
    ```

  - **Status:** `500`
​
    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```
​
## GET listproduct
​
- **URL:** `/product/listProduct`
​
- **Method:** `GET`
​
- **Description:** `get product list with stock more than 0`
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    [
      {
        "id": 1,
        "name": "cod",
        "CategoryId": 2,
        "image_url": "https://storage.googleapis.com/storage-example/kevin/440px-Permutation_generation_algorithms.svg.png.png",
        "price": 12121,
        "stock": 121178,
        "createdAt": "2020-02-22T06:27:15.814Z",
        "updatedAt": "2020-02-26T13:43:14.553Z",
        "Category": {
          "id": 2,
          "name": "tipe 2",
          "addedBy": "kevintan203@gmail.com",
          "createdAt": "2020-02-20T03:45:01.560Z",
          "updatedAt": "2020-02-20T03:45:01.560Z"
        },
        "Users": [
          {
            "id": 2,
            "username": "coba",
            "role": "member",
            "email": "coba@gmail.com",
            "createdAt": "2020-02-21T14:50:12.583Z",
            "updatedAt": "2020-02-21T14:50:12.583Z",
            "Cart": {
              "UserId": 2,
              "ProductId": 1,
              "amount": 1,
              "createdAt": "2020-02-26T16:54:07.472Z",
              "updatedAt": "2020-02-26T17:02:00.498Z"
            }
          }
        ]
      },
      {
        "id": 2,
        "name": "111",
        "CategoryId": 1,
        "image_url": "https://storage.googleapis.com/storage-example/kevin/maze.jpg.png",
        "price": 111,
        "stock": 111,
        "createdAt": "2020-02-22T06:35:26.406Z",
        "updatedAt": "2020-02-25T14:12:38.294Z",
        "Category": {
          "id": 1,
          "name": "tipe 1",
          "addedBy": "kevintan203@gmail.com",
          "createdAt": "2020-02-20T03:40:15.125Z",
          "updatedAt": "2020-02-20T03:40:15.125Z"
        },
        "Users": []
      },
      {
        "id": 3,
        "name": "tiga",
        "CategoryId": 2,
        "image_url": "https://storage.googleapis.com/storage-example/kevin/FacebookButton_post-image.jpg.png",
        "price": 23123,
        "stock": 321302,
        "createdAt": "2020-02-22T06:40:53.974Z",
        "updatedAt": "2020-02-26T12:51:17.543Z",
        "Category": {
          "id": 2,
          "name": "tipe 2",
          "addedBy": "kevintan203@gmail.com",
          "createdAt": "2020-02-20T03:45:01.560Z",
          "updatedAt": "2020-02-20T03:45:01.560Z"
        },
        "Users": []
      },
    ]
    ```
​
- **Error Response:**

  - **Status:** `500`
​
    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```


​
## GET filter by categoryid
​
- **URL:** `/product/listProduct/category/:id`
​
- **Method:** `GET`
​
- **Description:** `filter product by category id (exclude 0 stock)`
​
- **URL Params:** 
​
  ```javascript
  "id": 4, //required
  ```
​
- **Success Response:**
​
  - **Status:** `201`
  
    ```javascript
    [
      {
        "id": 8,
        "name": "kevin",
        "CategoryId": 4,
        "image_url": "https://storage.googleapis.com/storage-example/kevin/h8.jpg.png",
        "price": 9,
        "stock": 9,
        "createdAt": "2020-02-22T09:12:43.193Z",
        "updatedAt": "2020-02-24T16:07:51.596Z",
        "Category": {
          "id": 4,
          "name": "mantap",
          "addedBy": "kevintan203@gmail.com",
          "createdAt": "2020-02-22T05:12:04.209Z",
          "updatedAt": "2020-02-22T05:12:04.209Z"
        },
        "Users": []
      },
      {
        "id": 6,
        "name": "mantap",
        "CategoryId": 4,
        "image_url": "https://storage.googleapis.com/storage-example/kevin/chamber.jpg.png",
        "price": 1111,
        "stock": 11108,
        "createdAt": "2020-02-22T08:00:17.298Z",
        "updatedAt": "2020-02-26T10:21:37.518Z",
        "Category": {
          "id": 4,
          "name": "mantap",
          "addedBy": "kevintan203@gmail.com",
          "createdAt": "2020-02-22T05:12:04.209Z",
          "updatedAt": "2020-02-22T05:12:04.209Z"
        },
        "Users": []
      }
    ]
    ```
    
  
- **Error Response:**
​
  - **Status:** `500`
  
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```


## GET filter by categoryid
​
- **URL:** `/product/adminListProductlistProduct/category/:id`
​
- **Method:** `GET`
​
- **Description:** `filter product by category id (include 0 stock)`
​
- **URL Params:** 
​
  ```javascript
  "id": 2, //required
  ```
​
- **Success Response:**
​
  - **Status:** `200`
  
    ```javascript
    [
      {
        "id": 13,
        "name": "qewqd",
        "CategoryId": 2,
        "image_url": "",
        "price": 2,
        "stock": 0,
        "createdAt": "2020-02-24T16:25:10.649Z",
        "updatedAt": "2020-02-26T13:26:15.561Z",
        "Category": {
          "id": 2,
          "name": "tipe 2",
          "addedBy": "kevintan203@gmail.com",
          "createdAt": "2020-02-20T03:45:01.560Z",
          "updatedAt": "2020-02-20T03:45:01.560Z"
        },
        "Users": []
      },
      {
        "id": 1,
        "name": "cod",
        "CategoryId": 2,
        "image_url": "https://storage.googleapis.com/storage-example/kevin/440px-Permutation_generation_algorithms.svg.png.png",
        "price": 12121,
        "stock": 121178,
        "createdAt": "2020-02-22T06:27:15.814Z",
        "updatedAt": "2020-02-26T13:43:14.553Z",
        "Category": {
          "id": 2,
          "name": "tipe 2",
          "addedBy": "kevintan203@gmail.com",
          "createdAt": "2020-02-20T03:45:01.560Z",
          "updatedAt": "2020-02-20T03:45:01.560Z"
        },
        "Users": [
          {
            "id": 2,
            "username": "coba",
            "role": "member",
            "email": "coba@gmail.com",
            "password": "$2b$11$vN7XKhTcu79hbLCupwLQ9eGVkF/wCK0HCsNGB9vo2q0dD5vXksyr2",
            "createdAt": "2020-02-21T14:50:12.583Z",
            "updatedAt": "2020-02-21T14:50:12.583Z",
            "Cart": {
              "UserId": 2,
              "ProductId": 1,
              "amount": 1,
              "createdAt": "2020-02-26T16:54:07.472Z",
              "updatedAt": "2020-02-26T17:02:00.498Z"
            }
          }
        ]
      }
    ]
    ```
    
- **Error Response:**
​
  - **Status:** `500`
  
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```


## **Add Product**
​
- **URL:** `/product/addProduct`
​
- **Method:** `POST`
​
- **Description:** `add product`
​
- **Request body:**
​
  ```javascript
  {
    "name": "contoh",
    "CategoryId":"1",
    "price":"4",
    "stock":"7"
  }
  ```
​
- **Success Response:**
​
  - **Status:** `201`
​
    ```javascript
    {
      "id": 14,
      "name": "contoh",
      "image_url": null,
      "CategoryId": 1,
      "price": 4,
      "stock": 7,
      "updatedAt": "2020-02-26T19:33:29.080Z",
      "createdAt": "2020-02-26T19:33:29.080Z"
    }
    ```
​
- **Error Response:**
​
  - **Status:** `400`
​
    ```javascript
    {
      "error": [
        "Please input product name",
        "Please input product category"
      ]
    }
    ```
​
  - **Status:** `500`
​
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```
​
## **Banner**
​
- **URL:** `/product/banner`
​
- **Method:** `GET`
​
- **Description:** `Get banner`
​
- **Success Response:**
​
  - **Status:** `201`
​
    ```javascript
    [
      "https://storage.googleapis.com/storage-example/kevin/h8.jpg.png",
      "https://storage.googleapis.com/storage-example/kevin/chamber.jpg.png",
      "https://storage.googleapis.com/storage-example/kevin/add.jpg.png",
      "https://storage.googleapis.com/storage-example/kevin/chamber.jpg.png",
      "https://storage.googleapis.com/storage-example/kevin/FacebookButton_post-image.jpg.png",
      "https://storage.googleapis.com/storage-example/kevin/maze.jpg.png",
      "https://storage.googleapis.com/storage-example/kevin/440px-Permutation_generation_algorithms.svg.png.png"
    ]
    ```
​
- **Error Response:**
​
  - **Status:** `500`
​
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```
​
## Update Product
​
- **URL:** `/product/updateProduct/:id`
​
- **Method:** `PUT`
​
- **Description:** `Change the data of product` 
​
- **URL Params:** 
​
  ```javascript
  "id": 14, //required
  ```
​
- **Request Header:**
​
  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NfwefwefwfqwfpeokdcpqokwocqdeiIsInR, //required
  }
  ```
​
- **Request Body:**
​
  ```javascript
  {
    "name": "contohlagi",
    "CategoryId":"2",
    "price":"5",
    "stock":"7"
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    [
      1,
      [
        {
          "id": 14,
          "name": "contohlagi",
          "CategoryId": 2,
          "image_url": null,
          "price": 5,
          "stock": 7,
          "createdAt": "2020-02-26T19:33:29.080Z",
          "updatedAt": "2020-02-26T19:42:30.415Z"
        }
      ]
    ]
    ```
  
- **Error Response:**
​
  - **Status:** `404`
​
    ```javascript
    {
      "error": "product not found"
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```

## Delete Product
​
- **URL:** `/product/deleteProduct/:id`
​
- **Method:** `DELETE`
​
- **Description:** `detele the product` 
​
- **URL Params:** 
​
  ```javascript
  "id": 14, //required
  ```
​
- **Request Header:**
​
  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NfwefwefwfqwfpeokdcpqokwocqdeiIsInR, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    1
    ```
  
- **Error Response:**
​
  - **Status:** `404`
​
    ```javascript
    {
      "error": "product not found"
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```


## GET category list
​
- **URL:** `/category/listCategory`
​
- **Method:** `GET`
​
- **Description:** `get category list`
​
- **Success Response:**
​
  - **Status:** `200`
  
    ```javascript
    [
      {
        "id": 1,
        "name": "tipe 1",
        "addedBy": "kevintan203@gmail.com",
        "createdAt": "2020-02-20T03:40:15.125Z",
        "updatedAt": "2020-02-20T03:40:15.125Z"
      },
      {
        "id": 2,
        "name": "tipe 2",
        "addedBy": "kevintan203@gmail.com",
        "createdAt": "2020-02-20T03:45:01.560Z",
        "updatedAt": "2020-02-20T03:45:01.560Z"
      },
      {
        "id": 3,
        "name": "ref",
        "addedBy": "kevintan203@gmail.com",
        "createdAt": "2020-02-22T05:02:33.897Z",
        "updatedAt": "2020-02-22T05:02:33.897Z"
      },
      {
        "id": 4,
        "name": "mantap",
        "addedBy": "kevintan203@gmail.com",
        "createdAt": "2020-02-22T05:12:04.209Z",
        "updatedAt": "2020-02-22T05:12:04.209Z"
      }
    ]
    ```
    
  
- **Error Response:**
​
  - **Status:** `500`
  
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```


## Add Category
​
- **URL:** `/category/addCategory`
​
- **Method:** `POST`
​
- **Description:** `Add category` 
​
- **Request Header:**
​
  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NfwefwefwfqwfpeokdcpqokwocqdeiIsInR, //required
  }
  ```
​
- **Request Body:**
​
  ```javascript
  {
    "name": "contohlagi",
    "CategoryId":"2",
    "price":"5",
    "stock":"7"
  }
  ```
​
- **Success Response:**
​
  - **Status:** `201`
​
    ```javascript
    {
      "id": 5,
      "name": "contohcat",
      "addedBy": "kevintan203@gmail.com",
      "updatedAt": "2020-02-26T20:06:26.598Z",
      "createdAt": "2020-02-26T20:06:26.598Z"
    } 
    ```
  
- **Error Response:**
​
  - **Status:** `400`
​
    ```javascript
    {
      "error": [
        "Please input category name"
      ]
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```
    

## Update Category
​
- **URL:** `/category/updateCategory/:id`
​
- **Method:** `PUT`
​
- **Description:** `Change the data of category` 
​
- **URL Params:** 
​
  ```javascript
  "id": 5, //required
  ```
​
- **Request Header:**
​
  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NfwefwefwfqwfpeokdcpqokwocqdeiIsInR, //required
  }
  ```
​
- **Request Body:**
​
  ```javascript
  {
    "name": "contohaja"
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    [
      1
    ]
    ```
  
- **Error Response:**
​
  - **Status:** `404`
​
    ```javascript
    {
      "error": "product not found"
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```
    


## Delete Category
​
- **URL:** `/category/deleteCategory/:id`
​
- **Method:** `DELETE`
​
- **Description:** `detele the category` 
​
- **URL Params:** 
​
  ```javascript
  "id": 5, //required
  ```
​
- **Request Header:**
​
  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NfwefwefwfqwfpeokdcpqokwocqdeiIsInR, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    1
    ```
  
- **Error Response:**
​
  - **Status:** `404`
​
    ```javascript
    {
      "error": "product not found"
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```


## GET cart
​
- **URL:** `/cart`
​
- **Method:** `GET`
​
- **Description:** `get cart data`

- **Request Header:**
​
  ```javascript
  {
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrZXZpbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoia2V2aW50YW4yMDNAZ21haWwuY29tIi._P4Q80dm_f5GwqXStXAh6rrODKsFOgqtcHQOHAkoENY, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    [
      {
        "UserId": 3,
        "ProductId": 4,
        "amount": 1,
        "createdAt": "2020-02-26T20:21:17.474Z",
        "updatedAt": "2020-02-26T20:21:17.474Z",
        "Product": {
          "id": 4,
          "name": "baru",
          "CategoryId": 2,
          "image_url": "https://storage.googleapis.com/storage-example/kevin/chamber.jpg.png",
          "price": 5555,
          "stock": 6666,
          "createdAt": "2020-02-22T06:50:28.347Z",
          "updatedAt": "2020-02-22T09:22:34.036Z"
        }
      },
      {
        "UserId": 3,
        "ProductId": 4,
        "amount": 1,
        "createdAt": "2020-02-26T20:21:44.140Z",
        "updatedAt": "2020-02-26T20:21:44.140Z",
        "Product": {
          "id": 4,
          "name": "baru",
          "CategoryId": 2,
          "image_url": "https://storage.googleapis.com/storage-example/kevin/chamber.jpg.png",
          "price": 5555,
          "stock": 6666,
          "createdAt": "2020-02-22T06:50:28.347Z",
          "updatedAt": "2020-02-22T09:22:34.036Z"
        }
      }
    ]
    ```
​
- **Error Response:**
​  - **Status:** `400`
​
    ```javascript
    {
      "error": "invalid token"
    }
    ```

  - **Status:** `500`
​
    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```
​

## Add cart
​
- **URL:** `/cart`
​
- **Method:** `POST`
​
- **Description:** `add cart data`

- **Request Header:**
​
  ```javascript
  {
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrZXZpbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoia2V2aW50YW4yMDNAZ21haWwuY29tIi._P4Q80dm_f5GwqXStXAh6rrODKsFOgqtcHQOHAkoENY, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    {
      "UserId": 3,
      "ProductId": 4,
      "amount": 1,
      "updatedAt": "2020-02-26T20:21:44.140Z",
      "createdAt": "2020-02-26T20:21:44.140Z",
      "id": 36
    }
    ```
​
- **Error Response:**
  - **Status:** `400`
​
    ```javascript
    {
      "error": "invalid token"
    }
    ```

  - **Status:** `500`
​
    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```
​

## Update Cart
​
- **URL:** `/cart`
​
- **Method:** `PUT`
​
- **Description:** `Change the data of Cart` 
​
- **Request Header:**
​
  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NfefwefwfqwfpeokdcpqokwocqdewqdiIsInR, //required
  }
  ```
​
- **Request Body:**
​
  ```javascript
  {
    "ProductId": "4",
    "amount":"20000000",
    "action":"plus"
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    [
      1
    ]
    ```
  
- **Error Response:**
​
  - **Status:** `404`
​
    ```javascript
    {
      "error": "product out of stock, current stock is 6666"
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```

## Delete Product from Cart
​
- **URL:** `/cart`
​
- **Method:** `DELETE`
​
- **Description:** `detele the product from cart` 
​
- **Request Header:**
​
  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NfwefwefwfqwfpekopopokdcpqokwocqdeiIsInR, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    1
    ```
  
- **Error Response:**
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```


## Payment
​
- **URL:** `/cart/payment`
​
- **Method:** `DELETE`
​
- **Description:** `detele cart, update product data and move record to history` 
​
- **Request Header:**
​
  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NfwefwefwfqwfpeokdcpqokwocqdeiIsInR, //required
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    1
    ```
  
- **Error Response:**
​
  - **Status:** `404`
​
    ```javascript
    {
      "error": "product stock not enough, currently stock is ..."
    }
    ```
    
  - **Status:** `500`
    
    ```javascript
      {
          "errors": "Server currently unable to handle this request"
      }
    ```