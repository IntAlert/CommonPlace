var map;

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
         zoom: 14,
         mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     var map = new google.maps.Map(document.getElementById('map'), mapOptions);

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(initialLocation);
             getEvents(map);
         });
     }
}

function getEvents(map) {
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/events")
    ref.on('child_added', function(snapshot){
        var event = snapshot.val();
        console.log(event);
        var lat = event.lat;
        var lon = event.lon;
        var coords = {lat: lat, lng: lon};
        var name = event.name;
        var eventMarker = new google.maps.Marker({
            position: coords,
            map: map,
            title: name
        });
        eventMarker.setMap(map);
    })
}