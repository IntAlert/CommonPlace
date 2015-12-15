var user = localStorage.getItem("uid");
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
    getFollowing(link);
}

function getEvents(link) {
    var eventTable = "<table><tr>";
    var eventlink = link + "/events";
//    console.log("events link : " + eventlink);
    var ref = new Firebase(eventlink);
    ref.on("child_added", function(snapshot) {
        var eventkey = snapshot.key();
//        console.log("Event Key: " + eventkey);
        //take each event key
        //connect to firebase with new ref - events table
        var ref2 = new Firebase("https://commonplaceapp.firebaseio.com/events/" + eventkey);
        //match key up with event in firebase
        //pull info down + display
        ref2.on("value", function(snapshot) {
            var eventObject = snapshot.val();
            var eventimage = eventObject.image;
            var eventname = eventObject.name;
            var eventdetails = eventObject.details;
            var eventwebsite = eventObject.website;
            var eventcontact = eventObject.contactdetails;
//            console.log("SNAP: " + eventname);
            eventTable = eventTable + "<td><img class='eventimage' src='" + eventimage + "' alt='unable to load image'></td><td><p class='eventname'><b>" + eventname + "</b></p><p class='eventdetails'>" + eventdetails + "</p><p>Website: <a href='" + eventwebsite + "' class='eventwebsite'>" + eventwebsite + "</a></p><p>Contact: <a href='mailto:" + eventcontact + "' class='eventcontact'>" + eventcontact + "</a></p><button class='buttonViewEvent' type='button' onclick='viewEvent(" + "&#39;" + eventkey + "&#39;" + ")'>View Event Page</button><button class='buttonRemoveEvent' type='button' onclick='removeEvent(" + "&#39;" + eventkey + "&#39;" + ")'>Remove Event</button></td></tr>";
            document.getElementById("eventtable").innerHTML = eventTable;
        });
    });
}

function getFollowing(link) {
    var followingLink = link + "/following"; //craft following link
    var ref = new Firebase(followingLink); //connect to firebase
    ref.on("child_added", function(snapshot) {
        var followingkey = snapshot.key(); //pull keys
//        console.log("following: " + followingkey);
        var ref2 = new Firebase("https://commonplaceapp.firebaseio.com/users/" + followingkey); //connect to new firebase with userkey
        ref2.on("value", function(snapshot) {
            var userObject = snapshot.val(); //pull record
            var profilepic = userObject.profilepic; //extract profilepic
            var fullname = userObject.firstname + " " + userObject.lastname;
            $("#following").append("<img class='followingpic' src='" + profilepic + "' title='" + fullname + "' alt='Unable to load image' onclick='viewUser(\"" + followingkey + "\");'>"); //embed into following
        });
    });
}

function viewUser(key) {
//    console.log("KEY: " + key);
    localStorage.setItem("viewprofileid", key);
    window.location = "viewprofile.html";
}

function viewEvent(eventkey) {
    localStorage.setItem("eventkey", eventkey);
    localStorage.setItem("prevloc", "profile.html"); //save map.html to previous location (also add GPS coords to center map)
    window.location.href = "viewevent.html";
}

function removeEvent(eventkey) {
//    Button that removes event from list and then forces a repull of info to instantly update without refreshing page
    var eventkey = eventkey;
//    console.log("KEY: " + eventkey + " + UID: " + user);
    var fb = "https://commonplaceapp.firebaseio.com/users/" + user + "/events/";
//    console.log("FB: " + fb);
    var ref = new Firebase(fb);
    ref.once("value", function(snapshot) {
        var eventCount = snapshot.numChildren(); //Get number of events in list
//        console.log(eventCount);
        if(eventCount > 1) {
//            console.log("remove event");
            ref.child(eventkey).remove();
            var link = "https://commonplaceapp.firebaseio.com/users/" + user;
            getEvents(link);
        } else {
            ref.child(eventkey).remove();
            document.getElementById("eventtable").innerHTML = "<p>You do not have any events in your list</p>";
        }
    });
}

function editProfile() {
    window.location = "editprofile.html";
}