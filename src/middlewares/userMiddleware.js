const cookie_name = require("../index.js").cookie_name;
const secret = require("../index.js").secret;
const jwt = require("jsonwebtoken");
const util = require("util");

exports.auth = async (req, res, next) => {
  const token = req.cookies[cookie_name];
  if (!token) {
    return next();
  }

  const user = await util.promisify(jwt.verify)(token, secret);
  req.user = user;
  res.locals.user = user;

  next();
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/user/login");
  }
  next();
};
