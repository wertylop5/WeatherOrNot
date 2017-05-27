/**
 * Created by Khyber Sen on 5/27/2017.
 */
var appId = "33d3623cc587372f825d46cc063cf544";

var weatherAt = function(lat, lon) {
    var url = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + appId;
    return fetch(url).blob();
};

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttribution = 'Map data © OpenStreetMap contributors, CC-BY-SA'
var osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});


var map = new L.Map('map');
map.setView(new L.LatLng(0, 0), 4)
map.addLayer(osmLayer);

L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=33d3623cc587372f825d46cc063cf544', {
    attribution: 'Map data © OpenWeatherMap',
    maxZoom: 18
}).addTo(map);