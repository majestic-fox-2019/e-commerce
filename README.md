# e-commerce
created by Fadhilah Rayafi Varselia

Link Deploy: https://skin-type-dila.firebaseapp.com/

# Routes :
## Login
* Method: POST
* Route: http://localhost:3000/
* Request body: 
    {
      "email": type data string,
      "password": type data sting
    }
* Result:
    code 404: 
    ```
    {
      err: {
        "code": 404, 
        "message": "email or name invalid"
      }
    }
    ```

    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 201:
    ```
    {
      "id": type data integer,
      "name": type data string,
      "email": type data string,
      "address": type data string,
      "phone_number": type data string,
      "role": type data string
    }
    ```

## Register custummer
* Method: POST
* Route: http://localhost:3000/user-register
* Request body: 
    {
      "name": type data string,
      "email": type data string,
      "address": type data string,
      "phone_number": type data string
    }
* Result:
    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 400:
    ```
    {
      err: {
        "code": 500, 
        "message": [
          "name must be filled",
          "email must be filled",
          "address must be filled",
          "phone number must be filled"
          ]
      }
    }
    ```

    code 201:
    ```
    {
      "id": type data integer,
      "name": type data string,
      "email": type data string,
      "address": type data string,
      "phone_number": type data string,
      "role": type data string
    }
    ```

## Register admin
* Method: POST
* Route: http://localhost:3000/register
* Request body: 
    {
      "name": type data string,
      "email": type data string,
      "address": type data string,
      "phone_number": type data string
    }
* Result:
    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 400:
    ```
    {
      err: {
        "code": 500, 
        "message": [
          "name must be filled",
          "email must be filled",
          "address must be filled",
          "phone number must be filled"
          ]
      }
    }
    ```

    code 201:
    ```
    {
      "id": type data integer,
      "name": type data string,
      "email": type data string,
      "address": type data string,
      "phone_number": type data string,
      "role": type data string
    }
    ```

## Show all products
* Methos: GET
* Route: http://localhost:3000/home
* Request Headers:
    ```
    {
      "token": type data string
    }
    ```

* Result:
    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 201:
    ```
    [
      {
        "id": type data integer,
        "name": type data string,
        "price": type data integer,
        "stock": type data integer,
        "category": type data string,
        "image_url": type data string,
        "description: type data string"
      }
    ]
    ```

## Show one product
* Methos: GET
* Route: http://localhost:3000/products/:id
* Request Headers:
    ```
    {
      "token": type data string
    }
    ```
    
* Result:
    code 404: 
    ```
    {
      err: {
        "code": 404, 
        "message": "cannot find product"
      }
    }
    ```

    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 201:
    ```
    [
      {
        "id": type data integer,
        "name": type data string,
        "price": type data integer,
        "stock": type data integer,
        "category": type data string,
        "image_url": type data string,
        "description: type data string"
      }
    ]
    ```

## Show products by category
* Methos: GET
* Route: http://localhost:3000/home/:category
* Request Headers:
    ```
    {
      "token": type data string
    }
    ```
    
* Result:
    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 201:
    ```
    [
      {
        "id": type data integer,
        "name": type data string,
        "price": type data integer,
        "stock": type data integer,
        "category": type data string,
        "image_url": type data string,
        "description: type data string"
      }
    ]
    ```

## Add Product
* Methos: POST
* Route: http://localhost:3000/products
* Request Headers:
    ```
    {
      "token": type data string
    }
    ```

* Request body:
    ```
    {
      "name": type data string,
      "price": type data integer,
      "stock": type data integer,
      "category": type data string,
      "image_url": type data string,
      "description: type data string"
    }
    ```

* Result:
    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 400:
    ```
    {
      err: {
        "code": 500, 
        "message": [
          "please filled product name",
          "please filled price product",
          "please filled stock product"
          ]
      }
    }
    ```
    
    code 201:
    ```
    [
      {
        "id": type data integer,
        "name": type data string,
        "price": type data integer,
        "stock": type data integer,
        "category": type data string,
        "image_url": type data string,
        "description: type data string"
      }
    ]
    ```

## Edit product
* Method: PUT
* Route: http://localhost:3000/products/:id
* Request Headers:
    ```
    {
      "token": type data string
    }
    ```

* Request body:
    ```
    {
      "name": type data string,
      "price": type data integer,
      "stock": type data integer,
      "category": type data string,
      "image_url": type data string,
      "description: type data string"
    }
    ```

* Result:
    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 400:
    ```
    {
      err: {
        "code": 500, 
        "message": [
          "please filled product name",
          "please filled price product",
          "please filled stock product"
          ]
      }
    }
    ```

   code 404:
    ```
    {
      err: {
        "code": 500, 
        "message": "product not found"
      }
    }
    ```

    code 201:
    ```
    {
      "id": type data integer,
      "name": type data string,
      "price": type data integer,
      "stock": type data integer,
      "category": type data string,
      "image_url": type data string,
      "description: type data string"
    }
    ```

## Delete product
* Method: DELETE
* Route: http://localhost:3000/products/:id
* Request Headers:
    ```
    {
      "token": type data string
    }
    ```

* Result:
    code 500: 
    ```
    {
      err: {
        "code": 500, 
        "message": "internal server error"
      }
    }
    ```

    code 404:
    ```
    {
      err: {
        "code": 500, 
        "message": "product not found"
      }
    }
    ```

    code 201:
    ```
    {
      "id": type data integer,
      "name": type data string,
      "price": type data integer,
      "stock": type data integer,
      "category": type data string,
      "image_url": type data string,
      "description: type data string"
    }
    ```
