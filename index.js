const express = require("express");
const app = express();
const PORT = 3000;

const UserRouter = require("./routes/user");
const AdminRouter = require("./routes/admin");

app.use(express.json());

app.use("/user", UserRouter);
app.use("/admin", AdminRouter);

app.get("/", (req, res) => {
  console.log("Someone hit the GET request");
  res.send("Welcome to SkillNest, where all the courses are present!");
});

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
  console.log(err);
});

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
