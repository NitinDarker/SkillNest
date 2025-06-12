const { Course } = require("../db/index");

async function createCourse(req, res) {
  const newCourse = req.body;
  const title = req.body.title;
  
  const adminId = req.id;
  newCourse.creatorId = adminId;
  let courseId = null;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Course title field is required",
    });
  }

  try {
    const createdCourse = await Course.create(newCourse);
    courseId = createdCourse._id;
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Course with same title already exists",
    });
  }
  res.status(200).json({
    success: true,
    message: "Course successfully created!",
    "Course ID": courseId,
    "Course Title": newCourse.title,
  });
}

module.exports = { createCourse };
