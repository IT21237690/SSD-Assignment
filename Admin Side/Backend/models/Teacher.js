const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema ({

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

    email :{
        type : String,
        required : true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },

    workPlace : {
        type : String,
        required : true
    },

    subject : {
        type : String,
        required : true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },


    isAdminApproved: {
        type: Boolean,
        default: false
      },
    

    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
})

const Teacher =  mongoose.model("teachers",teacherSchema);
module.exports = Teacher;