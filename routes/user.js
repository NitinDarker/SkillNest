const { Router } = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { signupController } = require("../controllers/userSignup");
const { loginController } = require("../controllers/userLogin");
const { courseDisplay } = require("../controllers/courseDisplay");
const { courseDisplayWithId } = require("../controllers/courseDisplayId");
const { purchaseDisplay } = require("../controllers/purchases");
const { coursePurchase } = require("../controllers/CoursePurchase");

const userRouter = Router();

userRouter.post("/signup", signupController);

userRouter.post("/login", loginController);

userRouter.get("/course", courseDisplay);

userRouter.get("/course/:courseId", courseDisplayWithId);

userRouter.post("/purchase", userAuth, coursePurchase);

userRouter.get("/purchase", userAuth, purchaseDisplay);

module.exports = userRouter;
