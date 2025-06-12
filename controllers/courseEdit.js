const { Course } = require("../db");

async function courseEdit(req, res) {
  const courseId = req.params.courseId;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true,});
    const { title, _id, price, imageUrl, description } = updatedCourse;

    return res.status(200).json({
      success: true,
      message: "Course Details are updated",
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

module.exports = { courseEdit };
