const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const commentModel = require('../models/commentModel');

//--------Operations with users-------- //
const getAllUsers = (req, res) => {
  userModel
    .find()
    .populate('posts')
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => {
      res.status(400).json({ error: { message: 'Error fetching the data' } });
    });
};

//--------Operations with posts-------- //
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
// const addNewPost = (req, res) => {
//   const newPost = new postModel(req.body);
//   newPost
//     .save()
//     .then((savedPost) => res.status(201).json(savedPost))
//     .catch((err) => {
//       res.status(400).json({ error: err });
//     });
// };

const addNewPost = (req, res) => {
  const newPost = new postModel(req.body);

  newPost
    .save()
    .then((savedPost) => {
      return userModel
        .findByIdAndUpdate(
          savedPost.user,
          { $push: { posts: savedPost._id } }, // Add new post ID to user entity for the relationship
          { new: true }
        )
        .then(() => res.status(201).json(savedPost));
    })
    .catch((err) => {
      res.status(400).json({ error: err.message || err });
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
    .catch(() => {
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

//--------Operations with comments-------- //
// POST new comment
const addComment = (req, res) => {
  const postId = req.params.postId;

  if (postId) {
    const commentObj = {
      ...req.body,
      post: postId,
    };

    const newComment = new commentModel(commentObj);

    newComment
      .save() // Save a new comment
      .then(() => {
        // update post table to add the comment ID
        postModel
          .findById(postId) // looking for post by ID
          .then((postInfo) => {
            if (!postInfo) {
              return res
                .status(404)
                .json({ error: { message: 'Post not found' } });
            }
            // Add new comment ID to comments array in found post
            postInfo.comments.push(newComment._id);
            // Save updated post in DB
            postInfo
              .save()
              .then((updatedPost) => {
                res.status(200).json({ post: updatedPost });
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ error: { message: 'Error saving post' } });
              });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: { message: 'Error while searching for post' } });
          });
      })
      // Handle comment saving error
      .catch((err) => {
        if (err?.errors?.comment?.kind === 'minlength') {
          return res.status(400).json({
            error: { message: err.errors.comment.properties.message },
          });
        }
        res.status(500).json({ error: { message: 'Error saving comment' } });
      });
  }
};

// DELETE a comment by ID
const deleteComment = (req, res) => {
  const { postId, commentId } = req.params;
  // Find and delete comment by its ID
  commentModel
    .findByIdAndDelete(commentId)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res
          .status(404)
          .json({ error: { message: 'Comment not found' } });
      }
      // After successful deleting of comment update a post
      return postModel.findById(postId);
    })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: { message: 'Post not found' } });
      }

      // Delete comment Id from comments array in post
      post.comments = post.comments.filter((id) => id.toString() !== commentId);

      return post.save();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(500).json({ error: { message: 'Internal Server Error' } });
    });
};

module.exports = {
  getAllUsers,
  getPost,
  getAllPosts,
  addNewPost,
  deletePost,
  updatePost,
  addComment,
  deleteComment,
};
