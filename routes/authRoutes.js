const { Router } = require("express");
const router = Router();
const {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
} = require("../controllers/authControl");

router
  .get("/signup", signup_get)
  .post("/signup", signup_post)
  .get("/login", login_get)
  .post("/login", login_post)
  .get("/logout", logout_get);

module.exports = router;
