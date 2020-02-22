# TapFirst
​
------
​
#### **Base URL :** `https://everythinghere.firebaseapp.com/`
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
#### **Routes:**
| **Route**                   | **HTTP** | **Description**                                     |
| --------------------------- | -------- | --------------------------------------------------- |
| /user/register              | POST     | Register user                                       |
| /user/login                 | POST     | Login user                                          |
| /user/listUser              | GET      | Get List of users                                   |
| /product/listProduct        | GET      | Get list of products                                |
| /product/addProduct         | POST     | Add product                                         |
| /product/deleteProduct:id   | DELETE   | Delete product                                      |
| /product/updateProduct:id   | PUT      | Update product                                      |
| /category/listcategory      | GET      | Get category list                                   |
| /category/addcategory       | POST     | Add category                                        |
| /category/deletecategory/:id| DELETE   | Delete category                                     |
| /category/updatecategory/:id| PUT      | Update category                                     |
​

#### **List of Errors:**
| **Code** | **Name**              | **Description**                                |
| -------- | --------------------- | ---------------------------------------------- |
| 400      | Bad Request           | Incorrect form validation                      |
| 500      | Internal Server Error | Server currently unable to handle this request |
​
​
​
## **POST user**
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
    "username":"maantap" //required, not empty
    "email":"maantap@gmail.com" //required, not empty
    "password":"12345678" //required, min 8
  }
  ```
​
- **Success Response:**
​
  - **Status:** `201`
​
    ```javascript
    {
      "id": 2,
      "username": "maantap",
      "email":"maantap@gmail.com"
      "updatedAt": "2020-02-21T03:05:52.811Z",
      "createdAt": "2020-02-21T03:05:52.811Z"
    }
    ```
​
- **Error Response:**
​
  - **Status:** `400`
​
    ```javascript
    {
        "errors": [
            "Validation error: username cant be empty",
            "Validation error: password min length is 8",
            "Validation error: email cant be empty",
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
    "email": "kevin@gmail.com"
    "password": "12345678"
  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    {
      email: "kevin@gmail.com"
      token: "token"
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
​
- **Request Body:**
​
  ```javascript
  {

  }
  ```
​
- **Success Response:**
​
  - **Status:** `200`
​
    ```javascript
    {

    }
    ```
​
- **Error Response:**
​  - **Status:** `400`
​
    ```javascript
    {
        "errors": [
          message: "not authorized
        ]
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
​
​