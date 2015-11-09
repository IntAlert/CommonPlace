var user = localStorage.getItem("uid");
console.log("USER ID: " + user);
getProfile();

function getProfile() {
    var link = "https://commonplaceapp.firebaseio.com/users/" + user;
    console.log(link);
    var ref = new Firebase(link);
    ref.on("value", function(snapshot) {
        var newEvent = snapshot.val();
        var fullname = newEvent.firstname + " " + newEvent.lastname;
        document.getElementById("fullname").innerHTML = fullname;
    })
}