const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

const homePage = (req, res) => {
  postModel
    .find()
    .sort({ createdAt: -1 })
    .populate('comments', '_id comment')
    .then((posts) => {
      res.render('homepage', {
        postList: posts,
        errPostLength: null,
        errCommentLength: null,
      });
    })
    .catch((err) => {
      console.log('Error fetching posts:', err);
      res.status(500).send('Internal Server Error');
    });
};

const getPost = (req, res) => {
  postModel
    .findById(req.params.postId)
    .populate('comments')
    .then((post) => {
      if (!post) {
        return res.status(404).render('404page');
      }
      res.render('one-post-page', {
        post: post,
        errPostLength: null,
        errCommentLength: null,
      });
    })
    .catch((err) => {
      console.error('Searching error:', err);
      res.status(500).send('Internal Server Error');
    });
};

const addNewPost = (req, res) => {
  const userInfo = JSON.parse(req.cookies.userInfo);
  if (!userInfo) {
    res.redirect('/user/signup-login');
  }
  const newPost = new postModel({ ...req.body, user: userInfo.id });
  newPost
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      if (err && err.errors.message.kind === 'minlength') {
        postModel
          .find()
          .sort({ createdAt: -1 })
          .populate('comments', '_id comment')
          .then((posts) => {
            res.render('homepage', {
              postList: posts,
              errPostLength: err.errors.message,
              errCommentLength: null,
            });
          })
          .catch((err) => {
            console.log('Error fetching posts:', err);
            res.status(500).send('Internal Server Error');
          });
      }
    });
};

const addNewPostForm = (req, res) => {
  res.render('add-post-page', {
    postList: null,
    errPostLength: null,
    errCommentLength: null,
  });
};

const deletePost = (req, res) => {
  const postId = req.params.postId;
  postModel
    .findByIdAndDelete(postId)
    .then(() => {
      return commentModel.deleteMany({ post: postId }); // Delete all comments related to the post
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

// Update Post By Id
const editPostForm = (req, res) => {
  postModel
    .findByIdAndUpdate(req.params.postId, req.body)
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
  getPost,
  addNewPost,
  addNewPostForm,
  deletePost,
  editPostForm,
  notFoundPage,
};
