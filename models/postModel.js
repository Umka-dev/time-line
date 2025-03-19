const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    // name: 'Michael Choi'
    type: String,
    required: true,
  },
  createdAt: {
    // createdAt: '18-03-2025'
    type: String,
    required: true,
  },
  message: {
    // message: 'some text'
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('post', postSchema);
