const express = require("express"),
  app = express(),
  loginRouter = require("./Login/login-router"),
  detailRouter = require("./Login/detail-router");
  signUpRouter = require("./SignUp/signUp-router");
  bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/detail",detailRouter);
app.use("/login", loginRouter);
app.use("/signUp",signUpRouter);

app.listen(3000, () => console.log(`I listen to 3000`));