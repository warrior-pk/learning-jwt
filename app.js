const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middlewares/authMiddleware");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");
app.use(cookieParser());

// database connection
const dbURI = "mongodb://127.0.0.1:27017/node-exp-jwt";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
    // console.log(`Server Running at PORT ${3000}`);
    // console.log("Mongodb Connected Successfully");
  })
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRouter);
