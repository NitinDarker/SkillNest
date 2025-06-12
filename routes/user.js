const { Router } = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { signupController } = require("../controllers/userSignup");
const { loginController } = require("../controllers/userLogin");
const { courseDisplay } = require("../controllers/courseDisplay");
const { courseDisplayWithId } = require("../controllers/courseDisplayId");
const { purchasesController } = require("../controllers/my_courses");

const userRouter = Router();

userRouter.post("/signup", signupController);

userRouter.post("/login", loginController);

userRouter.get("/courses", userAuth, courseDisplay);

userRouter.get("/courses/:courseId", userAuth, courseDisplayWithId);

userRouter.get("/purchases", userAuth, purchasesController);

module.exports = userRouter;
