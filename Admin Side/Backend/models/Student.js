const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
    {

    name : {
        type : String,
        required :true
    },

    address : {
        type : String,
        required : true
    },
    
    dob : {
        type : String,
        required :true
    },

    gender : {
        type : String,
        required : true
    },

    mobile : {
        type : Number,
        required : true
    },

    email : {
        type : String,
        required : false
    },

    password: {
        type : String,
        required : true
    },
    createdAt: { type: Date, default: Date.now },

    
});

const Student = mongoose.model("students", studentSchema);
module.exports = Student;