## e-commerce

### installation

[e-commerce repository](https://github.com/erneryn/e-commerce.git) - Clone Repository here

```sh
$ cd ../server & cd ../client
```

run script from packages by using the comment bellow on server and client
```sh
$ npm start-dev
```


### list of user Routes :
| Route | HTTP | Description |
| ------ | ------ | ----------- |
| /login | POST  | Aogin and get access token |
| /register | POST | Aign up new user |


### list of Product Routes :
| Route | HTTP | Description |
| ------ | ------ | ----------- |
| /product | GET  | Get all product ( (authentication, login required) |
| /product | POST | Add new product (authentication, login required) |
| /product/:id | GET | Get a single product by id (authentication, login required) |
| /product/:id | PUT | Update values of product (authentication, login required) |
| /product/:id | DELETE | Delete a single product (authentication, login required) |

### list of errors  :
| Code | Name | Description |
| ------ | ------ | ----------- |
| 400 | Bad Requesr  | Incorrect user access of form validation |
| 403 | Forbiden | Unauthorized acess |
| 404 | Not Found | Request Resource not Found |
| 500 | Internal Server Error | Server currently unable to handle this request |