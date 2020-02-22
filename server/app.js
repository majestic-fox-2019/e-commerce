const express = require("express");
const request = require("supertest");
const Routes = require("./routes/index");
const cors = require('cors')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use("/", Routes);
module.exports = app;
app.listen(3000, () => console.log("running"));