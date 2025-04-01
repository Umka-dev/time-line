const express = require('express');
const userController = require('../controller/userController');
const userAuth = require('../auth/auth');
const postController = require('../controller/postController');
const commentController = require('../controller/commentController');

const route = express.Router();

// Routes
route.get('/', userAuth.isLoggedIn, postController.homePage);
route.get('/post/:postId', userAuth.isLoggedIn, postController.getPost);
route.get('/add-new-post', userAuth.isLoggedIn, postController.addNewPostForm);
route.post('/add-new-post', userAuth.isLoggedIn, postController.addNewPost);
route.post(
  '/delete/post/:postId',
  userAuth.isLoggedIn,
  postController.deletePost
);
route.post(
  '/edit-post-form/:postId',
  userAuth.isLoggedIn,
  postController.editPostForm
);

// Comment routes
route.post(
  '/post/add/new-comment/:postId',
  userAuth.isLoggedIn,
  commentController.addComment
);
route.post(
  '/delete/post/comment/:commentId/:postId',
  userAuth.isLoggedIn,
  commentController.deleteComment
);

// User routes
route.get(
  '/user/signup-login',
  userAuth.isSignUpLoginAnable,
  userController.renderSignUpPage
);
route.post('/user/signup-login', userController.signUp);
route.post('/user/login', userController.logIn);
route.get('/logout', userController.logOut);
route.get('/user', userAuth.isLoggedIn, userController.userPage);

//404 route
route.get('/*', postController.notFoundPage);

module.exports = route;
