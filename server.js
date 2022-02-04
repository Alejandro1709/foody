const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const app = express();

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let restaurants = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/data/restaurants.json'))
);

app.get('/', (req, res) => {
  res.render('restaurants');
});

// routes
app.get('/api/v1/restaurants', (req, res) => {
  res.status(200).json(restaurants);
});

app.get('/api/v1/restaurants/:id', (req, res) => {
  let singleRestaurant = restaurants.find((r) => r.id === req.params.id);

  if (!singleRestaurant) {
    return res.status(404).json({ message: 'This restaurant does not exists' });
  }

  res.status(200).json(singleRestaurant);
});

app.post('/api/v1/restaurants/', (req, res) => {
  let {
    restaurantName,
    restaurantSlug,
    restaurantCategory,
    restaurantWebsite,
  } = req.body;

  let newRestaurant = {
    id: uuid(),
    restaurantName,
    restaurantSlug,
    restaurantCategory,
    restaurantWebsite,
  };

  restaurants.push(newRestaurant);

  fs.writeFile(
    path.join(__dirname, '/data/restaurants.json'),
    JSON.stringify(restaurants),
    (err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/');
    }
  );
});

app.patch('/api/v1/restaurants/:id', (req, res) => {
  let singleRestaurant = restaurants.find((r) => r.id === req.params.id);

  if (!singleRestaurant) {
    return res.status(404).json({ message: 'This restaurant does not exists' });
  }

  let { restaurantName, restaurantCategory, restaurantWebsite } = req.body;

  singleRestaurant.restaurantName = restaurantName;
  singleRestaurant.restaurantCategory = restaurantCategory;
  singleRestaurant.restaurantWebsite = restaurantWebsite;

  res.redirect('/');
});

// not found route
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Page Not Found' });
});

const port = process.env.PORT || 2000;

app.listen(port, () =>
  console.log(`Server is live at: http://localhost:${port}`)
);
