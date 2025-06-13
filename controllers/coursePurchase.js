const { User, Course, Purchase } = require("../db");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

async function coursePurchase(req, res) {
  const userId = req.id;
  const courseId = req.body.courseId;

  try {
    if (!courseId || !ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Course ID format.",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const user = await User.findById(userId);

    const isAlreadyPurchased = user.purchases.includes(courseId);

    if (isAlreadyPurchased) {
      return res.status(400).json({
        success: false,
        message: "Course already purchased",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { purchases: courseId } }, // $addToSet only adds if not present
      { new: true }
    );

    const newPurchase = new Purchase({
      courseId: courseId,
      userId: userId,
    });
    await newPurchase.save();

    res.status(200).json({
      success: true,
      message: "Course purchased successfully",
      purchaseId: newPurchase._id,
      courseId,
    });
  } catch (err) {
    console.error(error);
    return res.status(404).json({
      success: false,
      message: "Invalid Course Id",
    });
  }
}

module.exports = { coursePurchase };
