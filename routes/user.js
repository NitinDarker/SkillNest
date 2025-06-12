const { Router } = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { signupController } = require("../controllers/userSignup");
const { loginController } = require("../controllers/userLogin");
const { allCourseController } = require("../controllers/allCourseController");
const { courseIdController } = require("../controllers/courseId");
const { purchasesController } = require("../controllers/my_courses");

const userRouter = Router();

userRouter.post("/signup", signupController);

userRouter.post("/login", loginController);

userRouter.get("/courses", userAuth, allCourseController);

userRouter.get("/courses/:courseId", userAuth, courseIdController);

userRouter.get("/purchases", userAuth, purchasesController);

module.exports = userRouter;
