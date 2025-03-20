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
        'This is my message    This is my message This is my message This is my messageThis is my message',
    },
  ];
  res.render('homepage', {
    postList: dataObj,
  });
};

const notFoundPage = (req, res) => {
  res.render('404page');
};

module.exports = {
  homePage,
  notFoundPage,
};
