var user = localStorage.getItem("uid");
console.log("USER ID: " + user);
getProfile();

function getProfile() {
    var link = "https://commonplaceapp.firebaseio.com/users/" + user;
    var ref = new Firebase(link);
    ref.on("value", function(snapshot) {
        var newEvent = snapshot.val();
        var profilepic = newEvent.profilepic;
        if (profilepic === undefined || null) { //IF INVALID THEN SET TO PLACEHOLDER
            profilepic = "images/profileplaceholder.png";
        }
        var fullname = newEvent.firstname + " " + newEvent.lastname;
        var location = newEvent.town + ", " + newEvent.country;
        var bio = newEvent.bio;
        var birthday = newEvent.birthday;
        var interests = newEvent.interests;
        document.getElementById("profilepic").src = profilepic;
        document.getElementById("fullname").innerHTML = fullname;
        document.getElementById("location").innerHTML = location;
        document.getElementById("bio").innerHTML = bio;
        document.getElementById("birthday").innerHTML = birthday;
        document.getElementById("interests").innerHTML = interests;
    });
    getEvents(link);
}

function getEvents(link) {
    var eventTable = "<table><tr>";
    var eventlink = link + "/events";
    console.log("events link : " + eventlink);
    var ref = new Firebase(eventlink);
    ref.on("child_added", function(snapshot) {
        var newEvent = snapshot.key();
        console.log("Event Key: " + newEvent);
        //take each event key
        //connect to firebase with new ref - events table
        var ref2 = new Firebase("https://commonplaceapp.firebaseio.com/events/" + newEvent);
        //match key up with event in firebase
        //pull info down + display
        ref2.on("value", function(snapshot) {
            var eventObject = snapshot.val();
            var eventimage = eventObject.image;
            var eventname = eventObject.name;
            var eventdetails = eventObject.details;
            console.log("SNAP: " + eventname);
            eventTable = eventTable + "<td><p class='eventname'><b>" + eventname + "</b></p><p class='eventdetails'>" + eventdetails + "</p></td></tr>";
            document.getElementById("eventtable").innerHTML = eventTable;
        });
    });
}