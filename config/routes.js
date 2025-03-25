const express = require('express');
const postController = require('../controller/postController');
const route = express.Router();

// Routes
route.get('/', postController.homePage);
route.post('/add-new-post', postController.addNewPost);
route.post('/delete/post/:postId', postController.deletePost);
route.post('/update/post/:postId', postController.updatePost);
route.post('/edit-post-form/:postId', postController.editPostForm);

// Comment routs
route.post('/post/add/new-comment/:postId', postController.addComment);
route.post(
  '/delete/post/comment/:commentId/:postId',
  postController.deleteComment
);

route.get('/*', postController.notFoundPage);

module.exports = route;
