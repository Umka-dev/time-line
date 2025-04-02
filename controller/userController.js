const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const renderSignUpPage = (req, res) => {
  res.render('signup-login', {
    signUpErrMessage: null,
    signUpMessage: null,
    noUserMessage: null,
    wrongPassMessage: null,
  });
};

const signUp = async (req, res) => {
  if (
    req.body.first_name === '' ||
    req.body.last_name === '' ||
    req.body.password === '' ||
    req.body.email === ''
  ) {
    return res.render('signup-login', {
      signUpErrMessage: 'All the fields should be filled!',
      signUpMessage: null,
      noUserMessage: null,
      wrongPassMessage: null,
    });
  }

  // bcrypt/hash the password
  if (req.body.password !== '') {
    // Hash password
    const hashedPass = bcrypt.hashSync(req.body.password, 10);
    const userData = {
      ...req.body,
      password: hashedPass, // replace the real password with the encrypted one
    };
    const newUser = new userModel(userData);
    newUser
      .save()
      .then((data) => {
        res.render('signup-login', {
          signUpErrMessage: null,
          signUpMessage: 'The user is signed up. You can log in now.',
          noUserMessage: null,
          wrongPassMessage: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Log in
const logIn = async (req, res) => {
  // First: check if the user is exist
  const existedUser = await userModel.findOne({ email: req.body.email });

  if (existedUser) {
    // Second: check if the password is correct
    const isCorrectPass = bcrypt.compareSync(
      req.body.password,
      existedUser.password
    );
    if (isCorrectPass) {
      const userToken = await jwt.sign(
        { user: existedUser },
        'User is JWT now'
      );

      res.cookie('authToken', userToken); // register user token inside the cookie

      // Add user info to the browser cookie
      const userInfo = {
        id: existedUser._id,
        first_name: existedUser.first_name,
        last_name: existedUser.last_name,
      };
      res.cookie('userInfo', JSON.stringify(userInfo)); // Convert object to string
      return res.redirect('/');
    } else {
      res.render('signup-login', {
        signUpErrMessage: null,
        signUpMessage: null,
        noUserMessage: null,
        wrongPassMessage: 'The password is not correct',
      });
    }
  } else {
    res.render('signup-login', {
      signUpErrMessage: null,
      signUpMessage: null,
      noUserMessage: 'The user does not exist. Sign up first, please.',
      wrongPassMessage: null,
    });
  }
};

// Get user data from the cookies
const userPage = (req, res) => {
  const userInfo = JSON.parse(req.cookies.userInfo);
  res.render('user-page', { userInfo });
};

// Delete user

// Update user

const logOut = (req, res) => {
  res.clearCookie('authToken');
  res.clearCookie('userInfo');
  res.redirect('/');
};

module.exports = { signUp, renderSignUpPage, logIn, logOut, userPage };
