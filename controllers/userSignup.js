const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { z } = require("zod");
const { User } = require("../db/index");

dotenv.config();
const jwtKey = process.env.JWT_USER_KEY;

const ZodUser = z.object({
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
  const validationResult = ZodUser.safeParse(req.body);

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

  const newUser = new User({
    email: email,
    username: username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    return res.status(400).json({
      message: "User with same username or email already exists",
    });
  }

  const token = jwt.sign({ id: newUser._id }, jwtKey);

  res.status(200).json({
    success: true,
    message: "New user successfully created!",
    username: username,
    token: token,
  });
}

module.exports = { signupController };
