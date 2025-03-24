const postModel = require('../models/postModel');

const homePage = (req, res) => {
  postModel
    .find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('homepage', { postList: result });
    })
    .catch((err) => {
      console.log('Error fetching posts:', err);
      res.status(500).send('Internal Server Error');
    });
};

const addNewPost = (req, res) => {
  let newPost = new postModel(req.body);
  newPost
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

const deletePost = (req, res) => {
  console.log('Deleting post with ID:', req.params.id);
  postModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

const notFoundPage = (req, res) => {
  res.render('404page');
};

module.exports = {
  homePage,
  addNewPost,
  deletePost,
  notFoundPage,
};
