const mongoose = require('mongoose');
require(".dotenv").config();
const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL);

const userSchema = {

}

const courseSchema = {
    
}