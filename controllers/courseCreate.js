const { z } = require("zod");
const { Course } = require("../db/index");

const zodCourse = z.object({
  title: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  description: z.string(),
  creatorId: z.string(),
});

async function createCourse(req, res) {
  const newCourse = req.body;
  const adminId = req.id;
  newCourse.creatorId = adminId;

  if (!zodCourse.safeParse(newCourse).success) {
    console.log(zodCourse.safeParse(newCourse).error);
    return res.status(400).json({
      success: false,
      message: "Invalid Course Credentials!",
    });
  }

  let courseId = null;
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
