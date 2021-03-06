const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const port = process.env.PORT || 8000;
const db = require("./config/sql");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy.js");
// db.sync();
db.sync({ alter: true });
// db.sync({force:true})
app.use(morgan("dev"));
app.use(express.json());

app.use(passport.initialize());
app.use("/api", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
