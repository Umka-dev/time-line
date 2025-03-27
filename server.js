const express = require('express'); // Import Express module
const routes = require('./config/routes'); // Import Routes configuration
require('./config/mongoose'); // Import Mongoose module

const app = express(); // Define express app

app.use('/public', express.static('public')); // Accept express to use public folder for the static frontend part
app.set('view engine', 'ejs'); // Set ejs as a view engine
app.use(express.urlencoded({ extended: true })); //Accept JSON in the request
app.use(express.json()); // Accept express to use JSON in the response

app.use(routes); // Use routes defined in config/routes.js

// Start the server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
