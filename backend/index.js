const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.PORT;

const UserRouter = require("./routes/user");
const AdminRouter = require("./routes/admin");
const { courseDisplay } = require("./controllers/courseDisplay");
const { courseDisplayWithId } = require("./controllers/courseDisplayId");

app.use(express.json());

app.use("/user", UserRouter);
app.use("/admin", AdminRouter);

// Landing Page
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to SkillNest, where all the courses are present!",
  });
});

app.get("/course", courseDisplay);

app.get("/course/:courseId", courseDisplayWithId);

// Catch-All Middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route does not exist!",
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Sorry! Something has occurred on our end!",
  });
  console.error(err);
});

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
