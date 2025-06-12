const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtKey = process.env.JWT_KEY;

function userAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    next();
    return;
  }

  let payload = null;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    console.log(e);
    return res.status(404).send("User does not exist");
  }
  return res.status(200).json({
    success: true,
    message: `Hello! ${payload.username}`
  })
}

module.exports = { userAuth };
