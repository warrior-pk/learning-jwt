const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decodedData) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        // console.log(decodedData);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  //TODO: Complete this function:

  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decodedData) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        // console.log(decodedData);
        next();
      }
    });
  } else {
  }
};
module.exports = { requireAuth, checkUser };
