const mongoose = require('mongoose');

const connectDB = async () => {
  let db =
    process.env.NODE_ENV === 'development'
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PROD;

  try {
    const conn = await mongoose.connect(db);

    console.log('Connected To DB!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
