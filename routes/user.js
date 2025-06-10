const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { userAuth } = require("../middlewares/userAuth");
const { Router } = require("express");
const { User, Course } = require("../db/index");
const { email } = require("zod/v4");

require("dotenv").config();
const userRouter = Router();
const jwtKey = process.env.JWT_KEY;

const ZodUser = z.object({
  username: z.string().min(1).max(12),
  email: z.string(email),
  password: z.string().min(4).max(14),
});

userRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    email: email,
    username: username,
    password: password,
    purchases: null
  });

  if (!ZodUser.safeParse(newUser).success) {
    // => { success: true; data: "tuna" }
    return res.status(400).send("Invalid Credentials!");
  }

  await newUser.save();

  const token = jwt.sign({ username: newUser.username }, jwtKey);
  res.status(200).json({
    token: token,
  });
});

userRouter.post("/login", userAuth, (req, res) => {
  res.send("Verified");
});

userRouter.get("/courses", (req, res) => {});

userRouter.get("/courses/:courseId", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = userRouter;
