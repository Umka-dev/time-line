const express = require('express');
const postController = require('../controller/postController');
const commentController = require('../controller/commentController');
const route = express.Router();

// Routes
route.get('/', postController.homePage);
route.get('/post/:postId', postController.getPost);
route.post('/add-new-post', postController.addNewPost);
route.post('/delete/post/:postId', postController.deletePost);
route.post('/edit-post-form/:postId', postController.editPostForm);

// Comment routs
route.post('/post/add/new-comment/:postId', commentController.addComment);
route.post(
  '/delete/post/comment/:commentId/:postId',
  commentController.deleteComment
);

//404 rout
route.get('/*', postController.notFoundPage);

module.exports = route;
