const { User } = require("../db/index");

async function loginController(req, res) {
    if (req.id) {
        // JWT verified
    }

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
