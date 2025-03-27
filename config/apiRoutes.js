const express = require('express');
const route = express.Router();
const apiController = require('../controller/apiController');

route.get('/api/posts', apiController.getAllPosts);
route.post('/api/add-new-post', apiController.addNewPost);

module.exports = route;
