const { User } = require("../db");

async function purchaseDisplay(req, res) {
  const userId = req.id;
  const user = await User.findById(userId).populate({
    path: "purchases",
    select: "title description price imageUrl _id",
  });
  return res.status(200).json({
    success: true,
    message: `You have purchased ${user.purchases.length} courses`,
    courses: user.purchases,
  });
}

module.exports = { purchaseDisplay };
