# e-commerce Silent Atlantis API

#### Getting Started

Welcome to e-commerce Silent Atlantis API documentation, You can use the API to access e-commerce API endpoints.

First of all tou need some depedencies

```
//install some core application
$sudo apt-get install nodejs
$sudo apt-get install npm

//install depedencies
$npm install

//running the server
$npm run dev
```

All API can be accessed from the `http:localhost:3000`

To use API endpoints, the format is as follows:

### User Endpoint

#### POST `users/register`
----
register new user
```
url: 'http://localhost:3000/users/register',
method: 'POST',
body: {
	'fullName': 'your full name',
	'email': 'your email',
	'password': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzJkOWNkZTg4NzU5MjI3Yj'
	'role': 'admin/user'
}

response: {
	'fullName' : "your name",
	'email': "your email",
	'password': "your password",
	'role': "admin/user"
}
```

#### POST `users/login`
----
login user
```
url: 'http://localhost:3000/users/login',
method: 'POST',
body: {
	'email': 'your email',
	'password': 'your password',
}
response: {
	'token': 'token',
	'role': 'admin/user'
}
```

#### Error Handling User
----
- validation register
```
Status Code: 400,
response: {
	"message": "Fullname is require",
}
```
```
Status Code : 400,
response: {
	"message": "min 3 chraracter"
}
```
```
status Code: 400,
response: {
	"Message": "email is require"
}
```
```
Status Code: 400,
response: {
	"message" : "email is already take"
}
```
```
Status Code: 400,
response: {
	"message": "password is require"
}
```
```
Status Code: 400,
response: {
	"message": "role is require"
}
```
```
Status Code: 500,
response: {
	"message": "internal server error"
}
```
### Size Endpoint
#### GET `sizes/`
----
show all size
```
url: 'http://localhost:3000/sizes',
method: 'GET',
headers: 'bearer "token"',
response: [
	{
		'id': 'id size',
        'name': 'name size'
	}
]
```
#### Error Handling Size
----
```
Status Code: 500,
response: {
	"message": "interna; server error"
}
```

### Category Endpoint
#### GET `categories/`
----
show all category
```
url: 'http:localhost:3000/categories',
method: 'GET',
headers: 'bearer "token"',
response: [
	{
		'id': 'id Category',
		'name': 'name category'
	}
]
```
#### Error Handling Category
----
```
Status Code: 500,
response: {
	"message": "interna; server error"
}
```
### Product Endpoint

#### GET `products/`
----
return all product
```
url: 'http:localhost:3000/products',
method: 'GET',
headers: 'bearer "token"',
response: [
	 {
        "id": 1,
        "name": "baju baru",
        "image_url": "https://habra.com.my/wp-content/uploads/2019/01/Habra-Haute-Kara-Kebaya-Batik-Kebaya-Moden-Kebaya-Modern-Baju-Kurung-Batik-Baju-Kebaya-Malaysia-Batik-Indonesia-Batik-Malaysia-Raya-Koleksi-Raya-2019-KR52-1.jpg",
        "price": 200000,
        "stock": 20,
        "CategoryId": 1,
        "SizeId": 1,
        "createdAt": "2020-03-10T14:09:26.823Z",
        "updatedAt": "2020-03-10T14:09:26.823Z",
        "Size": {
            "name": "S"
        },
        "Category": {
            "name": "t-shirt"
        }
    }
]
```
#### GET `products/:id`
----
return product data based on id product

```
url: 'http://localhost:3000/products/:id'
method: 'GET',
headers: 'bearer "token"',
response: {
		"id": 1,
        "name": "baju baru",
        "image_url": "https://habra.com.my/wp-content/uploads/2019/01/Habra-Haute-Kara-Kebaya-Batik-Kebaya-Moden-Kebaya-Modern-Baju-Kurung-Batik-Baju-Kebaya-Malaysia-Batik-Indonesia-Batik-Malaysia-Raya-Koleksi-Raya-2019-KR52-1.jpg",
        "price": 200000,
        "stock": 20,
        "CategoryId": 1,
        "SizeId": 1,
        "createdAt": "2020-03-10T14:09:26.823Z",
        "updatedAt": "2020-03-10T14:09:26.823Z",
        "Size": {
            "name": "S"
        },
        "Category": {
            "name": "t-shirt"
        }
}
```
#### POST `products/`
----
create new product

```
url: 'http://localhost:3000/products/',
method: 'POST',
headers: 'bearer "token"',
body: {
	'name': 'name product',
	'image_url': 'url image',
	'price': 'price product',
    'stock': 'stock product',
    'CategoryId': 'id from data of Category',
    'SizeId': 'id id from data of Size'
}
response: {
	"id": 1,
    "name": "baju baru",
    "image_url": "https://habra.com.my/wp-content/uploads/2019/01/Habra-Haute-Kara-Kebaya-Batik-Kebaya-Moden-Kebaya-Modern-Baju-Kurung-Batik-Baju-Kebaya-Malaysia-Batik-Indonesia-Batik-Malaysia-Raya-Koleksi-Raya-2019-KR52-1.jpg",
    "price": 200000,
    "stock": 20,
    "CategoryId": 1,
    "SizeId": 1,
    "createdAt": "2020-03-10T14:09:26.823Z",
    "updatedAt": "2020-03-10T14:09:26.823Z",
}
```
#### PUT `products/:id`
----
update product based on id product and return data product

```
url: 'http://localhost:3000/products/:id'
method:'POST',
headers: 'bearer "token"',
body: {
	'name': 'name product',
	'image_url': 'url image',
	'price': 'price product',
	'stock' : 'stock product',
	'CategoryId': 'id from data of Category',
    'SizeId': 'id id from data of Size'
}
response: '{
        "id": 1,
        "name": "baju baru",
        "image_url": "https://habra.com.my/wp-content/uploads/2019/01/Habra-Haute-Kara-Kebaya-Batik-Kebaya-Moden-Kebaya-Modern-Baju-Kurung-Batik-Baju-Kebaya-Malaysia-Batik-Indonesia-Batik-Malaysia-Raya-Koleksi-Raya-2019-KR52-1.jpg",
        "price": 200000,
        "stock": 20,
        "CategoryId": 1,
        "SizeId": 1,
        "createdAt": "2020-03-10T14:09:26.823Z",
        "updatedAt": "2020-03-10T14:09:26.823Z",
        "Size": {
            "name": "S"
        },
        "Category": {
            "name": "t-shirt"
        }
}'
```
#### DELETE `products\:id`
----
delete specific product base on id product and return data product

```
url: 'http://localhost:3000/products/:id'
method: 'DELETE',
headers: 'beare "token"',
response: {
		"id": 1,
        "name": "baju baru",
        "image_url": "https://habra.com.my/wp-content/uploads/2019/01/Habra-Haute-Kara-Kebaya-Batik-Kebaya-Moden-Kebaya-Modern-Baju-Kurung-Batik-Baju-Kebaya-Malaysia-Batik-Indonesia-Batik-Malaysia-Raya-Koleksi-Raya-2019-KR52-1.jpg",
        "price": 200000,
        "stock": 20,
        "CategoryId": 1,
        "SizeId": 1,
        "createdAt": "2020-03-10T14:09:26.823Z",
        "updatedAt": "2020-03-10T14:09:26.823Z",
        "Size": {
            "name": "S"
        },
        "Category": {
            "name": "t-shirt"
        }
}
```
#### Error Handling Product
----
```
Status Code: 500,
response: {
	"message": "interna; server error"
}
```


