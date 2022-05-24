const Nav = document.querySelector('.nav-links');
const a = document.createElement('a');
const listItem = document.createElement('li');

a.textContent = 'Back';
a.href = '/';
listItem.appendChild(a);
Nav.appendChild(listItem);

const lat = data.coord.lat;
const lon = data.coord.lon;

var map = L.map('issMap').setView([lat, lon], 12);

const cityCoordinates = data.city;

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoiY2luZW1hY2x1YiIsImEiOiJjbDE2MGh2dDgwMGhjM2Ntd3ZodG14NW5hIn0.F_WC5KyWuTfyfFlFSgFbcQ',
  }
).addTo(map);

var cities = [
  {
    type: 'Feature',
    properties: { party: 'City' },
    geometry: {
      type: 'Polygon',
      coordinates: [cityCoordinates],
    },
  },
];

L.geoJSON(cities, {
  style: function (feature) {
    switch (feature.properties.party) {
      case 'City':
        return { color: '#0000FF' };
    }
  },
}).addTo(map);

console.log(data);
