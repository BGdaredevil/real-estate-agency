const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");

const router = require("../config/routes.js");
const { auth } = require("../middlewares/userMiddleware.js");
// const { checkToken } = require("../services/authService.js");

module.exports = (app) => {
  // console.log(path.resolve(__dirname, "../static"));
  // console.log(path.resolve(__dirname, "../"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.set("views", path.resolve(__dirname, "../views"));
  app.engine("hbs", handlebars({ extname: "hbs" }));
  app.set("view engine", "hbs");

  app.use(auth);
  app.use(express.static(path.resolve(__dirname, "../static")));
  app.use(router);
};
