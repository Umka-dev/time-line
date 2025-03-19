const postModel = require('../models/postModel');

const homePage = (req, res) => {
  const dataObj = [
    {
      name: 'Michael Choi',
      createdAt: '18-03-2025',
      message:
        'This is my message    This is my message This is my message This is my messageThis is my message',
    },
    {
      name: 'Luisa Hloe',
      createdAt: '15-03-2025',
      message:
        'This is my message    This is my message This is my message This is my messageThis is my message',
    },
    {
      name: 'John Doe',
      createdAt: '05-02-2025',
      message:
        'This is my message This is my message This is my message This is my messageThis is my message',
    },
  ];
  res.render('homepage', {
    postList: dataObj,
  });
};

const addNewPost = (req, res) => {
  let newPost = new postModel(req.body);
  // console.log(newPost);
  newPost
    .save()
    .then(() => {
      console.log('Post was added');
    })
    .catch((err) => {
      console.log(err);
    });
};

const notFoundPage = (req, res) => {
  res.render('404page');
};

module.exports = {
  homePage,
  addNewPost,
  notFoundPage,
};
