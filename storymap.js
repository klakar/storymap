// Javaskript för att skapa en StoryMap av Klas Karlsson 2014-05-25

function fadeOut(element) {
    var op = element.style.opacity;
    var timer = setInterval(function () {
        if (op <= 0){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op -= 0.05;
    }, 4);
}
function fadeIn(element) {
    var op = 0;  // startposition från vänster i procent
    var timer = setInterval(function () {
        if (op >= storyOpacitet){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.04;
    }, 20);
}
function changeStory(position, titel, id, content) {
	fadeOut(document.getElementById(id)),
	map.panTo(position, {
		animate:true,
		duration:panoreringsTid
	}),
	setTimeout(function() {
		document.getElementById(id).innerHTML = content
		fadeIn(document.getElementById(id))
	}, 650);
	
}
var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
 attribution: 'Open Street Map'
});
var positioner = L.layerGroup([]);
var map = L.map('map', {
 center: startKoordinat,
 zoom: startZoom,
 layers: [osm, positioner]
});

L.control.scale({imperial:false, maxWidth:300}).addTo(map);
document.getElementById('rubrik').style.opacity = rubrikOpacitet;
document.getElementById('story').style.opacity = storyOpacitet;


var nummer = -1;
var visaVidStart = true;
window.onload=function(){
	changeStory(startKoordinat, 'Startsida', 'story', startText)
	
};

var backa = document.getElementById('backa');
backa.onclick = function() {
    try {	
	nummer -= 1;
	positioner.clearLayers();
	if (visaVidStart) {
		L.marker(position[nummer]).addTo(positioner).bindPopup(bubbelText[nummer]).openPopup();
	} else {
		L.marker(position[nummer]).addTo(positioner).bindPopup(bubbelText[nummer]);
	};
	changeStory(position[nummer], bubbelText[nummer], 'story', storyText[nummer]);
    } catch(err) {
	nummer = -1,
	positioner.clearLayers(),
	changeStory(startKoordinat, 'Startsida', 'story', startText),
	setTimeout(function() {
		map.setZoom(startZoom)
	}, panoreringsTid * 1000);
    }
};

map.on('click', function() {
   try {
	nummer += 1;
	positioner.clearLayers();
	if (visaVidStart) {
		L.marker(position[nummer]).addTo(positioner).bindPopup(bubbelText[nummer]).openPopup();
	} else {
		L.marker(position[nummer]).addTo(positioner).bindPopup(bubbelText[nummer]);
	};
	changeStory(position[nummer], bubbelText[nummer], 'story', storyText[nummer]);
   }
   catch(err) {
	fadeOut(document.getElementById('story')),
	nummer = -1,
	positioner.clearLayers(),
	changeStory(startKoordinat, 'Startsida', 'story', startText),
	setTimeout(function() {
		map.setZoom(startZoom)
	}, panoreringsTid * 1000);
   }
});
