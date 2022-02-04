const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

router.get('/', restaurantController.getAllRestaurants);

router.get('/:slug', restaurantController.getSingleRestaurant);

router.post('/new', restaurantController.createRestaurants);

router.patch('/:slug', restaurantController.updateRestaurant);

router.delete('/:slug', restaurantController.deleteRestaurant);

module.exports = router;
