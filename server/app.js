var express = require("express");
const request = require("supertest");
const Routes = require("./routes/index");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", Routes);
module.exports = app;
