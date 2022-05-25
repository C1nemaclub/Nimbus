const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const time = require('../models/time');
const { json } = require('body-parser');

require('dotenv').config();

const api_key = process.env.API_KEY;

router.get('/', async (req, res) => {
  try {
    const c1_url = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${api_key}&units=metric`;
    const c1_response = await fetch(c1_url);
    const c1_json = await c1_response.json();

    const c2_url = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${api_key}&units=metric`;
    const c2_response = await fetch(c2_url);
    const c2_json = await c2_response.json();

    const c3_url = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${api_key}&units=metric`;
    const c3_response = await fetch(c3_url);
    const c3_json = await c3_response.json();

    const data = [];

    c1_json.time = time(c1_json.timezone);
    c2_json.time = time(c2_json.timezone);
    c3_json.time = time(c3_json.timezone);

    data.push(c1_json);
    data.push(c2_json);
    data.push(c3_json);

    if (c3_response.status == 200) {
      res.render('index', { data: data });
    } else {
      throw new Error(c3_response.status);
    }
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
});

module.exports = router;
