const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const renderSignUpPage = (req, res) => {
  res.render('signUpLogIn', {
    result: '',
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
    const hashedPass = await bcrypt.hashSync(req.body.password, 10);
    const userData = {
      ...req.body,
      password: hashedPass, // replace the real password with the encrypted one
    };
    const newUser = new userModel(userData);
    newUser
      .save()
      .then((data) => {
        res.render('signUpLogIn', {
          result: 'User is signed up... you can log in now',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Log in

// Delete user

// Update user

module.exports = { signUp, renderSignUpPage };
