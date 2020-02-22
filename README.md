# Disekrip dokumentasi API

# Deploy pages

client : https://disekrip-commerce-cms.firebaseapp.com/<br>
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
User is empty!
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