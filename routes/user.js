const { Router } = require("express");
const userRouter = Router();
const { User, Course } = require("../db/index");

userRouter.post("/signup", (req, res) => {
    
});

userRouter.post("/login", (req, res) => {});

userRouter.get("/courses", (req, res) => {});

userRouter.get("/courses/:courseId", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = app;
