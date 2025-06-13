const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { z } = require("zod");
const { Admin } = require("../db/index");

dotenv.config();
const jwtKey = process.env.JWT_ADMIN_KEY;

const ZodAdmin = z.object({
  username: z.string("Invalid username!").min(1).max(12),
  email: z.string().email("Invalid email address!"),
  password: z.string().min(3).max(14),
});

async function signupController(req, res) {
  const { email, username, password } = req.body;

  const newAdmin = new Admin({
    email: email,
    username: username,
    password: password,
  });

  if (!ZodAdmin.safeParse(newAdmin).success) {
    // => { success: true; data: "admin" }
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials!",
    });
  }

  try {
    await newAdmin.save();
  } catch (err) {
    return res.status(400).json({
      message: "Admin with same username or email already exists",
    });
  }

  const token = jwt.sign({ id: newAdmin._id }, jwtKey);

  res.status(200).json({
    message: "New admin successfully created!",
    username: username,
    token: token,
  });
}

module.exports = { signupController };
