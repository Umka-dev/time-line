const homePage = (req, res) => {
  res.render('homepage');
};

const notFoundPage = (req, res) => {
  res.send('404, Page not found!');
};

module.exports = {
  homePage,
  notFoundPage,
};
