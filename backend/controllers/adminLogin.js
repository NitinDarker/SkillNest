const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
    const myAdmin = await Admin.findById(payload.id);
    return res.status(200).json({
      success: true,
      message: `Hello! ${myAdmin.username}`,
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
    const foundAdmin = await Admin.findOne({ username: username });

    if (!foundAdmin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username",
      });
    }

    const passwordMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: foundAdmin._id }, jwtKey);
    return res.status(200).json({
      success: true,
      message: `Welcome back! ${foundAdmin.username}`,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      success: false,
      message: "Admin login error!",
    });
  }
}

module.exports = { loginController };
