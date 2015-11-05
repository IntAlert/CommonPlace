//JQUERY INIT
$(function() {
    $( "#radiusSlider" ).slider({
        range: "min",
        value: 2000,
        min: 500,
        max: 100000,
        step: 500,
        slide: function( event, ui ) {
            var radius = ui.value;
            radius = radius/1000;
            $( "#distance" ).val( radius + "km" );
        },
        change: function( event, ui ) {
            var radius = ui.value;
            userRadius.setRadius(radius);
//            drawRadius(map, userCoords, radius);
        }
    });
    $( "#distance" ).val( "2km" );
});

//MAIN CODE
var map;
var userCoords;
var userRadius;

var ref = new Firebase("https://commonplaceapp.firebaseio.com");
ref.authWithPassword({
    email    : "dlucas@international-alert.org",
    password : "1"
}, function(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        console.log("Authenticated successfully with payload:", authData);
//        getEvents();
    }
});

function initMap() {
    var mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefaultUI: true
     };
     var map = new google.maps.Map(document.getElementById('map'), mapOptions);

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             userCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(userCoords);
             getEvents(map);
             drawRadius(map, userCoords, 2000);
         });
     }
}

function getEvents(map) {
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/events");
    ref.on('child_added', function(snapshot){
        var event = snapshot.val();
        console.log(event);
        var lat = event.lat;
        var lon = event.lon;
        var coords = {lat: lat, lng: lon};
        var name = event.name;
        var details = event.details;
        var datestart = event.datestart;
        var dateend = event.dateend;
        var website = event.website;
        console.log("WEB: " + website);
        var eventMarker = new google.maps.Marker({
            position: coords,
            map: map,
            title: name
        });
        eventMarker.setMap(map);
        
        var contentString = '<h3><center>' + name + '</center></h3><hr>' + 
            '<p><b>Details: </b>' + details + '</p><p><b>Date: </b>' + datestart + ' - ' + dateend + '</p><p><b>Website: </b>' + website + '</p>';
        eventMarker.info = new google.maps.InfoWindow({
            content: contentString,
        });
        eventMarker.info.opened = false;
        eventMarker.addListener('click', function() {
                if(eventMarker.info.opened) {
                    eventMarker.info.close();
                    eventMarker.info.opened = false;
                } else {
                    eventMarker.info.open(map, eventMarker);
                    eventMarker.info.opened = true;
                }
            });
            google.maps.event.addListener(eventMarker.info, 'closeclick', function(){
                eventMarker.info.opened = false;
            });
            google.maps.event.addListener(map, 'click', function(event) {
                eventMarker.info.close();
                eventMarker.info.opened = false;
            });
    });
}

function drawRadius(map, userCoords, radius) {
    console.log("here");
    userRadius = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        map: map,
        center: userCoords,
        radius: radius
    });
    userRadius.setMap(map);
    //checkRadius();
}

//function checkRadius() {
    //get user centre coords
    //get marker coords
    //get difference
    //if within radius
        //show
    //else
        //dont show
//}

function logout() {
    console.log("LOGGING OUT");
    ref.unauth();
    location.reload();
}