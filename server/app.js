const express = require("express");
const request = require("supertest");
const Routes = require("./routes/index");
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use("/", Routes);
module.exports = app;
app.listen(port, () => console.log("running"));