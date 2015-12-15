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

function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    console.log("Geo Lat: " + position.coords.latitude);
    console.log("Geo Lon: " + position.coords.longitude);
}

function onError(error) {
    console.log("Error");
}

function getName(authData) {
    switch(authData.provider) {
        case 'password':
            return authData.password.email.replace(/@.*/, '');
        case 'twitter':
            return authData.twitter.displayName;
        case 'facebook':
            return authData.facebook.displayName;
    }
}

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
        var interested = "";
        var event = snapshot.val();
        var eventkey = snapshot.key();
//        console.log("KEY" + eventkey);
//        console.log(event);
        var user = localStorage.getItem("uid");
        var fb = "https://commonplaceapp.firebaseio.com/users/" + user + "/events/";
        var ref2 = new Firebase(fb);
        ref2.once("value", function(snapshot) {
            var exists = snapshot.child(eventkey).exists();
            if(exists === true) {
                //if it exists already, remove and set button to add to interested
                document.getElementById("buttonInterested").value = "Not Interested";
            } else {
                //it doesnt exist. add to fb and set button to not interested
                document.getElementById("buttonInterested").value = "Interested";
            }
        });
        var lat = parseFloat(event.lat);
        var lon = parseFloat(event.lon);
        var coords = {lat: lat, lng: lon};
        var name = event.name;
        var details = event.details;
        var datestart = event.datestart;
        var dateend = event.dateend;
        var website = event.website;
        var contactdetails = event.contactdetails;
        var eventMarker = new google.maps.Marker({
            position: coords,
            map: map,
            title: name
        });
        eventMarker.setMap(map);
        
        var contentString = '<h3><center>' + name + '</center></h3><hr>' + 
            '<p><b>Date: </b>' + datestart + ' - ' + dateend + '</p>' + 
            '<p><b>Details: </b>' + details + '</p>' + 
            '<p><b>Contact: </b><a href="mailto:' + contactdetails + '">' + contactdetails + '</a></p>' +
            '<p><b>Website: </b><a href="' + website + '">' + website + '</a></p><hr>' +
            '<span class="infoWindowButtons"><button class="buttonInterested" id="buttonInterested" type="button" onclick="addInterested(' + '&#39;' + eventkey + '&#39;' + ')">Interested</button><button class="buttonViewEvent" type="button" onclick="viewEvent(' + '&#39;' + eventkey + '&#39;' + ')">View Event Page</button></span>';
        eventMarker.info = new google.maps.InfoWindow({
            content: contentString,
        });
        eventMarker.info.opened = false;
        eventMarker.addListener('click', function() {
                if(eventMarker.info.opened) {
                    eventMarker.info.close();
                    eventMarker.info.opened = false;
                } else {
                    //centre map on coords
                    map.setCenter(coords);
                    eventMarker.info.open(map, eventMarker);
                    eventMarker.info.opened = true;
                    //Set interested button
                    var user = localStorage.getItem("uid");
                    var fb = "https://commonplaceapp.firebaseio.com/users/" + user + "/events/";
                    var ref = new Firebase(fb);
                    ref.once("value", function(snapshot) {
                        var exists = snapshot.child(eventkey).exists();
                        if(exists === true) {
                            //if it exists already, remove and set button to add to interested
                            document.getElementById("buttonInterested").innerHTML = "Not Interested";
                        } else {
                            //it doesnt exist. add to fb and set button to not interested
                            document.getElementById("buttonInterested").innerHTML = "Interested";
                        }
                    });
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

function addInterested(eventkey) {
//    console.log(eventkey);
    var user = localStorage.getItem("uid");
//    console.log("LOCALSTORAGE: " + user);
    var fb = "https://commonplaceapp.firebaseio.com/users/" + user + "/events/";
//    console.log(fb);
    var ref = new Firebase(fb);
    ref.once("value", function(snapshot) {
        var exists = snapshot.child(eventkey).exists();
        if(exists === true) {
            ref.child(eventkey).remove();
            interestedTotal(eventkey, "remove");
            document.getElementById("buttonInterested").innerHTML = "Interested";
            //if it exists already, remove and set button to add to interested
        } else {
            //it doesnt exist. add to fb and set button to not interested
            ref.child(eventkey).set('true');
            interestedTotal(eventkey, "add");
            document.getElementById("buttonInterested").innerHTML = "Not Interested";
        }
    });
}

function interestedTotal(eventkey, method) {
    var method = method;
    var key = eventkey;
//    console.log(method);
    var fb = "https://commonplaceapp.firebaseio.com/events/" + key;
//    console.log(fb);
    var ref = new Firebase(fb);
    ref.once("value", function(snapshot) {
        var newEvent = snapshot.val();
        var interested = newEvent.interested;
//        console.log("interested old: " + interested);
        if(method === "add") {
            //total +1
            interested = interested + 1;
//            console.log("interested new: " + interested);
            ref.update({
                interested: interested
            });
        } else {
            //total -1
            interested = interested - 1;
//            console.log("interested new: " + interested);
            ref.update({
                interested: interested
            });
        }
    });
}

function viewEvent(eventkey) {
    localStorage.setItem("eventkey", eventkey);
    localStorage.setItem("prevloc", "map.html"); //save map.html to previous location (also add GPS coords to center map)
    window.location.href = "viewevent.html";
}