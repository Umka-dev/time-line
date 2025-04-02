// How to know if the user is already logged in or not yet?
// The answer: The TOKEN
// If the request has the user token => user is logged in
// If the request doesn't have the token => user is NOT logged in

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    next();
  } else {
    res.redirect('/user/signup-login');
  }
};

const isSignUpLoginAnable = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  isLoggedIn,
  isSignUpLoginAnable,
};
