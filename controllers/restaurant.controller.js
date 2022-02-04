const Restaurant = require('../models/Restaurant');

// GET all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    if (restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'There are no restaurants in here...' });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//GET single restaurant
exports.getSingleRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ slug: req.params.slug });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: 'This Restaurant Does Not Exists' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//POST (create) a new restaurant
exports.createRestaurants = async (req, res) => {
  let { restaurantName, restaurantCategory, restaurantWebsite } = req.body;

  try {
    await Restaurant.create({
      restaurantName,
      restaurantCategory,
      restaurantWebsite,
    });

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
