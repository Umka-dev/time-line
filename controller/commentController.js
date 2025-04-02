const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel');

const addComment = (req, res) => {
  const postId = req.params.postId;
  const userInfo = JSON.parse(req.cookies.userInfo);

  if (!userInfo) {
    res.redirect('/user/signup-login');
  }
  if (req.body.comment !== '' && postId) {
    const commentData = {
      ...req.body,
      post: postId,
      user: userInfo.id,
    };

    const newComment = new commentModel(commentData);

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
              // update user table to add the comment ids
              .then(() => {
                userModel
                  .findById(userInfo.id)
                  .populate('posts')
                  .populate('comments')
                  .then((userData) => {
                    userData.comments.push(newComment._id);

                    userData
                      .save()
                      .then(() => {
                        res.redirect('/');
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })

      .catch((err) => {
        console.log('err.errors', err);
        if (err && err.errors.comment.kind === 'minlength') {
          postModel
            .find()
            .sort({ createdAt: -1 })
            .populate('comments')
            .populate('user')
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
