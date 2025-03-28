const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Min length should be over than 1 symbol'],
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    minlength: [25, 'Min length of the message should be over than 24 symbols'],
    required: true,
  },
});

module.exports = mongoose.model('post', postSchema);
