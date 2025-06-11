const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const dotenv = require("dotenv");

dotenv.config();
const mongoURL = process.env.MONGODB_URI;

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const courseSchema = new Schema({
  title: String,
  price: Number,
  imageUrl: String,
  description: String,
  creatorId: { type: ObjectId, ref: "Admin" },
});

const userSchema = new Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  purchases: [{ type: ObjectId, ref: "Course" }],
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
});

const purchaseSchema = new Schema({
  courseId: { type: ObjectId, ref: "Course" },
  userId: { type: ObjectId, ref: "User" },
});

const User = mongoose.model("user", userSchema);
const Admin = mongoose.model("admin", adminSchema);
const Course = mongoose.model("course", courseSchema);
const Purchase = mongoose.model("purchase", purchaseSchema);

module.exports = { User, Admin, Course, Purchase };
