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

### Size Endpoint
#### GET `sizes/`
----
show all size
```
url: 'http://localhost:3000/sizes',
method: 'GET',
response: [
	{
		'id': 'id size',
        'name': 'name size'
	}
]
```

### Category Endpoint
#### GET `categories/`
----
show all category
```
url: 'http:localhost:3000/categories',
method: 'GET',
response: [
	{
		'id': 'id Category',
		'name': 'name category'
	}
]
```

### Product Endpoint

##### GET `products/`
----
return all product
```
url: 'http:localhost:3000/products',
method: 'GET',
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
##### GET `products/:id`
----
return product data based on id product

```
url: 'http://localhost:3000/products/:id'
method: 'GET',
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
body: {
	'name': 'name product',
	'image_url': 'url image',
	'price': 'price product',
    'stock': 'stock product',
    'CategoryId': '[
    	 {
        "id": 1,
        "name": "t-shirt"
        },
        {
            "id": 2,
            "name": "jacket"
        },
        {
            "id": 3,
            "name": "pants"
        }
    ]'
    'SizeId': '[
    	 {
        "id": 1,
        "name": "S"
        },
        {
            "id": 2,
            "name": "M"
        },
        {
            "id": 3,
            "name": "L"
        },
        {
            "id": 4,
            "name": "XL"
        }
    ]',
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
