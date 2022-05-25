const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cities = require('../public/json/cities.json');
const time = require('../models/time');
require('dotenv').config();

const api_key = process.env.API_KEY;

router.get('/', async (req, res) => {
  if (req.query.type == 'city') {
    byCity(req.query.city, res);
  } else {
    byCoords(req.query.lat, req.query.lon, res);
  }
});

async function byCity(city, res) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();

    let flag = 0;
    cities.features.forEach((item) => {
      if (item.properties.NAME == city.toUpperCase() && flag == 0) {
        json.city = item.geometry.coordinates[0];
        flag = 1;
      }
    });

    json.time = time(json.timezone);
    let description = json.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.slice(1);
    json.weather[0].description = description;

    if (response.status == 200) {
      res.render('weather/weather', { data: json });
    } else {
      throw new Error(response.status);
    }
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
}

async function byCoords(lat, lon, res) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    const city = json.name;

    let flag = 0;
    cities.features.forEach((item) => {
      if (item.properties.NAME == city.toUpperCase() && flag == 0) {
        json.city = item.geometry.coordinates[0];
        flag = 1;
      }
    });
    json.time = time(json.timezone);
    let description = json.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.slice(1);
    json.weather[0].description = description;

    if (response.status == 200) {
      res.render('weather/weather', { data: json });
    } else {
      throw new Error(response.status);
    }
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
}

module.exports = router;
