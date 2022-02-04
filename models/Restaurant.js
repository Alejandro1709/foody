const mongoose = require('mongoose');
const slugify = require('slugify');

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: [true, 'Please provide a name for the restaurant'],
    trim: true,
    unique: true,
  },
  restaurantSlug: {
    type: String,
    lowercase: true,
    unique: true,
  },
  restaurantCategory: {
    type: String,
    required: [true, 'Please provide a category for the restaurant'],
    trim: true,
  },
  restaurantWebsite: {
    type: String,
    required: [true, 'Please provide a website for the restaurant'],
    trim: true,
  },
});

restaurantSchema.pre('save', function () {
  this.restaurantSlug = slugify(this.restaurantName);
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
