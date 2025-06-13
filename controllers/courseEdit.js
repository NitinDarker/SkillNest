const { Course } = require("../db");

async function courseEdit(req, res) {
  const adminId = req.id;
  const courseId = req.params.courseId;

  try {
    // Check to see if given course belongs to the same admin
    const foundCourse = await Course.findOne({
      _id: courseId,
      creatorId: adminId,
    });

    if (!foundCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found or you don't have permission to edit it.",
      });
    }

    const updateFields = {};
    if (req.body.title) {
      updateFields.title = req.body.title;
    }
    if (req.body.price !== undefined) {
      updateFields.price = req.body.price;
    }
    if (req.body.imageUrl) {
      updateFields.imageUrl = req.body.imageUrl;
    }
    if (req.body.description) {
      updateFields.description = req.body.description;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updateFields,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose schema validators on the update
      }
    );

    const { title, _id, price, imageUrl, description } = updatedCourse;

    return res.status(200).json({
      success: true,
      message: "Course successfully updated",
      course: {
        title,
        _id,
        price,
        imageUrl,
        description,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Invalid Course Id",
    });
  }
}

module.exports = { courseEdit };
