function courseIdController (req, res) {
    res.send(req.params.courseId)
}

module.exports = { courseIdController }