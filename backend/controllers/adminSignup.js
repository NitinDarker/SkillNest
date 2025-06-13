const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { Admin } = require("../db/index");

dotenv.config();
const jwtKey = process.env.JWT_ADMIN_KEY;

const ZodAdmin = z.object({
  username: z
    .string()
    .min(1, "Username is required.")
    .max(12, "Username cannot exceed 12 characters."),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long.")
    .max(20, "Password cannot exceed 20 characters."),
});

async function signupController(req, res) {
  const validationResult = ZodAdmin.safeParse(req.body);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors.map(
      (err) => err.message
    );
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errorMessages,
    });
  }

  const { email, username, password } = validationResult.data;
  
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newAdmin = new Admin({
    email: email,
    username: username,
    password: hashedPassword,
  });

  try {
    await newAdmin.save();
  } catch (err) {
    return res.status(400).json({
      message: "Admin with same username or email already exists",
    });
  }

  const token = jwt.sign({ id: newAdmin._id }, jwtKey);

  res.status(200).json({
    success: true,
    message: "New admin successfully created!",
    username: username,
    token: token,
  });
}

module.exports = { signupController };
