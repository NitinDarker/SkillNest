const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Router } = require("express");
const { z } = require("zod");
const { User, Course } = require("../db/index");

dotenv.config();
const userRouter = Router();
const jwtKey = process.env.JWT_KEY;

const ZodUser = z.object({
  username: z.string("Invalid username!").min(1).max(12),
  email: z.string().email("Invalid email address!"),
  password: z.string().min(3).max(14),
});

async function signupController(req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    email: email,
    username: username,
    password: password,
  });

  if (!ZodUser.safeParse(newUser).success) {
    // => { success: true; data: "tuna" }
    return res.status(400).send("Invalid Credentials!");
  }

  try {
    await newUser.save();
  } catch (err) {
    return res.status(401).json({
      message: "User with same username or email already exists",
    });
  }

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    jwtKey
  );
  res.status(200).json({
    token: token,
  });
}

module.exports = { signupController };
