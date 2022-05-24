const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
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

    const d1 = new Date(new Date().getTime() + c1_json.timezone * 1000);
    d1.toISOString();

    const d2 = new Date(new Date().getTime() + c2_json.timezone * 1000);
    d2.toISOString();

    const d3 = new Date(new Date().getTime() + c3_json.timezone * 1000);
    d3.toISOString();

    let getTime = (milli) => {
      let time = new Date(milli);
      let hours = time.getUTCHours();
      let minutes = time.getUTCMinutes();
      let seconds = time.getUTCSeconds();
      return hours + ':' + minutes + ':' + seconds;
    };

    const c1_time = getTime(d1.getTime());
    const c2_time = getTime(d2.getTime());
    const c3_time = getTime(d3.getTime());

    c1_json.time = c1_time;
    c2_json.time = c2_time;
    c3_json.time = c3_time;

    const data = [];

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
