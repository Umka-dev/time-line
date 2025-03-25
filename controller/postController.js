const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

const homePage = (req, res) => {
  postModel
    .find()
    .sort({ createdAt: -1 })
    .populate('comments', '_id comment')
    .then((posts) => {
      // console.log(result); // the list of posts
      res.render('homepage', { postList: posts });
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

const addComment = (req, res) => {
  let postId = req.params.postId;
  if (req.body.comment !== '' && postId) {
    let commentData = {
      ...req.body,
      post: postId,
    };

    let newComment = new commentModel(commentData);

    newComment
      .save()
      .then((data) => {
        // update post table to add the comment id
        postModel
          .findById(postId)
          .then((postInfo) => {
            postInfo.comments.push(newComment._id);

            postInfo
              .save()
              .then(() => {
                res.redirect('/');
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const deleteComment = (req, res) => {
  let postId = req.params.postId;
  let commentId = req.params.commentId;
  // Find and delete comment by its id
  commentModel
    .findByIdAndDelete(commentId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  // Find related post and delete the comment by id (filter array)
  postModel
    .findById(postId)
    .then((post) => {
      let idx = post.comments.indexOf(commentId); // find index of the comment
      post.comments.splice(idx, 1); // remove one comment by index
      post.save();
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
  addComment,
  deleteComment,
  notFoundPage,
};
