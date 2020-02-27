# E-Commerce API documentation
created by Muhammad Ali Mazhuda
<br>

1. Login
* url : http://localhost:3000/login
* method : POST
* headers : none
* parameter sent : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|email       |String |required
    | 2|password    |String |required

* response : 
    ```
    {
        "access_token": " XXXXX ",
        "email": "user@mail.com",
        "role": "member || admin || super_admin",
        "carts": [
            {
                "id": 1,
                "name": "Kingdom 8",
                "price": 4250000,
                "img_url": "http://tas.jpg",
                "stock": 0,
                "CategoryId": 1,
                "createdAt": "2020-02-26T13:42:01.720Z",
                "updatedAt": "2020-02-27T03:41:33.810Z",
                "Carts": {
                    "createdAt": "2020-02-27T03:41:15.900Z",
                    "updatedAt": "2020-02-27T03:41:15.900Z",
                    "ProductId": 1,
                    "UserId": 1
                }
            }
        ]
    }
    ```

2. Register / Create User
* url : http://localhost:3000/users
* method : POST
* headers : none
* parameter sent : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|email       |String |required
    | 2|password    |String |required

* response : 
    ```
    {
        "id": 2,
        "email": "user2@mail.com",
        "password": "$2b$10$QpkK0/.lvMqDqonD3cXHNewJsYBsU1YtvKhVw/aO7Wx1DU39EMlZC",
        "RoleId": 1 || 2 || 3,
        "updatedAt": "2020-02-27T03:58:39.195Z",
        "createdAt": "2020-02-27T03:58:39.195Z"
    }
    ```
<br>

3. Get Users
* url : http://localhost:3000/users
* method : GET
* headers :
    ```
    { token : 'xxxxxxxxxxx'}
    ```
* parameter sent : none
* response : 
    ```
    [
        {
            "id": 1,
            "email": "super_admin@mail.com",
            "password": "$2b$10$qVcfC4VrT9ja.rptSz91Q.iCRMCRZzHn0wcdeSOPQIyVbX5Mo7zMO",
            "RoleId": 1,
            "createdAt": "2020-02-26T13:17:52.612Z",
            "updatedAt": "2020-02-26T13:17:52.612Z"
        }
    ]
    ```
<br>

4. Get Categories
* url : http://localhost:3000/categories
* method : GET
* headers : none
* parameter sent : none
* response : 
    ```
    [
        {
            "id": 1,
            "name": "Backpack",
            "createdAt": "2020-02-26T13:37:20.696Z",
            "updatedAt": "2020-02-26T13:37:20.696Z",
            "Products": [
                {
                    "id": 2,
                    "name": "Badlands",
                    "price": 495000,
                    "img_url": "http://image.jpg",
                    "stock": 2,
                    "CategoryId": 1,
                    "createdAt": "2020-02-26T13:39:04.550Z",
                    "updatedAt": "2020-02-27T03:25:43.921Z"
                }
            ]
        }
    ]
    ```
<br>

5. Add Category
* url : http://localhost:3000/categories
* method : POST
* headers : 
    ```
    { token : 'xxxxxxxxxxx'}
    ```
* parameter sent :
    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|name        |String |required
    
* response : 
    ```
    {
        "data": {
            "id": 5,
            "name": "Sleeping Bag",
            "updatedAt": "2020-02-27T04:14:51.180Z",
            "createdAt": "2020-02-27T04:14:51.180Z"
        },
        "message": "Successfully added a category"
    }
    ```
<br>

6. Update Category
* url : http://localhost:3000/categories/id
* method : PUT
* headers : 
    ```
    { token : 'xxxxxxxxxxx'}
    ```
* parameter sent :
    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|name        |String |required

* response : 
    ```
    {
        "message": "Successfully updated category"
    }
    ```
<br>

7. Delete Category
* url : http://localhost:3000/categories/id
* method : DELETE
* headers : 
    ```
    { token : 'xxxxxxxxxxx'}
    ```
* parameter sent : none

* response : 
    ```
    {
        "message": "Successfully deleted category"
    }
    ```
<br>


8. Get Products
* url : http://localhost:3000/products
* method : GET
* headers : none
* parameter sent : none
* response : 
    ```
    [
        {
            "id": 3,
            "name": "Milford",
            "price": 395000,
            "img_url": "http://image.jpg",
            "stock": 3,
            "CategoryId": 2,
            "createdAt": "2020-02-26T13:40:07.747Z",
            "updatedAt": "2020-02-27T03:00:33.780Z"
        }
    ]
    ```
<br>

9. Add Product
* url : http://localhost:3000/products
* method : POST
* headers : 
    ```
    { token : 'xxxxxxxxxxx'}
    ```
* parameter sent :
    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|name        |String |required
    | 2|stock       |Number |required
    | 3|price       |Number |required
    | 4|categoryId  |Number |required
    | 5|img_url     |String |required
    
* response : 
    ```
    {
        "message": "Successfully added a product",
        "data": {
            "id": 7,
            "name": "Consina Sleeping Bag",
            "price": 200000,
            "img_url": "http://image.jpg",
            "stock": 5,
            "CategoryId": 1,
            "updatedAt": "2020-02-27T04:27:26.334Z",
            "createdAt": "2020-02-27T04:27:26.334Z"
        }
    }
    ```
<br>

10. Update Product
* url : http://localhost:3000/products/id
* method : PUT
* headers : 
    ```
    { token : 'xxxxxxxxxxx'}
    ```
* parameter sent :
    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|name        |String |optional
    | 2|stock       |Number |optional
    | 3|price       |Number |optional
    | 4|category    |String |optional
    | 5|image_url   |String |optional

* response : 
    ```
    {
        "message": "Successfully updated product"
    }
    ```
<br>

11. Delete Product
* url : http://localhost:3000/products/id
* method : DELETE
* headers : 
    ```
    { token : 'xxxxxxxxxxx'}
    ```
* parameter sent : none

* response : 
    ```
    {
        "message": "Successfully deleted product"
    }
    ```
<br>


## HTTP Error Code
---

|No|Code    |Name           |Comment
|--|--------|---------------|---------
| 1|400     |Bad Request    |Missing field on request
| 2|404     |Not Found      |Id not found
| 3|500     |Server Error   |Server Error