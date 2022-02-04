const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

router.get('/', restaurantController.getAllRestaurants);

module.exports = router;