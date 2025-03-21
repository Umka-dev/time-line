const express = require('express');
const routes = require('./config/routes');
const app = express();
const port = 3000;

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

app.use(routes);
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
