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

adminRouter.get("/course", courseDisplay);

adminRouter.post("/course", adminAuth, createCourse);

adminRouter.get("/course/:courseId", courseDisplayWithId);

adminRouter.put("/course/:courseId", adminAuth, courseEdit);

adminRouter.delete("/course/:courseId", adminAuth, courseDelete);

module.exports = adminRouter;
