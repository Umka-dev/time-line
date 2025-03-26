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

const addNewPost = (req, res) => {
  let newPost = new postModel(req.body);
  newPost
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err.errors.message.kind);
      if (err && err.errors.message.kind === 'minlength') {
        postModel
          .find()
          .sort({ createdAt: -1 })
          .populate('comments', '_id comment')
          .then((posts) => {
            res.render('homepage', {
              postList: posts,
              errPostLength: 'Min length of the message should be over than 25',
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

const deletePost = (req, res) => {
  let postId = req.params.postId;
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

const updatePost = (req, res) => {
  // Get post info from DB
  postModel
    .findById(req.params.postId)
    .then((post) => {
      res.render('edit-post-form', {
        post,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

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
  addNewPost,
  deletePost,
  updatePost,
  editPostForm,
  notFoundPage,
};
