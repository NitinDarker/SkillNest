const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtKey = process.env.JWT_KEY;

function userAuth(req, res, next) {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, jwtKey);
  } catch (e) {
    console.log(e);
    return res.status(401).send("User does not exist");
  }
  next();
}

module.exports = { userAuth };
