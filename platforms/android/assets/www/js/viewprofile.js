var user = localStorage.getItem("viewprofileid");
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
    getFollowing(link);
}

function getFollowing(link) {
    var followingLink = link + "/following"; //craft following link
    var ref = new Firebase(followingLink); //connect to firebase
    ref.on("child_added", function(snapshot) {
        var followingkey = snapshot.key(); //pull keys
        console.log("following: " + followingkey);
        var ref2 = new Firebase("https://commonplaceapp.firebaseio.com/users/" + followingkey); //connect to new firebase with userkey
        ref2.on("value", function(snapshot) {
            var userObject = snapshot.val(); //pull record
            var profilepic = userObject.profilepic; //extract profilepic
            var fullname = userObject.firstname + " " + userObject.lastname;
            $("#following").append("<img class='followingpic' src='" + profilepic + "' title='" + fullname + "' alt='Unable to load image'>"); //embed into following
        });
    });
}

function goBack() {
    window.location = "profile.html";
}