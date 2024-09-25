const mongoose =  require('mongoose');

const InventorySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0, // minimum value for the price field
    },
    dateOfPurchase: {
        type: Date,
        required: true,
    },
    initialQuantity: { 
        type: Number, 
        required: true, 
        default: 0 
    }
    
});
InventorySchema.pre('save', function(next) {
    // Set initialQuantity only on document creation
    if (this.isNew) {
      this.initialQuantity = this.quantity;
    }
    next();
  });

  

module.exports = mongoose.model('inventory', InventorySchema);