const UserModel = require("../models/user.js");

const register = (user) => {
  return UserModel.create({
    fullName: user.fullName,
    username: user.username,
    password: user.password,
  });
};

const login = async (user) => {
  try {
    const item = await UserModel.findOne({ username: user.username });
    if (!item) {
      return null;
    }
    const validPass = await item.verifyPass(user.password);
    console.log("pass is ", validPass);
    if (validPass) {
      return item;
    } else {
      return null;
    }
  } catch (err) {
    // console.log(err);
    throw err;
  }
};

const userService = { register, login };

module.exports = userService;
