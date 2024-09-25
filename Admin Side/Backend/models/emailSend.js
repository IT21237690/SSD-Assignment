const mongoose =  require('mongoose');

const emailSendSchema = new mongoose.Schema({
    
    inventoryId: {
        type: String,
        required: true
    },
    emailSentDate: {
        type: Date
    }
    
});

  

module.exports = mongoose.model('emailSendSchema', emailSendSchema);