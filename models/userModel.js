const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: [6, 'Min length should be over than 5 symbol'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', userSchema);
