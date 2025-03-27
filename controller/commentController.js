const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

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
        if (err && err.errors.comment.kind === 'minlength') {
          postModel
            .find()
            .sort({ createdAt: -1 })
            .populate('comments', '_id comment')
            .then((posts) => {
              let errorMessages = {};
              errorMessages[postId] = err.errors.comment.properties.message;
              res.render('homepage', {
                postList: posts,
                errPostLength: null,
                errCommentLength: errorMessages,
              });
            })
            .catch((err) => {
              console.log('Error fetching posts:', err);
              res.status(500).send('Internal Server Error');
            });
        }
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

module.exports = {
  addComment,
  deleteComment,
};
