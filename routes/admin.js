const { Router } = require("express");
const { signupController } = require("../controllers/adminSignup");
const { loginController } = require("../controllers/adminLogin")

const adminRouter = Router();

adminRouter.post("/login", loginController);

adminRouter.post("/signup", signupController);

adminRouter.post("/courses", (req, res) => {});

adminRouter.get("/courses", (req, res) => {});

adminRouter.put("/courses/:courseId", (req, res) => {});

module.exports = adminRouter;
