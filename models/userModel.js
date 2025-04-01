const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: [2, 'Minimum length should be over than 1 symbol'],
  },
  last_name: {
    type: String,
    required: true,
    minlength: [2, 'Minimum length should be over than 1 symbol'],
  },
  email: {
    type: String,
    minlength: [8, 'Email length should be over than 7 symbols'],
    maxlength: [30, 'Email length should be less than 30 symbols'],
    required: true,
  },
  password: {
    type: String,
    minlength: [8, 'Password length should be between 8 and 12 symbols'],
    maxlength: [12, 'Password length should be between 8 and 12 symbols'],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', userSchema);
