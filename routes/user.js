const { Router } = require("express");
const userRouter = Router();

userRouter.post("/login", (req, res) => {});

userRouter.post("/signup", (req, res) => {});

userRouter.get("/courses", (req, res) => {});

userRouter.get("/courses/:courseId", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = app;
