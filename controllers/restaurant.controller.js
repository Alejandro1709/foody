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

//PATCH (update) a single restaurant
exports.updateRestaurant = async (req, res) => {
  let { restaurantName, restaurantCategory, restaurantWebsite } = req.body;

  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { slug: req.params.slug },
      { restaurantName, restaurantCategory, restaurantWebsite },
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: 'This Restaurant Does Not Exists' });
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE a single restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOneAndRemove({
      slug: req.params.slug,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: 'This Restaurant Does Not Exists' });
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
