const express = require('express');
const postController = require('../controller/postController');
const commentController = require('../controller/commentController');
const apiController = require('../controller/apiController');
const route = express.Router();

// API routes
route.get('/api/greet', apiController.firstAPI);

// Routes
route.get('/', postController.homePage);
route.post('/add-new-post', postController.addNewPost);
route.post('/delete/post/:postId', postController.deletePost);
route.post('/update/post/:postId', postController.updatePost);
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
