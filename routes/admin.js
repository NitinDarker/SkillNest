const { Router } = require("express");
const { signupController } = require("../controllers/adminSignup");
const { loginController } = require("../controllers/adminLogin");
const { userAuth } = require("../middlewares/userAuth");
const { createCourse } = require("../controllers/courseCreate");
const { courseDisplay } = require("../controllers/courseDisplay");

const adminRouter = Router();

adminRouter.post("/login", loginController);

adminRouter.post("/signup", signupController);

adminRouter.post("/course", userAuth, createCourse);

adminRouter.get("/courses", userAuth, courseDisplay);

adminRouter.put("/courses/:courseId", (req, res) => {});

adminRouter.delete("/course/:courseId");

module.exports = adminRouter;
