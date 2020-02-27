# e-commerce
## Follow link for Detail use API
https://documenter.getpostman.com/view/10541895/SzKYQctt?version=latest#18377576-0f6c-4513-9a35-50b175d1f646
## User Register
----
  Returns json data.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

    `name=[string]`

   `username=[string]`

   `email=[string]`

   `password=[string]`

* **Success Response:**
  ### Input

      name = 'Arif Rachman Husen''

      username = 'arif05rachman'
      
      email = 'arif05rachman@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 200 OK<br />
    **Content:** 

        {id": 3,
        "name": "Arif Rachman husen",
        "username": "arif05rachman",
        "email": "arif05rachman@gmail.com",
        "password": "$2b$10$8l13KvSs1Sq19Vzk60HQOu74qG4PDjSTMTvtmhBX4Ntd7j5.zN3KC",
        "updatedAt": "2020-02-14T15:37:46.848Z",
        "createdAt": "2020-02-14T15:37:46.848Z"}
 
* **Error Response:**

  ### Input

      name = ''

      username = ''
      
      email = arif05rachman.com

      password = ''

  ### Response

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "User.password cannot be null",
    "Validation isEmail on email failed",
    "Validation notEmpty on name failed",
    "Validation notEmpty on username failed"
  ]
}`

  OR
  ### Input

      name = 'Arif Rachman Husen''

      username = 'arif05rachman'
      
      email = 'arif05rachman@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 409 Conflict <br />
    **Content:** `{ "message": "Email already register"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/register`,{
      name:name ,username:username ,email:email ,password:password
  })
  ```
## User Login
----
  Returns json data.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

   `email=[string]`

   `password=[string]`

* **Success Response:**
  ### Input
     
      email = 'arif05rachman@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 200 OK<br />
    **Content:** 

        `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw"}`
 
* **Error Response:**

  ### Input
     
      email = ''

      password = ''

  ### Response

  * **Code:** 400  BadRequest<br />
    **Content:** `{
  "message": [
    "User.password cannot be null",
    "Validation isEmail on email failed",
  ]
}`

  OR
  ### Input
     
      email = 'arif05rachman@gmail.com'

      password = 'qwerty'

  ### Response
  * **Code:** 401 Unauthorize <br />
    **Content:** `{
  "message": "Email or Password wrong"
}`

  OR
  ### Input
     
      email = 'arif05@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "User Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/login`,{
      email:email ,password:password
  })
  ```

## Create Product
----
  Returns json data.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**
    
        none

*   **Header:**
    
        token : `AdministratorId=[integer]`

* **Data Body**

        `name=[string]`

        `image_url=[string]`

        `price=[integer]`

        `stock=[integer]`

* **Success Response:**
    ### input header

        token : `AdministratorId=[integer]`
    
    ### input body
        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30
        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}`
 
* **Error Response:**
    ### input header

        token : `AdministratorId=[integer]`
    
    ### input body
        name: ,

        image_url: http://localhost:3000/assets/image/product.txt,

        price: -200000,

        stock: '30'
  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "Validation notEmpty on name failed",
    "Validation imageExtention on image_url failed",
    "Validation notNegativeValue on price failed",
    "Validation isNumber on stock failed"
  ]
}`

OR

* **Error Response:**
    ### input header

        token : ``
    
    ### input body
        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30

  * **Code:** 406 BadRequest <br />
    **Content:** `{
  "message": "jwt must be provided"
}`


* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/products`,{
      name:name ,image_url:image_url ,price:200000 ,stock:30
  })

## Read All Product
----
  Returns json data.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**
    
        none

   **Header:**
    
        token : `AdministratorId=[integer]`

* **Data Body**
        none

* **Success Response:**
    ### input header

        token : `AdministratorId=[integer]`
    
    ### input body

        
  * **Code:** 200 OK<br />
    **Content:** `[
        {
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
},{
    "id": 4,
    "name": "Boots",
    "image_url": "http://localhost:3000/assets/image/product2.jpg",
    "price": 100000,
    "stock": 20,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}
]`
* **Error Response:**

    ### input header

        token : ``
    
    ### input body
        none

  * **Code:** 406 BadRequest <br />
    **Content:** `{
  "message": "jwt must be provided"
}`


* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/products`)


## Read One Product
----
  Returns json data.

* **URL**

  /products/id

* **Method:**

  `GET`
  
*  **URL Params**
    
        `id:3

*   **Header:**
    
        token : `AdministratorId=[integer]`

* **Data Body**
        
        none

* **Success Response:**

    ### input header

        token : `AdministratorId=[integer]`
    
    ### input body

        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}
`
 
* **Error Response:**

    ### input header

        token : ``
        
    
    ### input body
        none

  * **Code:** 404 BadRequest <br />
    **Content:** `{
  "message": "jwt must be provided"
}`

OR

* **Error Response:**

    ### input header

        token : `AdministratorId=[integer]`

    
    ### input body
        none

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/products/id`)


## Update Product
----
  Returns json data.

* **URL**

  /products/id

* **Method:**

  `PUT`
  
*  **URL Params**
    
        `id:[integer]`

*   **Header:**
    
        token : `AdministratorId=[integer]`

* **Data Body**

        `name=[string]`

        `image_url=[string]`

        `price=[integer]`

        `stock=[integer]`

* **Success Response:**

    ### params
    
        id : `3`

    ### input header

        token : `AdministratorId=[integer]`
    
    ### input body
        id : 3

        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30
        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}`
 
* **Error Response:**

    ### params
    
        id : `3`

    ### input header

        token : `AdministratorId=[integer]`
    
    ### input body
        name: ,

        image_url: http://localhost:3000/assets/image/product.txt,

        price: -200000,

        stock: '30'
  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "Validation notEmpty on name failed",
    "Validation imageExtention on image_url failed",
    "Validation notNegativeValue on price failed",
    "Validation isNumber on stock failed"
  ]
}`

OR

* **Error Response:**
    ### params
    
        id : `3`

    ### input header

        token : ``
    
    ### input body
        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30

  * **Code:** 406 BadRequest <br />
    **Content:** `{
  "message": "jwt must be provided"
}`


OR

* **Error Response:**
    ### params
    
        id : `90`

    ### input header

        token : `AdministratorId=[integer]`

    
    ### input body
        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .put(`${process.env.BASE_URL}/products/id`,{
      name:name ,image_url:image_url ,price:200000 ,stock:30
  })


## Delete Product
----
  Returns json data.

* **URL**

  /products/id

* **Method:**

  `DELETE`
  
*  **URL Params**
    
        `id:[integer]`

*   **Header:**
    
        token : `AdministratorId=[integer]`

* **Data Body**

        `name=[string]`

        `image_url=[string]`

        `price=[integer]`

        `stock=[integer]`

* **Success Response:**

    ### params
    
        id : `3`

    ### input header

        token : `AdministratorId=[integer]`
    
    ### input body
        none
        
  * **Code:** 200 OK<br />
    **Content:** `[ 1 , {
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}]`
 
* **Error Response:**

    ### params
    
        id : `3`

    ### input header

        token : ``
    
    ### input body
        none
  * **Code:** 406 NotAcceptable <br />
    **Content:** `{
  "message": "jwt must be provided"
} `

OR

* **Error Response:**
    ### params
    
        id : `90`

    ### input header

        token : `AdministratorId=[integer]`

    
    ### input body
        none

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .delete(`${process.env.BASE_URL}/products/id`,{
      name:name ,image_url:image_url ,price:200000 ,stock:30
  })
