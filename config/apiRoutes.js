const express = require('express');
const route = express.Router();
const apiController = require('../controller/apiController');

// Post routs
route.get('/api/posts', apiController.getAllPosts);
route.post('/api/post', apiController.addNewPost);
route.delete('/api/post/:postId', apiController.deletePost);
route.get('/api/post/:postId', apiController.getPost);
route.patch('/api/post/:postId', apiController.updatePost);

// Comment routs

module.exports = route;
