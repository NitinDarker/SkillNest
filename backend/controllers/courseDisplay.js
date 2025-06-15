const { Course } = require("../db");

async function courseDisplay(req, res) {
  const allCourses = await Course.find();

  let newCoursesArr = [];
  for (let obj of allCourses) {
    const { title, _id, price, imageUrl, description } = obj;
    newCoursesArr.push({ title, _id, price, imageUrl, description });
  }
  return res.status(200).json({
    success: true,
    "courses": newCoursesArr,
  });
}

module.exports = { courseDisplay };
