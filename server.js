const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

const weatherRoute = require('./routes/weather');
app.use('/weather', weatherRoute);

const indexRoute = require('./routes/index');
app.use('/', indexRoute);

app.get('/x', (req, res) => {
  res.send('hello ' + req.query.name);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Hosting server on port ${port}`);
});
