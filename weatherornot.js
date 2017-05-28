var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

var mapBoxUrl = function (type) {
    return 'https://api.mapbox.com/styles/v1/mapbox/' + type + '/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2VydHlsb3A1IiwiYSI6ImNqMzdnb2ZqYTAwY3Uyd25tYmhsM3Rhc2wifQ.ZOoILYsF0s6kkgzbGKxDTg';
};

var openWeatherMapUrl = function (type) {
    return 'http://tile.openweathermap.org/map/' + type + '_new/{z}/{x}/{y}.png?appid=df3599ec58bd5b740af3da99a01e2858';
};

var renderMap = function (position) {
    console.log(position);
    var coords = position.coords;
    var map = L.map('map', {
	boxZoom: false
    }).setView([coords.latitude, coords.longitude], 10);

    var addLayers = function (layers) {
	const options = {attribution: ""};
	const baseLayers = {};
	const overlays = {};
	for (const layerName in layers) {
	    const layer = layers[layerName];
	    if (layer.constructor === Array) {
		baseLayers[layerName] = L.tileLayer(layer[0], options);
		map.addLayer(baseLayers[layerName]);
	    } else {
		overlays[layerName] = L.tileLayer(layer, options);
	    }
	}
	L.control.layers(baseLayers, overlays).addTo(map);
    };
    addLayers({
	streets: [mapBoxUrl('streets-v10'), true],
	traffic: mapBoxUrl('traffic-day-v2'),
	clouds: openWeatherMapUrl('clouds'),
	temperature: openWeatherMapUrl('temp'),
	precipitation: openWeatherMapUrl('precipitation'),
	pressure: openWeatherMapUrl('pressure'),
	wind: openWeatherMapUrl('wind'),
    });

    var appId = "33d3623cc587372f825d46cc063cf544";

    var weatherAtUrl = function (lat, lng) {
	return "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&units=imperial&appid=" + appId;
    };

    var popup = L.popup();

    function getComment() {
	var test = document.getElementById("lol").value;
	console.log("testkey: " + test);
	popup
	    .setContent(
		'<h1>Submitted comment</h1>'
		    + 'The weather in {name}, {country} is {weather}: <br>'
		    + 'Temperature: {currentTemp}&deg; F, Low: {minTemp}&deg; F, High: {maxTemp}&deg F;<br>'
		    + '\tPressure: {pressure} hPa<br>'
		    + '\tHumidity: {humidity}%<br>'
		    + '\tWind: {windSpeed} mph'
		    + "<input id='lol'></input> "
		    + "<button onClick='getComment()'>Submit</button>"
		    + "<h2>@" + popup.getLatLng().toString()+"</h2>");
    }

    //callback for clicking on the map
    function onMapClick(e) {
	if (e != null) {
	    if (e.hasOwnProperty("originalEvent") ) {
		var guy = e.originalEvent;
		if ("charCode" in guy) {
		    getComment();
		    return;
		}
		else {
		    console.log("Faile");
		}
	    }
	}
	const latlng = e.latlng;
	fetch(weatherAtUrl(latlng.lat, latlng.lng)).then(function (response) {
	    return response.json();
	}).then(function (json) {
	    popup.setLatLng(latlng)
		.setContent(format('The weather in {name}, {country} is {weather}: <br>'
				   + 'Temperature: {currentTemp}&deg; F, Low: {minTemp}&deg; F, High: {maxTemp}&deg F;<br>'
				   + '\tPressure: {pressure} hPa<br>'
				   + '\tHumidity: {humidity}%<br>'
				   + '\tWind: {windSpeed} mph'
				   + "<input id='lol'></input> "
				   + "<button onClick='getComment()'>Submit</button>"
				   + "<h2>@" + e.latlng.toString()+"</h2>", {
				       name: json.name,
				       country: json.sys.country,
				       weather: json.weather[0].description,
				       currentTemp: json.main.temp,
				       minTemp: json.main.temp_min,
				       maxTemp: json.main.temp_max,
				       pressure: json.main.pressure,
				       humidity: json.main.humidity,
				       windSpeed: json.wind.speed
				   }).replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"))
		.openOn(map);
	});
	console.log(e.latlng);
	writeNewPost(e.latlng['lat'], e.latlng['lng'], "hi")
    }

    //binds clicking action to the callback
    map.on('click', onMapClick);
};

navigator.geolocation.getCurrentPosition(renderMap);
