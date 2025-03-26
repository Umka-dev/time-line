const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
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
    minlength: [25, 'Min length of the message should be over than 25 symbols'], // Minimum length
    required: true,
  },
});

module.exports = mongoose.model('post', postSchema);
