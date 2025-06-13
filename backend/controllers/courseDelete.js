const { Course } = require("../db");

async function courseDelete(req, res) {
  const courseId = req.params.courseId;
  const adminId = req.id;

  try {
    // Check to see if given course belongs to same admin
    const foundCourse = await Course.findOne({
      _id: courseId,
      creatorId: adminId,
    });

    if (!foundCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found or you don't have permission to delete it.",
      });
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course successfully deleted!",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Invalid Course Id",
    });
  }
}

module.exports = { courseDelete };
