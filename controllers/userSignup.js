const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { z } = require("zod");
const { User } = require("../db/index");

dotenv.config();
const jwtKey = process.env.JWT_USER_KEY;

const ZodUser = z.object({
  username: z.string("Invalid username!").min(1).max(12),
  email: z.string().email("Invalid email address!"),
  password: z.string().min(3).max(14),
});

async function signupController(req, res) {
  const { email, username, password } = req.body;

  const newUser = new User({
    email: email,
    username: username,
    password: password,
  });

  if (!ZodUser.safeParse(newUser).success) {
    // => { success: true; data: "user" }
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials!",
    });
  }

  try {
    await newUser.save();
  } catch (err) {
    return res.status(400).json({
      message: "User with same username or email already exists",
    });
  }

  const token = jwt.sign({ id: newUser._id }, jwtKey);

  res.status(200).json({
    message: "New user successfully created!",
    username: username,
    token: token,
  });
}

module.exports = { signupController };
