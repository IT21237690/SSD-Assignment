const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')

const keysecret = process.env.SECRET_KEY

const teacherSchema = new mongoose.Schema ({

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

    securityQuestion: {
        type: String,
        required: true,
        default : "Mother's name"
    },

    securityAnswer: {
        
        type: String,
        required: true,
       
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


   
});

// hash password

teacherSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);

    }


   
    next()
});


// token generate
teacherSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}







const teacherdb = new mongoose.model("teachers",teacherSchema);
module.exports = teacherdb;