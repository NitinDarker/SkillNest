const mongoose = require("mongoose");
const { Schema } = mongoose;
require(".dotenv").config();

const mongoURL = process.env.MONGODB_URI;
mongoose.connect(mongoURL);

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    purchases: courseSchema,
});

const adminSchema = new Schema({
    username: String, 
    email: String,
    password: String,
})

const courseSchema = new Schema({
    title: String, 
    price: Number,
    imageUrl: String,
    description: String,
});

const User = mongoose.model("user", userSchema);
const Admin = mongoose.model("admin", adminSchema);
const Course = mongoose.model("course", courseSchema);

module.exports = {User, Admin, Course};