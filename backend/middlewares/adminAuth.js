const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtKey = process.env.JWT_ADMIN_KEY;

function adminAuth(req, res, next) {
  const token = req.headers.authorization;
  let payload = null;

  if (!token) {
    return res.status(404).json({
        success: "false",
        "message": "Token is not provided"
    })
  }

  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    console.log(e);
    return res.status(404).send("Admin does not exist");
  }
  req.id = payload.id;
  req.username = payload.username;
  next();
}

module.exports = { adminAuth };
