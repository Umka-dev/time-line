const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
