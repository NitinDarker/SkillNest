const { Router } = require("express");
const userRouter = Router();
const { User, Course } = require("../db/index");

userRouter.post("/signup", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        email: email,
        username: username,
        password: password,
    })

    await newUser.save();
    res.send("User saved");
});

userRouter.post("/login", (req, res) => {});

userRouter.get("/courses", (req, res) => {});

userRouter.get("/courses/:courseId", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = userRouter;
