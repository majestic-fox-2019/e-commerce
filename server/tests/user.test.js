const request = require('supertest')
const app = require('../app')
const {User,sequelize} = require('../models')

beforeAll(() => {
  User.truncate({
    restartIdentity:true
  })
  .then(result => {
    console.log('Table has been reset')
  })
  .catch(err => {
    console.log(err)
  })
})
afterAll(() => {
  sequelize.close()
})
describe('User Route', () => {
  describe('Post /register', () => {
    describe('Success 201',() => {
      it('require all attributes', async () => {
        let user = {
          name:"jetly",
          email:"jetly27sandita@gmail.com",
          password:"123456"
        }
        const result = await request(app)
                              .post('/user/register')
                              .send(user)
        expect(result.status).toBe(201)  
        expect(result.body).toEqual({name:expect.any(String),email:expect.any(String),role:expect.any(String)})
      })
    })
    
  let arrobj = [
    [
      'email is unique',
      {
        name:"jetly",
        email:"jetly27sandita@gmail.com",
        password:"123456"
      },
      'Email already use'
    ],
    [
      'email and password is empty',
      {
        name:"jetly",
        email:"",
        password:""
      },
      {
        email:'Please enter a email',
        password:'Please enter a password'
      }
    ],
    [
      'name and password is empty',
      {
        name:"",
        email:"jetly@test.com",
        password:""
      },
      {
        name:'Please enter a name',
        password:'Please enter a password'
      }
    ],
    [
      'Incorrect email format',
      {
        name:"test",
        email:"test",
        password:"123456"
      },
      {
        email:'Please enter a email'
      }
    ],
    [
      'Min password length 6',
      {
        name:"test",
        email:"test@test.com",
        password:"12345"
      },
      {
        password:'Minimum password length is 6'
      }
    ],
    [
      'email and name is empty',
      {
        name:"",
        email:"",
        password:"123456"
      },
      {
        name:'Please enter a name',
        email:'Please enter a email',
      }
    ],
    [
      'all attributes is empty',
      {
        name:"",
        email:"",
        password:""
      },
      {
        name:'Please enter a name',
        email:'Please enter a email',
        password:'Please enter a password'
      }
    ]
  ]
    describe
        .each(arrobj)('Error 400', (desc,input,expected) => {
          it(desc, async () => {
              const result = await request(app)
                                    .post('/user/register')
                                    .send(input)
              expect(result.status).toBe(400)
              expect(result.body)
                .toEqual(expected)
          })     
    })
  })

  describe('Post /login', () => {
    describe('Success 200',() => {
      it('require email and password', async () => {
        let user = {
          email:"jetly27sandita@gmail.com",
          password:"123456"
        }
        const result = await request(app)
                              .post('/user/login')
                              .send(user)
        expect(result.status).toBe(200) 
        expect(result.body).toEqual({token:expect.any(String),name:expect.any(String)})
      })
    })
    
  let arrobj = [
    [
      'no email attributes',
      {
      },
      'Email not found'
    ],
    [
      'no password attributes',
      {
        email:'jetly27sandita@gmail.com'
      },
      'data and hash arguments required'
    ],
    [
      'email is empty or false',
      {
        email:"",
        password:"123456"
      },
      'Email not found'
    ],
    [
      'password is empty or false',
      {
        email:"jetly27sandita@gmail.com",
        password:""
      },
      'Password is empty or false'
    ],
  ]
    describe
        .each(arrobj)('Error 400', (desc,input,expected) => {
          it(desc, async () => {
              const result = await request(app)
                                    .post('/user/login')
                                    .send(input)
              expect(result.status).toBe(400)
              expect(result.body)
                .toEqual(expected)
          })     
    })
  })
})