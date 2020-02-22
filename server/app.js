const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const index = require("./routes/index");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", index);

//if want to test comment below codes
// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

module.exports = app;
