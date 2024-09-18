const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    name:{
        type : String,
        required: true
    },
    cardNumber:{
        type : Number,
        required: true
    },
    ExpYear:{
        type: Number,
        required: true
    },
    ExpMonth:{
        type: Number,
        required: true
    },
    cvc:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = Payment;