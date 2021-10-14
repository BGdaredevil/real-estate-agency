const router = require("express").Router();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const util = require("util");

const secret = require("../index.js").secret;
const tokenExpDate = require("../index.js").tokenExpDate;
const cookie_name = require("../index.js").cookie_name;
const userService = require("../services/userService.js");

const register = async (req, res) => {
  const escapedUser = {
    fullName: validator.escape(req.body.fullName.trim()),
    username: validator.escape(req.body.username.trim()),
    password: validator.escape(req.body.password.trim()),
    rePass: validator.escape(req.body.rePass.trim()),
    passMatch: validator.equals(
      validator.escape(req.body.password.trim()),
      validator.escape(req.body.rePass.trim())
    ),
  };

  if (Object.values(escapedUser).includes("")) {
    console.log("empty detected");
    escapedUser.error = { message: "All fields are mandatory" };
    res.render("user/register", escapedUser);
    return;
  }

  if (!escapedUser.passMatch) {
    escapedUser.error = { message: "Passwords do not match" };
    res.render("user/register", escapedUser);
    return;
  }

  try {
    await userService.register(escapedUser);
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
    escapedUser.error = error;
    res.render("user/register", escapedUser);
  }
};

const login = async (req, res) => {
  const data = {
    username: validator.escape(req.body.username.trim()),
    password: validator.escape(req.body.password.trim()),
  };

  try {
    const user = await userService.login(data);
    if (!user) {
      data.error = { message: "Invalid username or password" };
      return res.render("user/login", data);
    }
    console.log(user);
    const token = await util.promisify(jwt.sign)(
      { username: user.username, id: user._id },
      secret,
      {
        expiresIn: tokenExpDate,
      }
    );

    res.cookie(cookie_name, token);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const logout = (req, res) => {
  res.clearCookie(cookie_name);
  res.redirect("/");
};

router.get("/register", (req, res) => res.render("user/register"));
router.post("/register", register);
router.get("/login", (req, res) => res.render("user/login"));
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
