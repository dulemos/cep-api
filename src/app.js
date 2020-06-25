require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./app/middleware");
const routes = require("./app/routes");
const app = express();


app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})
app.use(bodyParser.json());
app.use(routes);

module.exports = app;
