const { User, Course } = require("../db");

async function purchaseDisplay(req, res) {
  const userId = req.id;
  const user = await User.findById(userId);

  const courses = await Course.find({
    _id: {
      $in: user.purchases,
    },
  });

  return res.status(200).json({
    success: true,
    message: `You have purchased ${courses.length} courses`,
    courses: courses,
  });
}

module.exports = { purchaseDisplay };
