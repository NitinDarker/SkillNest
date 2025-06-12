const { Course } = require("../db");

async function courseDelete(req, res) {
  const courseId = req.params.courseId;

  try {
    const updatedCourse = await Course.findByIdAndDelete(courseId);

    if (!updatedCourse) {
      res.status(400).json({
        success: false,
        message: "Course does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course is successfully deleted!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Invalid Course Id",
    });
  }
}

module.exports = { courseDelete };
