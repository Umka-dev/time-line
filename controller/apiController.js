const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

// GET a post by ID
const getPost = (req, res) => {
  const postId = req.params.postId;
  postModel
    .findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: { message: 'Post not found' } });
      }
      res.status(200).json({ post });
    })
    .catch((err) => {
      res.status(500).json({ error: { message: err } });
    });
};

// GET all posts
const getAllPosts = (req, res) => {
  postModel
    .find()
    .populate('comments')
    .then((posts) => {
      res.status(200).json({ posts: posts });
    })
    .catch((err) => {
      res.status(400).json({ error: { message: 'Error fetching the data' } });
    });
};

// POST a new post
const addNewPost = (req, res) => {
  const newPost = new postModel(req.body);
  newPost
    .save()
    .then((savedPost) => res.status(201).json(savedPost))
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

// DELETE a post
const deletePost = (req, res) => {
  const postId = req.params.postId;
  postModel
    .findByIdAndDelete(postId)
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.status(404).json({ error: { message: 'Post not found' } });
      }
      // Delete all comments related to the post
      return commentModel.deleteMany({ post: postId }).then(() => {
        res.status(204).send(); // 204 (No Content)
      });
    })
    .catch((err) => {
      res.status(500).json({ error: { message: 'Internal Server Error' } });
    });
};

// PATCH the updated post to DB
const updatePost = (req, res) => {
  const postId = req.params.postId;
  postModel
    .findByIdAndUpdate(postId, req.body, { new: true, runValidators: true })
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).json({ error: { message: 'Post not found' } });
      }
      res.status(200).json(updatedPost);
    })
    .catch((err) => {
      res.status(500).json({ error: { message: err.message } });
    });
};

module.exports = {
  getPost,
  getAllPosts,
  addNewPost,
  deletePost,
  updatePost,
};
