function twitterLogin() {
    document.getElementById("login").innerHTML = "<div class='loading' id='loading'><img class='loadinggif' src='images/loading.gif'><div class='loadingtext'>LOGGING IN</div></div>";
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/users");
    ref.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            var uid = authData.uid;
            var fullname = authData.twitter.displayName;
            var splitname = fullname.split(" ");
            var firstname = splitname[0];
            var lastname = splitname[splitname.length - 1];
            
            console.log("Authenticated successfully with payload:", authData);
            
            var userRef = ref.child(uid);
            userRef.set({
                'firstname': firstname,
                'lastname': lastname,
                'profilepic': authData.twitter.profileImageURL,
                'provider': authData.provider,
                'username': authData.twitter.id
            }, function(){
                localStorage.setItem("uid", authData.uid);
                window.location = "map.html";
            });
        }
    });
}