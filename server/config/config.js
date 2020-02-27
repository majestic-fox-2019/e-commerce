require("dotenv").config();

module.exports = {
	development: {
		username: process.env.USER_NAME_CONFIG,
		password: process.env.PASS_NAME_CONFIG,
		database: process.env.DATA_BASE_CONFIG,
		host: "127.0.0.1",
		dialect: "postgres"
	},
	test: {
		username: "postgres",
		password: "postgres",
		database: "e_commerce_test",
		host: "127.0.0.1",
		dialect: "postgres"
	},
	production: {
		username: "root",
		password: null,
		database: "database_production",
		host: "127.0.0.1",
		dialect: "postgres"
	}
};
