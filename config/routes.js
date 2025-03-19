const express = require('express');
const userController = require('../controller/userControllers');
const route = express.Router();

// Routes
route.get('/', userController.homePage);
route.get('/*', userController.notFoundPage);
route.post('/add-new-post', userController.addNewPost);

module.exports = route;
