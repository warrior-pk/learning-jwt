const User = require("../models/User");
const jwt = require("jsonwebtoken");
// Handle Error
const handleError = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.message.includes("Incorrect Email")) {
    errors.email = "Incorrect Email";
  }
  if (err.message.includes("Incorrect Password")) {
    errors.password = "Incorrect Password";
  }

  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const MAX_AGE = 3 * 60 * 60 * 24;
function createToken(id) {
  return jwt.sign({ id }, "Warrior_Secret_Key", {
    expiresIn: MAX_AGE,
  });
}

async function signup_get(req, res) {
  res.render("signup");
}

async function login_get(req, res) {
  res.render("login");
}

async function signup_post(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
}

async function login_post(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
}

function logout_get(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

module.exports = { signup_get, login_get, signup_post, login_post, logout_get };
