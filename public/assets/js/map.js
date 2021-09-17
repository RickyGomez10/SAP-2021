'use strict"'
// Map  objects eso hacce el mapa 
let map = L.map('mapSivar').setView([13.794185, -88.89653], 8);

// Base map layer
let osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
}).addTo(map);

function setMap(markers) {
    var zoom = 10;
    for (var i = 0; i < markers.length; i++) {
        marker = new L.circle([markers[i][1], markers[i][2]],{
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 1000
        })
            .bindPopup(markers[i][0])
            .addTo(map);
    }
}
