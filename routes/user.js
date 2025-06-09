const { Router } = require("express");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/userAuth")

const userRouter = Router();
const jwtKey = process.env.JWT_KEY;

userRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    email: email,
    username: username,
    password: password,
  });

  await newUser.save();
  const token = jwt.sign({ username: newUser.username }, jwtKey);
  res.status(200).json({
    token: token
  });
});

userRouter.post("/login", userAuth, (req, res) => {
    res.send("Verified")
});

userRouter.get("/courses", (req, res) => {});

userRouter.get("/courses/:courseId", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = userRouter;
