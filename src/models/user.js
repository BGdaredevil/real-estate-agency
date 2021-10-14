const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltRounds = require("../index.js").saltRounds;

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, validate: /^[A-Z]{1}[a-z]+ {1}[A-Z]{1}[a-z]+$/ },
  username: { type: String, required: true, minlength: 5, unique: true },
  password: { type: String, required: true, minlength: 4 },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

UserSchema.method("verifyPass", function (pass) {
  return bcrypt.compare(pass, this.password);
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
