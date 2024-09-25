const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({

    name : {
        type : String,
        required :true
    },

    nic : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },
    
    age : {
        type : String,
        required :true
    },

    gender : {
        type : String,
        required : true
    },

    land : {
        type :String,
        requred : true
    },

    mobile : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : false
    },

    category : {
        type : String,
        required : true
    }
})

const Staff = mongoose.model("staff member", staffSchema);
module.exports = Staff;