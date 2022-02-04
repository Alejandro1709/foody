const fs = require('fs');
const path = require('path');

let restaurants = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/restaurants.json'))
);

exports.getAllRestaurants = async (req, res) => {
  res.status(200).json(restaurants);
};
