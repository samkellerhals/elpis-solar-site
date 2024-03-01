// initialising map

var map = L.map('map', {
    scrollWheelZoom: false
}).setView([-2.310506, 30.842288], 15);

// load Google satellite data as map layer

L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: 'Google Satellite Data',
    minZoom: 5
}).addTo(map);

// defining variable for unit icons

var unitIcon = L.icon({
    iconUrl: '/static/images/solar-panel.png',
    iconSize: [32, 32]
}); 

// load geoJSON data and draw markers using predefined icon

var rwandaMarkers = L.geoJSON(rwandaData, {
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: unitIcon});
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup('<div class="popupHeader"><h6>Unit details</h6></div><div class="container-popup"><div class="cardPopup cardPopup-1"><div class="popupText"><h5>Unit Type:</h5><p>' + feature.properties.unit_type + '</p></div></div>' + ' <div class="cardPopup cardPopup-1"><div class="popupText"><h5>Location:</h5><p>' + feature.properties.location + '</p></div></div>' + ' <div class="cardPopup cardPopup-1"><div class="popupText"><h5>Services:</h5><p>' + feature.properties.services + '</p></div></div>' + ' <div class="cardPopup cardPopup-1"><div class="popupText"><h5>Daily phone charging capacity</h5><p>' + feature.properties.charge_capacity + '</p></div></div>' + ' <div class="cardPopup cardPopup-1"><div class="popupText"><h5>Daily water-filtration capacity:</h5><p>' + feature.properties.filter_capacity + '</p></div></div>');
    }
});

var greeceMarkers = L.geoJSON(greeceData, {
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: unitIcon});
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup('<div class="popupHeader"><h6>Unit details</h6></div><div class="container-popup"><div class="cardPopup cardPopup-1"><div class="popupText"><h5>Unit Type:</h5><p>' + feature.properties.unit_type + '</p></div></div>' + ' <div class="cardPopup cardPopup-1"><div class="popupText"><h5>Location:</h5><p>' + feature.properties.location + '</p></div></div>' + ' <div class="cardPopup cardPopup-1"><div class="popupText"><h5>Services:</h5><p>' + feature.properties.services + '</p></div></div>' + ' <div class="cardPopup cardPopup-1"><div class="popupText"><h5>Daily phone charging capacity</h5><p>' + feature.properties.charge_capacity + '</p></div></div>' + ' <div class="cardPopup cardPopup-1"><div class="popupText"><h5>Daily water-filtration capacity:</h5><p>' + feature.properties.filter_capacity + '</p></div></div>');
    }
});

// clustering

var greeceCluster = L.markerClusterGroup({
    spiderLegPolylineOptions: {opacity: 0},
});

var rwandaCluster = L.markerClusterGroup({
    spiderLegPolylineOptions: {opacity: 0},
});

greeceCluster.addLayer(greeceMarkers);
rwandaCluster.addLayer(rwandaMarkers);

map.addLayer(greeceCluster); 
map.addLayer(rwandaCluster); 

// zoom on click

// markers

rwandaMarkers.on('click', function(e) {
    map.setView(e.latlng, 19);
});

greeceMarkers.on('click', function(e) {
    map.setView(e.latlng, 19);
});

// clusters

greeceCluster.on('clusterclick', function (a) {
    map.setView(a.latlng, 19);
});

rwandaCluster.on('clusterclick', function (a) {
    map.setView(a.latlng, 19);
});

// fly to location on click
var campSelector = document.getElementById('campSelector');

function flyToCamp(value) {
    if (value == 1) {
        map.setView([-2.310506, 30.842288], 15) // mahama
    }
    else if (value == 2) {
        map.setView([39.127998, 26.544771], 15) // kara tepe
    }
    else if (value == 3) {
        map.setView([38.387299, 23.503765], 15) // ritsona
    }
    else if (value == 4) {
        map.setView([37.938504, 21.206783], 15) // andravidas
    }
    else if (value == 5) {
        map.setView([38.239651, 23.779302], 15) // malakasa
    }
    else if (value == 6) {
        map.setView([38.794489, 22.527146], 15) // thermopylae
    }
}

campSelector.onchange=function() {
    var val = this.value;
    console.log(val);
    flyToCamp(val);
  }




