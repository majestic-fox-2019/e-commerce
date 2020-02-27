# e-commerce


### Client side Enpoint

```
https://pocket-6b501.firebaseapp.com/
```

###  Server side Endpoint

```
https://mysterious-plains-04294.herokuapp.com
```

**Getting Started**

Install Package :

```
on terminal:
cd/server & cd/client
npm install
```

**Routes Task** **:**

| Method | Route     | Description                         |
| ------ | --------- | ----------------------------------- |
| Get    | /products | Show All Products                   |
| Post   | /products | Create a Product                    |
| Put    | /products:id | Update products on id |
| Delete | /products:id  | Delete Productse on Id              |

**Routes User :**

| Method | Route          | Description     |
| ------ | -------------- | --------------- |
| Post   | /user/register/admin | Create new User |
| Post   | /user/login/admin    | Login for user  |

**Routes Cart :**

| Method | Route          | Description                                                |
| ------ | -------------- | ---------------------------------------------------------- |
| Get    | /cart          | Get All Cart data                                          |
| Post   | /cart          | Create new Cart                                            |
| Patch  | /cart/checkout | Remove From table chart with update stock in Product table |
| Patch  | /cart:id       | Edit value Qty                                             |
| Patch  | /cart:id       | remove item cart                                           |



### Environtment Variables:

```
EDOTENSI=<Secret key>

```

**Additional Information :**




**Detail link API documentation postman :**

```
https://documenter.getpostman.com/view/3757275/SzKVQJBv
```



