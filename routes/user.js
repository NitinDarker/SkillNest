const { Router } = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { signupController } = require("../controllers/signup");
const { loginController } = require("../controllers/login");
const { courseController } = require("../controllers/all_courses");

const userRouter = Router();

userRouter.post("/signup", signupController);

userRouter.post("/login", loginController);

userRouter.get("/courses", userAuth, courseController);

userRouter.get("/courses/:courseId", courseController);

userRouter.get("/purchases", (req, res) => {});

module.exports = userRouter;
