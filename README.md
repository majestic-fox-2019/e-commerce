# e-commerce

* Avaible 3 role for such as :
    * Root
    * Admin
    * User
* Root have access to manipulate all data including user data, category data and product data, except create product.
* Admin have access to manipulate their own data, with authorization.
* User have no feature yet
* there is a filter feature to make it easier for users to read product data, by category

All routers, request, and responses

<pre>
POST /register

    body request:
        > username
        > email
        > password
        > role

    responses:
        {
            id:1, 
            username: "nanda", 
            email: "nanda@gmail.com"
            password: "nanda"
            role: "root"
        }

POST /login

    body request: 
        > email
        > password

    responses: 
        {  
            token: "blablabla",
            id: 1, 
            username: "nanda", 
            role: "root"
        }

GET /root/users

    responses: 
        [
            {
               id:1, 
                username: "nanda", 
                email: "nanda@gmail.com"
                password: "nanda"
                role: "root" 
            }, 
            ...
        ]

GET /root/users/:id
  
    params request: 
        > id
        
    responses:
        {
            id:1, 
            username: "nanda", 
            email: "nanda@gmail.com"
            password: "nanda"
            role: "root"
        }
        
 POST /root/users/
 
    body request: 
        > username
        > email
        > password
        > role

    responses:
        {
            id:1, 
            username: "nanda", 
            email: "nanda@gmail.com"
            password: "nanda"
            role: "root"
        }

PUT /root/users/:id

    params request:
        > id

    body request: 
        > username
        > email
        > password
        > role

    responses : 
        {
            id:1, 
            username: "nanda", 
            email: "nanda@gmail.com"
            password: "nanda"
            role: "root"
        }

DELETE /root/users/:id

    params request: 
        > id

    responses: 
        > number


GET /root/categories

    responses: 
        [
            {
                id:1, 
                name: "category"
            }, 
            ...
        ]

GET /root/categories/:id
  
    params request: 
        > id
        
    responses:
        {
            id:1, 
            name: "category"
        }
        
 POST /root/categories/
 
    body request: 
        > name

    responses:
        {
            id:1, 
            name: "category"
        }

PUT /root/categories/:id

    params request:
        > id

    body request: 
        > name

    responses : 
        {
            id:1, 
            name: "category"
        }

DELETE /root/categories/:id

    params request: 
        > id

    responses: 
        > number

GET /root/products

    responses: 
        [
            {
                id:1, 
                name: "product", 
                imageUrl: "url", 
                price: 10000000, 
                stock: 10,
                CategoryId: 1, 
                UserId: 1
            }, 
            ...
        ]

GET /root/products/:id
  
    params request: 
        > id
        
    responses:
        {
            id:1, 
            name: "product", 
            imageUrl: "url", 
            price: 10000000, 
            stock: 10,
            CategoryId: 1, 
            UserId: 1
        }
        
 POST /root/products/
 
    body request: 
        > name
        > imageUrl
        > price
        > stock
        > CategoryId
        > UserId

    responses:
        {
            id:1, 
            name: "product", 
            imageUrl: "url", 
            price: 10000000, 
            stock: 10,
            CategoryId: 1, 
            UserId: 1
        }

PUT /root/products/:id

    params request:
        > id

    body request: 
        > name
        > imageUrl
        > price
        > stock
        > CategoryId
        > UserId

    responses : 
        {
            id:1, 
            name: "product", 
            imageUrl: "url", 
            price: 10000000, 
            stock: 10,
            CategoryId: 1, 
            UserId: 1
        }

DELETE /root/products/:id

    params request: 
        > id

    responses: 
        > number

GET /admin

    responses: 
        [
            {
                id:1, 
                name: "product", 
                imageUrl: "url", 
                price: 10000000, 
                stock: 10,
                CategoryId: 1, 
                UserId: 1
            }, 
            ...
        ]

GET /admin/:id
  
    params request: 
        > id
        
    responses:
        {
            id:1, 
            name: "product", 
            imageUrl: "url", 
            price: 10000000, 
            stock: 10,
            CategoryId: 1, 
            UserId: 1
        }
        
 POST /admin
 
    body request: 
        > name
        > imageUrl
        > price
        > stock
        > CategoryId
        > UserId

    responses:
        {
            id:1, 
            name: "product", 
            imageUrl: "url", 
            price: 10000000, 
            stock: 10,
            CategoryId: 1, 
            UserId: 1
        }

PUT /admin/:id

    params request:
        > id

    body request: 
        > name
        > imageUrl
        > price
        > stock
        > CategoryId
        > UserId

    responses : 
        {
            id:1, 
            name: "product", 
            imageUrl: "url", 
            price: 10000000, 
            stock: 10,
            CategoryId: 1, 
            UserId: 1
        }

DELETE /admin/:id

    params request: 
        > id

    responses: 
        > number


</pre>
