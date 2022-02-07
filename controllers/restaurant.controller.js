const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');

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
    const restaurant = await Restaurant.findOne({
      restaurantSlug: req.params.slug,
    }).populate('restaurantMenu');

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
      { restaurantSlug: req.params.slug },
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
      restaurantSlug: req.params.slug,
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

// GET all menu items for a single restaurant
exports.getMenuItemsForRestaurant = async (req, res) => {
  try {
    // GET restaurant by slug
    let restaurant = await Restaurant.findOne({
      restaurantSlug: req.params.slug,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: 'This Restaurant Does Not Exists' });
    }

    let foodItems = await FoodItem.find({ restaurant: restaurant });

    if (foodItems.length === 0) {
      return res
        .status(404)
        .json({ message: 'This Restaurant Does Not Have A Menu' });
    }

    res.status(200).json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PATCH (update) create a menu item for a single restaurant
exports.createMenuForRestaurant = async (req, res) => {
  let { itemTitle, itemDescription, itemPrice } = req.body;

  try {
    // GET restaurant by slug
    let restaurant = await Restaurant.findOne({
      restaurantSlug: req.params.slug,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: 'This Restaurant Does Not Exists' });
    }

    let newMenuItem = new FoodItem({
      restaurant: restaurant.id,
      itemTitle,
      itemDescription,
      itemPrice,
    });

    restaurant.restaurantMenu.unshift(newMenuItem);

    await newMenuItem.save();
    await restaurant.save();

    res.status(201).json({ message: 'FoodItem Created!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
