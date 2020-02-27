const request = require('supertest');
const app = require('../app');

const { User, sequelize } = require('../models')

beforeAll(() => {
	User
		.truncate({ restartIdentity: true })
		.then(res => {
			console.log('Table has been reset')
		})
		.catch(err => {
			console.log(err)
		})
});

afterAll(() => {
	sequelize.close()
})

let registerInput = [
	[
		'Email and Password are empty',
		{
			name: "John",
			email: "",
			password: ""
		},
		{
			'email': "Please enter valid email address",
			'password': "Please enter password",
		}
	],
	[
		'Name and Password are empty',
		{
			name: "",
			email: "john1@domain.com",
			password: ""
		},
		{
			'name': "Please enter name",
			'password': "Please enter password"
		}
	],
	[
		'Name and Email are empty',
		{
			name: "",
			email: "",
			password: "123456"
		},
		{
			'name': "Please enter name",
			'email': "Please enter valid email address"
		}
	],
	[
		'Incorrect Email format',
		{
			name: "John",
			email: "john",
			password: "123456"
		},
		{
			'email': "Please enter valid email address"
		}
	],
	[
		'Incorrect password length',
		{
			name: "John",
			email: "john1@domain.com",
			password: "123"
		},
		{
			'password': "Password length must be between 6 - 32 characters",
		}
	],
	[
		'All Fields are empty',
		{
			name: "",
			email: "",
			password: ""
		},
		{
			'name': "Please enter name",
			'email': "Please enter valid email address",
			'password': "Please enter password"
		}
	],
	[
		'Duplicate Email found',
		{
			name: "John",
			email: "john@domain.com",
			password: "123456"
		},
		"Email already Exist"
	]
]


describe("POST /register", () => {
	describe('Success 201, User Created', () => {
		it(" should success and create new object of user", async () => {
			let user = {
				name: "John",
				email: "john@domain.com",
				password: "password"
			}

			const res = await request(app)
				.post('/users/register')
				.send(user)
			expect(res.status).toBe(201)
			expect(res.body).toEqual({
				'name': expect.any(String),
				'email': expect.any(String),
				'role': expect.any(String)
			})
		})
	});

	describe
		.each(registerInput)('Error 400, Bad Request', (desc, input, expected) => {
			it(desc, async () => {
				const res = await request(app)
					.post('/users/register')
					.send(input)
				expect(res.status).toBe(400)
				expect(res.body.errors).toEqual(expected)
			});
		})
})


let loginInput = [
	[
		'Incorrect Email or Password',
		{
			email: "john@domain.com",
			password: ""
		},
		"Incorrect Email or Password"
	],
	[
		'Incorrect Email or Password',
		{
			email: "",
			password: ""
		},
		"Incorrect Email or Password"
	],
]


describe("POST /login", () => {
	describe
		.each(loginInput)('Error 400, Bad Request', (desc, input, expected) => {
			it(desc, async () => {
				const res = await request(app)
					.post('/users/login')
					.send(input)
				expect(res.status).toBe(400)
				expect(res.body.errors).toEqual(expected)
			});
		})


	describe('Success 200, User logged on', () => {
		it(" should sign in user and assign token to the user", async () => {
			let user = {
				email: "john@domain.com",
				password: "password"
			}
			const res = await request(app)
				.post('/users/login')
				.send(user)
			expect(res.status).toBe(200)
			expect(typeof res.body).toEqual('object')
			expect(res.body).toEqual({ 'token': expect.any(String), 'name': expect.any(String) })
		})
	})
});

describe("GET /list", () => {
	describe('Success 200, List member retrieved', () => {
		it(" should retrieve a list of member registered", async () => {
			const res = await request(app)
				.get('/users/list')
			expect(res.status).toBe(200)
			expect(typeof res.body).toEqual('object')
			expect(Array.isArray(res.body)).toBe(true)
		})
	})
});