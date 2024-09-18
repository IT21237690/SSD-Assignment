const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseID:{
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    teacherName:{
        type: String,
        required: true
    },
    grade:{
        type: Number,
        required: true
    },
    startingTime:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    timeDuration:{
        type: Number,
        required: true
    },
    fee:{
        type: Number,
        required: true
    }
})

const course = mongoose.model("Course",courseSchema);

module.exports = course;