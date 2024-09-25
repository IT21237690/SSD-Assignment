const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hallSchema = new Schema({

    

    classname : {
        type : String,
        required: true
    },



    hallname : {
        type : String,
        require: true
    },

    location : {
        type :String,
        require: true
    }
})

const Hall = mongoose.model("Hall",hallSchema);

module.exports = Hall;