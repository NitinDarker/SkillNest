const { User, Course, Purchase } = require("../db");

async function coursePurchase(req, res) {
  const userId = req.id;
  const courseId = req.body.courseId;

  try {
    if (!(await Course.findById(courseId))) {
      throw new Error();
    }

    const user = await User.findById(userId);
    let purchasesArr = user.purchases;

    for (const id of purchasesArr) {
      if (id == courseId) {
        return res.status(400).json({
          success: false,
          message: "Course already purchased",
        });
      }
    }
    purchasesArr.push(courseId);

    await User.updateOne(
      { _id: userId },
      {
        purchases: purchasesArr,
      }
    );

    const newPurchase = new Purchase({
      courseId: courseId,
      userId: userId,
    });
    await newPurchase.save();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Invalid Course Id",
    });
  }

  res.status(200).json({
    success: true,
    message: "Course purchased successfully",
  });
}

module.exports = { coursePurchase };
