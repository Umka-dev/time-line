const express = require('express');
const routes = require('./config/routes');
const app = express();

app.set('view engine', 'ejs');

app.use(routes);

app.listen(3000, () => console.log('Web Server running on port 3000'));

// $(document).ready(() => {
//   // Get current year for the footer
//   $('#currentYear').text(new Date().getFullYear());
// });
