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
        getEvents();
    }
});

function initMap() {
    var mapOptions = {
         zoom: 14,
         mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     var map = new google.maps.Map(document.getElementById('map'),
     mapOptions);

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(initialLocation);
         });
     }
}

function getEvents() {
    //CONNECT TO FIREBASE
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/events")
    //PULL EVENT DATA BY KEY
    ref.on('child_added', function(snapshot){
        var event = snapshot.val();
        console.log(event);
    })
    //STORE INTO VARS
    //plotEvents();
}

//function plotEvents() {
//    //TAKE VARS
//    //CREATE MARKER BASED ON VARS
//    //CREATE INFOWINDOW FROM INFO
//}