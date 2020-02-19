const express = require("express");
const app = express();
const router = require("./routes/indexRouter");
var cors = require('cors')
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.use("/", router);


app.listen(PORT, () => {
  console.log("listening to the port " + PORT);
});

module.exports = app;
