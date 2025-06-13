const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Admin } = require("../db/index");

dotenv.config();
const jwtKey = process.env.JWT_ADMIN_KEY;

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
        message: "Admin does not exist",
        error: "Invalid token",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Hello! ${payload.username}`,
    });
  }

  // Login without JWT
  const { username, password } = req.body;

  try {
    const foundUser = await Admin.findOne({
      username: username,
      password: password,
    });
    const token = jwt.sign({ id: foundUser._id }, jwtKey);
    return res.status(200).json({
      success: true,
      message: `Hello! ${foundUser.username}`,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      success: false,
      message: "Admin does not exist!",
    });
  }
}

module.exports = { loginController };
