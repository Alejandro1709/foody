const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

router.get('/', restaurantController.getAllRestaurants);

router.get('/:slug', restaurantController.getSingleRestaurant);

router.post('/new', restaurantController.createRestaurants);

module.exports = router;
