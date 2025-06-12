const { Router } = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { signupController } = require("../controllers/signup");
const { loginController } = require("../controllers/login");

const userRouter = Router();

userRouter.post("/signup", signupController);

userRouter.post("/login", userAuth, loginController);

userRouter.get("/courses", (req, res) => {});

userRouter.get("/courses/:courseId", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = userRouter;
