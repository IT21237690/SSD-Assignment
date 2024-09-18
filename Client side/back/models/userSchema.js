const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require('moment');

const keysecret = process.env.SECRET_KEY


const userSchema = new mongoose.Schema({

    Sid: {
        type: String,
        unique: true,
      },

    name: {
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        trim: true
    },

    dob: {
        type: String,
        required: true,
        trim: true
    },

    gender: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },

    securityQuestion: {
        type: String,
        required: true,
        default : "Mother's Name"
    },

    securityAnswer: {
        
        type: String,
        required: true,
       
    },

createdAt: { type: Date, default: Date.now },



  qrCode: {
    type: String,
    default: '',
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

userSchema.pre("save", async function (next) {

    const year = moment(this.createdAt).format('YYYY');
    const month = moment(this.createdAt).format('MM');
    const Sid = parseInt(`${year}${month}${Math.random().toString().substr(2, 8)}`, 10);
    this.Sid = Sid;

    

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }

    
    next()
});


// token generate
userSchema.methods.generateAuthtoken = async function () {
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


// createing model
const studentdb = new mongoose.model("students", userSchema);

module.exports = studentdb;


// if (this.isModified("password")) {    }