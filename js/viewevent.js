getData();

function getData() {    
    //Pull fromlocal storage
    var eventText = "<table><tr>";
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/events");
    var eventkey = localStorage.getItem("eventkey");
    console.log(eventkey);
    ref.child(eventkey).on("value", function(snapshot) { //PULL ALL DATA FROM REPORTS TABLE
        var newEvent = snapshot.val();
        var eventname = newEvent.name;
        var eventdetails = newEvent.details;
        var eventlat = newEvent.lat;
        var eventlon = newEvent.lon;
        var eventcoords = eventlat + "," + eventlon;
        document.getElementById("eventname").innerHTML = eventname;
        document.getElementById("eventdetails").innerHTML = "<b>Details: </b>" + eventdetails;
        document.getElementById("eventcoords").innerHTML = "<b>Coordinates: </b>" + eventcoords;
    }, function(errorObject) {
        console.log("Read fail: " + errorObject.code);
    });
}

function previousLocation() {
    var prevloc = localStorage.getItem("prevloc");
    console.log("Previous Location: " + prevloc);
    window.location.href = prevloc;
}