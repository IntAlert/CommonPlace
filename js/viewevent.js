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
        var eventimage = newEvent.image;
        var eventdatestart = newEvent.datestart;
        var eventdateend = newEvent.dateend;
        var eventdetails = newEvent.details;
        var eventlat = newEvent.lat;
        var eventlon = newEvent.lon;
        var eventcoords = eventlat + "," + eventlon;
        var eventinterested = newEvent.interested;
        interestedButton(eventkey);
        document.getElementById("eventname").innerHTML = eventname;
        document.getElementById("eventimage").src = eventimage;
        document.getElementById("eventdates").innerHTML = "<b>When: </b>" + eventdatestart + " - " + eventdateend;
        document.getElementById("eventdetails").innerHTML = "<b>Details: </b>" + eventdetails;
        document.getElementById("eventcoords").innerHTML = "<b>Coordinates: </b>" + eventcoords;
        document.getElementById("eventinterested").innerHTML = "<b>Interested: </b>" + eventinterested;
    }, function(errorObject) {
        console.log("Read fail: " + errorObject.code);
    });
}

function previousLocation() {
    var prevloc = localStorage.getItem("prevloc");
    console.log("Previous Location: " + prevloc);
    window.location.href = prevloc;
}

function addInterested() {
    var eventkey = localStorage.getItem("eventkey");
    console.log(eventkey);
    var user = localStorage.getItem("uid");
    console.log("LOCALSTORAGE: " + user);
    var fb = "https://commonplaceapp.firebaseio.com/users/" + user + "/events/";
    console.log(fb);
    var ref = new Firebase(fb);
    ref.once("value", function(snapshot) {
        var exists = snapshot.child(eventkey).exists();
        console.log(exists);
        if(exists === true) {
            ref.child(eventkey).remove();
            document.getElementById("buttonInterested").innerHTML = "Interested";
            //if it exists already, remove and set button to add to interested
        } else {
            //it doesnt exist. add to fb and set button to not interested
            ref.child(eventkey).set('true');
            document.getElementById("buttonInterested").innerHTML = "Not Interested";
        }
    });
}

function interestedButton(eventkey) {
    var user = localStorage.getItem("uid");
    var fb = "https://commonplaceapp.firebaseio.com/users/" + user + "/events/";
    var ref2 = new Firebase(fb);
    ref2.once("value", function(snapshot) {
        var exists = snapshot.child(eventkey).exists();
        console.log(exists);
        if(exists === true) {
            //if it exists already, remove and set button to add to interested
            console.log("button should say 'Not Interested'");
            document.getElementById("buttonInterested").innerHTML = "Not Interested";
        } else {
            //it doesnt exist. add to fb and set button to not interested
            console.log("button should say 'Interested'");
            document.getElementById("buttonInterested").innerHTML = "Interested";
        }
    });
}