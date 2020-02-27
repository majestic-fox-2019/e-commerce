# e-commerce



link :https://matea-c9762.firebaseapp.com



## Getting Started

#### Install Package

```javascript
npm install
```



## ENDPOINTS

#### EndPoints /products

| Method | EndPoints     | Description                  |
| ------ | ------------- | ---------------------------- |
| POST   | /products     | Create a product             |
| GET    | /products     | Get all list products        |
| PUT    | /products/:id | Update a product based on id |
| DELETE | /products/:id | Delete a product based on id |

#### EndPoints /user

| Method | Endpoints      | Description    |
| ------ | -------------- | -------------- |
| POST   | /user/register | Create an user |
| POST   | /user/login    | Login an user  |

#### EndPoints /category

| Method | EndPoints  | Description       |
| ------ | ---------- | ----------------- |
| POST   | /category/ | Create a category |
| GET    | /category  | Get a category    |
| Delete | /category  | Delete a category |

#### EndPoints /cart

| Method | EndPoints      | Description                                   |
| ------ | -------------- | --------------------------------------------- |
| GET    | /cart          | Get an user include cart with product         |
| POST   | /cart          | Create a cart                                 |
| PUT    | /cart          | Update a cart                                 |
| DELETE | /cart/:id      | Delete a cart                                 |
| put    | /cart/checkout | Update stock for product and delete user cart |



## 1. POST /products

#### EndPoint:

| Methods | EndPoints | Description      |
| ------- | --------- | ---------------- |
| POST    | /products | Create a product |

#### Schema:

​	Value :

* name: string,
* image_url: string,
* price:integer,
* stock:integer,
* CategoryId:integer

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Request Body:

```json
{
	"name": "Chai on me",
	"image_url":"https://havillatea.com/wp-content/uploads/2017/06/Svadista-Chai.png",
  "price":120000,
  "stock":20,
  "CategoryId":2
}
```

#### Response:

##### 		success:

* 201

```json
{
    "id": 1,
    "name": "Chai on me",
		"image_url":"https://havillatea.com/wp-content/uploads/2017/06/Svadista-Chai.png",
  	"price":120000,
  	"stock":20,
  	"CategoryId":2
    "updatedAt": "2020-02-22T10:54:12.837Z",
    "createdAt": "2020-02-22T10:54:12.837Z"
}
```

##### 	error:

* 400

  ```json
  {
  "message": "Validation error: price must be filled"
  }
  ```





# 2. Get /products 

#### EndPoint:

| Methods | EndPoints | Description      |
| ------- | --------- | ---------------- |
| GET     | /products | Get all products |

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



#### Response:

##### 		success:

- 200

```json
[
    {
      "id": 1,
      "name": "Chai on me",
      "image_url":"https://havillatea.com/wp-content/uploads/2017/06/Svadista-Chai.png",
      "price":120000,
      "stock":20,
      "CategoryId":2
      "updatedAt": "2020-02-22T10:54:12.837Z",
      "createdAt": "2020-02-22T10:54:12.837Z"
		}
]
```



# 4. Put /products/:id

#### EndPoint:

| Methods | EndPoints     | Description      |
| ------- | ------------- | ---------------- |
| Put     | /products/:id | update a product |

#### Schema:

​	Value :

* name: string,
* image_url: string,
* price:integer,
* stock:integer,
* CategoryId:integer

##### request parameter:

```javascript
http://localhost:3000/products/12
```

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### request body:

```json
{
    "name": "Chai",
		"image_url":"https://havillatea.com/wp-content/uploads/2017/06/Svadista-Chai.png",
  	"price":120000,
  	"stock":20,
  	"CategoryId":2
}
```

##### response :

##### 	Success

- 200

```javascript
{
      "id": 1,
      "name": "Chai",
      "image_url":"https://havillatea.com/wp-content/uploads/2017/06/Svadista-Chai.png",
      "price":120000,
      "stock":20,
      "CategoryId":2
      "updatedAt": "2020-02-22T11:30:02.837Z",
      "createdAt": "2020-02-22T10:54:12.837Z"
}
```

##### 	Error

- 400

```json
{
 "message": "Validation error: title must be filled"
 }
```

- 404

```json
{
    "message": "command not found"
}
```



# 5. Delete /products/:id

#### EndPoint:

| Methods | EndPoints     | Description      |
| ------- | ------------- | ---------------- |
| DELETE  | /products/:id | delete a product |

##### Request parameter:

```javascript
http://localhost:3000/products/1
```

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Response:

##### 	Success

- 200

```javascript
{
   
}
```

##### Error:

- 404

```json
{
    "message": "command not found"
}
```



## 6. POST /register

#### EndPoint:

| Methods | EndPoints      | Description      |
| ------- | -------------- | ---------------- |
| POST    | /user/register | Register an user |

##### Request body:

```json
{
    "username": "user",
    "password": "user",
    "email": "tambah@email.com"
}
```

##### Response:

##### 	Success

- 201

```json
{
    "id": 1,
    "username": "user",
    "password": "$2a$10$4KE6cyadeGnkmJotn6y4E.UBL6avbTx0Nod.VUjnE69m3l.U0PIi.",
    "email": "tambah@email.com",
    "updatedAt": "2020-02-20T08:31:08.131Z",
    "createdAt": "2020-02-20T08:31:08.131Z"
}
```

##### 	Error

- 400

```json
{
 "message": "Validation error: username must be filled"
 }
```



## 7.POST /login

#### EndPoint:

| Methods | EndPoints   | Description   |
| ------- | ----------- | ------------- |
| POST    | /user/login | Login an user |

##### Request Body

```json
{
  "email": "user@email.com",  
  "password": "user"
}
```

##### Response:

- 201

```json
{
  "token":your_own_token
}
```



- 404

```json
{
 "message": "Username or password wrong'"
 }
```



## 8.POST /category

#### EndPoint:

| Methods | EndPoints | Description       |
| ------- | --------- | ----------------- |
| POST    | /category | create a category |

#### Schema:

​	Value :

* name: string,

  

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Request Body:

```json
{
	"name": "Jasmine",
}
```

#### Response:

##### 		success:

* 201

```json
{
    "id": 1,
    "name": "Jasmine",
    "updatedAt": "2020-02-22T12:12:14.837Z",
    "createdAt": "2020-02-22T12:12:14.837Z"
}
```

##### 	error:

* 400

  ```json
  {
  "message": "Validation error: name must be filled"
  }
  ```



# 9. Get /category 

#### EndPoint:

| Methods | EndPoints | Description      |
| ------- | --------- | ---------------- |
| GET     | /category | Get all category |

##### Request Parameter:

```javascript
http://localhost:3000/category
```

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



#### Response:

##### 		success:

- 200

```json
[
    {
      "id": 1,
      "name": "Jasmine",
      "updatedAt": "2020-02-22T12:12:14.837Z",
      "createdAt": "2020-02-22T12:12:14.837Z"
		}
]
```



# 10. Delete category/:id

#### EndPoint:

| Methods | EndPoints     | Description       |
| ------- | ------------- | ----------------- |
| DELETE  | /category/:id | delete a category |

##### Request parameter:

```javascript
http://localhost:3000/category/1
```

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Response:

##### 	Success

- 200

```javascript
{
   
}
```

##### Error:

- 404

```json
{
    "message": "command not found"
}
```



# 11. Get /cart

#### EndPoint:

| Methods | EndPoints | Description                           |
| ------- | --------- | ------------------------------------- |
| GET     | /cart     | Get an user include cart with product |

##### Request Header:

```json
{
	"token": your_OwnToken
}
```

##### Response:

##### 	Success

- 200

```javascript
{
    "id": 7,
    "email": "user@mail.com",
    "password": "$2a$10$f41I3D7nbRnvpTtt6qCny.0bg/P0yPmHrWZOnb2Iln9KOxEAyhhRS",
    "username": "user",
    "role": "user",
    "createdAt": "2020-02-21T12:39:50.992Z",
    "updatedAt": "2020-02-21T12:39:50.992Z",
    "Products": [
        {
            "id": 21,
            "name": "Ding Dong",
            "image_url": "https://havillatea.com/wp-content/uploads/2017/06/dongding-510x510.jpg",
            "price": 200000,
            "stock": 200,
            "CategoryId": 2,
            "createdAt": "2020-02-19T10:11:53.164Z",
            "updatedAt": "2020-02-19T12:09:24.642Z",
            "Cart": {
                "UserId": 7,
                "ProductId": 21,
                "total": 5,
                "createdAt": "2020-02-25T06:42:57.710Z",
                "updatedAt": "2020-02-25T15:53:57.897Z"
            }
        },
        {
            "id": 28,
            "name": "Earl Grey Tea",
            "image_url": "https://havillatea.com/wp-content/uploads/2019/06/classic-earl-grey-510x510.jpg",
            "price": 100000,
            "stock": 30,
            "CategoryId": 3,
            "createdAt": "2020-02-20T05:11:40.996Z",
            "updatedAt": "2020-02-20T05:11:40.996Z",
            "Cart": {
                "UserId": 7,
                "ProductId": 28,
                "total": 6,
                "createdAt": "2020-02-25T11:00:39.445Z",
                "updatedAt": "2020-02-25T13:52:12.532Z"
            }
        }
    ]
}
```

##### 

# 12. POST /cart

#### EndPoint:

| Methods | EndPoints | Description                           |
| ------- | --------- | ------------------------------------- |
| GET     | /cart     | Get an user include cart with product |



#### Schema:

​	Value :

* total: integer,

* ProductId:integer

* UserId:integer

  

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Request Body:

```json
{
	"name": "Jasmine",
}
```

#### Response:

##### 		success:

* 201

```json
{
    "total": 10,
    "ProductId": 21,
    "UserId": 7,
    "updatedAt": "2020-02-27T04:35:23.458Z",
    "createdAt": "2020-02-27T04:35:23.458Z",
    "id": 49
}
```

##### 	error:

* 400

  ```json
  {
      "message": "Validation error: total must be filled"
  }
  ```



## 13. PUT /cart

#### EndPoint:

| Methods | EndPoints | Description   |
| ------- | --------- | ------------- |
| PUT     | /cart     | update a cart |

Value :

* total: integer,
* ProductId:integer
* UserId:integer

#### Response :

##### 	Success

- 200

```javascript
{
    "id": 49,
    "UserId": 7,
    "ProductId": 21,
    "total": 19,
    "createdAt": "2020-02-27T04:35:23.458Z",
    "updatedAt": "2020-02-27T04:49:18.723Z"
}
```

#### 	Error:

- 400

```json
{
 "message": "Validation error: title must be filled"
 }
```

- 404

```json
{
    "message": "command not found"
}
```



## 14. Delete /cart/:id

#### EndPoint:

| Methods | EndPoints | Description   |
| ------- | --------- | ------------- |
| DELETE  | /cart/:id | delete a cart |

##### Request parameter:

```javascript
http://localhost:3000/cart/21
```

##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Response:

##### 	Success

- 200

```javascript
{
   
}
```

##### Error:

- 404

```json
{
    "message": "command not found"
}
```



# 15. PUT /cart/checkout

#### EndPoint:

| Methods | EndPoints      | Description                                   |
| ------- | -------------- | --------------------------------------------- |
| PUT     | /cart/checkout | Update stock for product and delete user cart |

Value :

* cart: integer



##### Request Header:

```json
{
	"token": your_OwnToken
}
```



##### Response:

##### 	Success

- 200

```javascript
{
   "message":"checkout Success"
}
```

##### Error:

- 400

```json
{
    "message": "stock chai on me is not enough"
}
```

