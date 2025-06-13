const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { User } = require("../db/index");

dotenv.config();
const jwtKey = process.env.JWT_USER_KEY;

async function loginController(req, res) {
  const token = req.headers.authorization;
  // Login with JWT
  if (token) {
    let payload = null;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      console.log(e);
      return res.status(404).json({
        success: false,
        message: "User does not exist",
        error: "Invalid token",
      });
    }
    const myUser = await User.findById(payload.id);
    return res.status(200).json({
      success: true,
      message: `Hello! ${myUser.username}`,
    });
  }

  // Login without JWT
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  try {
    const foundUser = await User.findOne({ username: username });

    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid username",
      });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: foundUser._id }, jwtKey);
    return res.status(200).json({
      success: true,
      message: `Welcome back! ${foundUser.username}`,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      success: false,
      message: "User login error!",
    });
  }
}

module.exports = { loginController };
