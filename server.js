const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./config/connectDB');
const Restaurant = require('./models/Restaurant');
const app = express();

dotenv.config();

connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/restaurants', require('./routes/restaurant.routes'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.render('restaurants', {
      restaurants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// not found route
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Page Not Found' });
});

const port = process.env.PORT || 2000;

app.listen(port, () =>
  console.log(`Server is live at: http://localhost:${port}`)
);
