const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const renderSignUpPage = (req, res) => {
  res.render('signup-login', {
    signUpMessage: null,
    noUserMessage: null,
    wrongPassMessage: null,
  });
};

const signUp = async (req, res) => {
  //check if req.body.email is empty or not!
  if (req.body.email === '') {
    console.log('The email should be filled!');
    return;
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
    // console.log(typeof req.body.password);
    // console.log(typeof existedUser.password[0]);
    const isCorrectPass = bcrypt.compareSync(
      req.body.password,
      existedUser.password
    );
    if (isCorrectPass) {
      //   console.log(existedUser);
      // User is allow to log in to the website
      // User is allow to go to the dashboard/home page
      // AUTH
      // JWT
      const userToken = await jwt.sign(
        { user: existedUser },
        'User is JWT now'
      );
      // How to make the token works?
      // Send the token to our req/res => use cookie parser
      //   console.log(userToken);
      res.cookie('authToken', userToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      }); // register user token inside the cookie
      res.redirect('/');
    } else {
      res.render('signup-login', {
        signUpMessage: null,
        noUserMessage: null,
        wrongPassMessage: 'The password is not correct',
      });
    }
  } else {
    res.render('signup-login', {
      signUpMessage: null,
      noUserMessage: 'The user does not exist. Sign up first, please.',
      wrongPassMessage: null,
    });
  }
};

// Delete user

// Update user

const logOut = (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/');
};

module.exports = { signUp, renderSignUpPage, logIn, logOut };
