const express = require('express');
const postController = require('../controller/postController');
const route = express.Router();

// Routes
route.get('/', postController.homePage);
route.get('/*', postController.notFoundPage);
route.post('/add-new-post', postController.addNewPost);
route.post('/delete/post/:id', postController.deletePost);

module.exports = route;
