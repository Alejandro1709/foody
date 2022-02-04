const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const app = express();

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home');
});

// routes
app.get('/api/v1/restaurants', (req, res) => {
  let data = fs.readFileSync(
    path.join(__dirname, '/data/restaurants.json'),
    'utf8'
  );

  let restaurants = JSON.parse(data);

  res.status(200).json(restaurants);
});

// not found route
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Page Not Found' });
});

const port = process.env.PORT || 2000;

app.listen(port, () =>
  console.log(`Server is live at: http://localhost:${port}`)
);
