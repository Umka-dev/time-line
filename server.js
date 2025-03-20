const express = require('express');
const routes = require('./config/routes');

require('./config/mongoose');

const app = express();
const port = 3000;

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
