//var newRef = new Firebase("https://commonplaceapp.firebaseio.com/users");
//            var authData = newRef.getAuth();
//            console.log(authData);
//            var refCheck = newRef.orderByChild("id").once("value", function(snapshot) {
//                var udata = snapshot.val();
//                var ukey = snapshot.key();
//                var dfjkvd = newRef.child(ukey);
//                var exists = false;
//                console.log(snapshot.key());
//                console.log(me.id);
//                //console.log(udata);
//                console.log(udata.id);
//                var obj = {};
//                var fullname = me.raw.name;
//                var splitname = fullname.split("");
//                var avatar = me.raw.profile_image_url;
//                var alias = me.raw.screen_name;
////                var email = me.email;
//                var firstname = splitname[0];
//                var lastname = splitname[splitname.length - 1];
//                var bio = me.raw.description;
//                var birthday = me.birthday;
//                var country = me.raw.location;
//                var city = me.raw.location;
//                //logic checks to see if vars are undefined. if yeh, blank
//                obj["profilepic"] = avatar;
//                obj["alias"] = alias;
////                obj["email"] = email;
//                obj["firstname"] = firstname;
//                obj["lastname"] = lastname;
//                obj["bio"] = bio;
//                obj["birthday"] = birthday;
//                if(obj["birthday"] === undefined) {
//                    obj["birthday"] = "";
//                }
//                obj["country"] = country;
//                obj["town"] = city;
//                console.log(obj);
//                if (me.id == udata.id) {
//                    console.log("found matching id...");
//                    dfjkvd.update(obj);
//                    window.location = "map.html";
//                } else {
//                    console.log("can't find id...");
//                    console.log("pushing data!");
//                    newRef.push(obj);
//                    window.location = "map.html";

function twitterLogin() {
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