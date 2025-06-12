const { Course } = require("../db");

async function courseDisplay(req, res) {
    const allCourses = await Course.find();
    return res.status(200).json(allCourses);
}

module.exports = { courseDisplay };
