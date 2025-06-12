const { Router } = require("express");
const { signupController } = require("../controllers/adminSignup");
const { loginController } = require("../controllers/adminLogin");
const { createCourse } = require("../controllers/courseCreate");
const { courseDisplay } = require("../controllers/courseDisplay");
const { adminAuth } = require("../middlewares/adminAuth");
const { courseDisplayWithId } = require("../controllers/courseDisplayId");
const { courseEdit } = require("../controllers/courseEdit");
const { courseDelete } = require("../controllers/courseDelete");

const adminRouter = Router();

adminRouter.post("/signup", signupController);

adminRouter.post("/login", loginController);

adminRouter.get("/courses", adminAuth, courseDisplay);

adminRouter.post("/courses", adminAuth, createCourse);

adminRouter.get("/courses/:courseId", adminAuth, courseDisplayWithId);

adminRouter.put("/courses/:courseId", adminAuth, courseEdit);

adminRouter.delete("/courses/:courseId", adminAuth, courseDelete);

module.exports = adminRouter;
