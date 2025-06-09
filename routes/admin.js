const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/login", (req, res) => {});

adminRouter.post("/signup", (req, res) => {});

adminRouter.post("/courses", (req, res) => {});

adminRouter.get("/courses", (req, res) => {});

adminRouter.put("/courses/:courseId", (req, res) => {});

module.exports = adminRouter;
