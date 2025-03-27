exports.firstAPI = (req, res) => {
  // Your logic here
  const responseData = {
    message: 'Hello, this is your API response!',
    timestamp: new Date().toISOString(),
  };

  // Send the JSON response
  res.json(responseData);
};
