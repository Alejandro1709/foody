const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  itemTitle: {
    type: String,
    required: [true, 'Please provide a title for this item'],
    trim: true,
  },
  itemDescription: {
    type: String,
    required: [true, 'Please provide a description for this item'],
    trim: true,
  },
  itemPrice: {
    type: Number,
    required: [true, 'Please specify the price of the item'],
    min: 5,
  },
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
