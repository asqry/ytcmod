const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Initializing database connection...');

  mongoose.connection.once('open', () => {
    console.log('Connected to the database.');
  });
};
