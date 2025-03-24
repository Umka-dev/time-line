const express = require('express');
const postController = require('../controller/postController');
const route = express.Router();

// Routes
route.get('/', postController.homePage);
route.post('/add-new-post', postController.addNewPost);
route.post('/delete/post/:id', postController.deletePost);
route.post('/update/post/:id', postController.updatePost);
route.post('/edit-post-form/:id', postController.editPostForm);
route.get('/*', postController.notFoundPage);

module.exports = route;
