// Create the map object
// Create the map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add street layer 
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets-basic",
accessToken: API_KEY
}).addTo(myMap);

// Store API endpoint inside queryUrl

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl, function(response) {

  var events = response.features
  
  var markerSize = (points) => points * 25000;
  
  for (var i = 0; i < events.length; i++) {
      if (events[i].properties.mag > 5) {
          L.circle([events[i].geometry.coordinates[1], events[i].geometry.coordinates[0]],{
          fillOpacity: 0.75,
          color: 'red',
          fillColor: 'red',
          radius: markerSize(events[i].properties.mag)
          }).bindPopup('<h1>' + events[i].properties.title + '</h1>').addTo(myMap)
      }
      else if (events[i].properties.mag > 4) {
          L.circle([events[i].geometry.coordinates[1], events[i].geometry.coordinates[0]], {
          fillOpacity: 0.75,
          color: 'orangered',
          fillColor: 'orangered',
          radius: markerSize(events[i].properties.mag)
          }).bindPopup('<h1>' + events[i].properties.title + '</h1>').addTo(myMap)
      }            
      else if (events[i].properties.mag > 3) {
          L.circle([events[i].geometry.coordinates[1], events[i].geometry.coordinates[0]], {
          fillOpacity: 0.75,
          color: 'orange',
          fillColor: 'orange',
          radius: markerSize(events[i].properties.mag)
          }).bindPopup('<h1>' + events[i].properties.title + '</h1>').addTo(myMap)
      }
      else if (events[i].properties.mag  > 2) {
          L.circle([events[i].geometry.coordinates[1], events[i].geometry.coordinates[0]], {
          fillOpacity: 0.75,
          color: 'yellow',
          fillColor: 'yellow',
          radius: markerSize(events[i].properties.mag)
          }).bindPopup('<h1>' + events[i].properties.title + '</h1>').addTo(myMap)
      }
      else {
          L.circle([events[i].geometry.coordinates[1], events[i].geometry.coordinates[0]], {
          fillOpacity: 0.75,
          color: 'yellowgreen',
          fillColor: 'yellowgreen',
          radius: markerSize(events[i].properties.mag)
          }).bindPopup('<h1>' + events[i].properties.title + '</h1>').addTo(myMap)
      }
  }
      });
