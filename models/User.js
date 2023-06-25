const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a password"],
    minlength: [6, "Minimum Password Length is 6"],
  },
});

userSchema.pre("save", async function (next) {
  // console.log("User about to be created", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};
const User = mongoose.model("user", userSchema);

module.exports = User;
