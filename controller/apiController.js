const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

// Function to GET all posts
const getAllPosts = (req, res) => {
  postModel
    .find()
    .populate('comments')
    .then((posts) => {
      console.log('posts found:', posts);
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: 'No posts found' });
      }
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log('Error fetching posts:', err);
      res.status(400).json({ message: 'Error fetching the data' });
    });
};

// Function to POST a new post
const addNewPost = (req, res) => {
  let newPost = new postModel(req.body);
  const { name, message } = newPost;
  if (!name || !message) {
    return res.status(400).json({ Error: 'All field are required' });
  }
  newPost
    .save()
    .then((savedPost) => res.status(201).json(savedPost))
    .catch((err) => {
      let errorMessage = err.errors.message.properties.message;
      res.status(400).json({ Error: `${errorMessage}` });
      console.log('Error:', errorMessage);
    });
};

module.exports = {
  getAllPosts,
  addNewPost,
};
