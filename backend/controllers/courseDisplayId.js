const { Course } = require("../db");

async function courseDisplayWithId(req, res) {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course does not exist",
      });
    }
    const { title, _id, price, imageUrl, description } = course;

    return res.status(200).json({
      success: true,
      course: {
        title,
        _id,
        price,
        imageUrl,
        description,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Invalid Course Id",
    });
  }
}

module.exports = { courseDisplayWithId };
