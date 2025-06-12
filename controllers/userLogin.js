const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../db/index");

dotenv.config();
const jwtKey = process.env.JWT_KEY;

async function loginController(req, res) {
  const token = req.headers.authorization;
  // Login with JWT
  if (token) {
    let payload = null;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      console.log(e);
      return res.status(404).send("User does not exist");
    }
    return res.status(200).json({
      success: true,
      message: `Hello! ${payload.username}`,
    });
  }

  // Login without JWT
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({
      username: username,
      password: password,
    });
    return res.status(200).json({
      success: true,
      message: `Hello! ${foundUser.username}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send("User does not exist!");
  }
}

module.exports = { loginController };
