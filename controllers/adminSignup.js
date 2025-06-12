const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { z } = require("zod");
const { Admin } = require("../db/index");

dotenv.config();
const jwtKey = process.env.JWT_KEY;

const ZodAdmin = z.object({
  username: z.string("Invalid username!").min(1).max(12),
  email: z.string().email("Invalid email address!"),
  password: z.string().min(3).max(14),
});

async function signupController(req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const newAdmin = new Admin({
    email: email,
    username: username,
    password: password,
  });

  if (!ZodAdmin.safeParse(newAdmin).success) {
    // => { success: true; data: "tuna" }
    return res.status(400).send("Invalid Credentials!");
  }

  try {
    await newAdmin.save();
  } catch (err) {
    return res.status(400).json({
      message: "Admin with same username or email already exists",
    });
  }

  const token = jwt.sign(
    { id: newAdmin._id, username: newAdmin.username },
    jwtKey
  );
  res.status(200).json({
    token: token,
  });
}

module.exports = { signupController };
