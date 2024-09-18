const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({

    subjectname : {
        type : String,
        required: true
    },

    date : {
        type : String,
        required: true
    },

    time : {
        type : String,
        required: true
    },

    teacher : {
        type : String,
        required: true
    },

   
})

const Class = mongoose.model("class",classSchema);

module.exports = Class;