const mongoose = require('mongoose');

//Schema creation
const Schema = mongoose.Schema;

const noticeSchema = Schema({

    message: {
        type: String,
        required: true //backend validation
    },
    mid: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    }
})

const notice = mongoose.model("notice", noticeSchema)

module.exports = notice;