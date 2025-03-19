require('dotenv').config();
const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI;

if (!DB_URI) {
  console.error('❌ MongoDB URI is missing! Check your .env file.');
  process.exit(1);
}

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('✅ DB is connected');
  })
  .catch((err) => {
    console.log('❌ MongoDB connection error: ', err);
  });
