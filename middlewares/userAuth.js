const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

function userAuth(req, res, next) {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, jwtKey);
  } catch (e) {
    console.log(e);
    res.status(300).send("User does not exist");
  }
  next();
}
 
module.exports = { userAuth };