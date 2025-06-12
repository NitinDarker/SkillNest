const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtKey = process.env.JWT_KEY;

function userAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    next();
  }

  try {
    const username = jwt.verify(token, jwtKey);
    console.log(username);
  } catch (e) {
    console.log(e);
    return res.status(401).send("User does not exist");
  }
  next();
}

module.exports = { userAuth };
