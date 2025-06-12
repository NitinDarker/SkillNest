const { Router } = require("express");
const { signupController } = require("../controllers/adminSignup");
const { loginController } = require("../controllers/adminLogin");
const { userAuth } = require("../middlewares/userAuth");
const { createCourse } = require("../controllers/createCourse");

const adminRouter = Router();

adminRouter.post("/login", loginController);

adminRouter.post("/signup", signupController);

adminRouter.post("/course", userAuth, createCourse);

adminRouter.get("/courses", (req, res) => {});

adminRouter.put("/courses/:courseId", (req, res) => {});

module.exports = adminRouter;
