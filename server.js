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
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

const weatherRoute = require('./routes/weather');
app.use('/weather', weatherRoute);

const indexRoute = require('./routes/index');
app.use('/x', indexRoute);

app.get('/', (req, res) => {
  res.render('test', { data: req.query.name });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Hosting server on port ${port}`);
});
