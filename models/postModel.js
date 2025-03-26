const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
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
      minlength: 25, // Minimum length
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', postSchema);
