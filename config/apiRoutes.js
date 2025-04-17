const express = require('express');
const route = express.Router();
const apiController = require('../controller/apiController');

// User routs
route.get('/users', apiController.getAllUsers);

// Post routs
route.get('/posts', apiController.getAllPosts);
route.post('/post', apiController.addNewPost);
route.delete('/post/:postId', apiController.deletePost);
route.get('/post/:postId', apiController.getPost);
route.patch('/post/:postId', apiController.updatePost);

// Comment routs
route.post('/post/:postId', apiController.addComment);
route.delete('/post/:postId/:commentId', apiController.deleteComment);

module.exports = route;
