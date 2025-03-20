const express = require('express');
const postController = require('../controller/postController');
const route = express.Router();

// Routes
route.get('/', postController.homePage);
route.get('/*', postController.notFoundPage);

module.exports = route;
