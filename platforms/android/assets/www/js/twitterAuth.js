var ref = new Firebase("https://commonplaceapp.firebaseio.com");

//function redirect() {
//    window.location="profile.html"
//}
//OAuth.initialize('H9No8xKO8a_UgKcl87XCFwTKSM4');
console.log("Beginning authentication...");
function authMe() {
    OAuth.initialize('H9No8xKO8a_UgKcl87XCFwTKSM4');
    //Example with Twitter with the cache option enabled
    ref.authWithOAuthPopup('twitter', {cache: true}).done(function(twitter) {
//    OAuth.popup('twitter', {cache: true}).done(function(twitter) {
        //make API calls with `twitter`
        console.log("You're logged in to twitter. Congrats");
        res = OAuth.create('twitter');
        res.me().done(function(me) {
            alert('Hello ' + me.name);
            console.log(me);
            var newRef = new Firebase("https://commonplaceapp.firebaseio.com/users");
            var refCheck = newRef.orderByChild("id").once("value", function(snapshot) {
                var udata = snapshot.val();
                var ukey = snapshot.key();
                var dfjkvd = newRef.child(ukey);
                var exists = false;
                console.log(snapshot.key());
                console.log(me.id);
                //console.log(udata);
                console.log(udata.id);
                var obj = {};
                var fullname = me.raw.name;
                var splitname = fullname.split("");
                var avatar = me.raw.profile_image_url;
                var alias = me.raw.screen_name;
//                var email = me.email;
                var firstname = splitname[0];
                var lastname = splitname[splitname.length - 1];
                var bio = me.raw.description;
                var birthday = me.birthday;
                var country = me.raw.location;
                var city = me.raw.location;
                //logic checks to see if vars are undefined. if yeh, blank
                obj["profilepic"] = avatar;
                obj["alias"] = alias;
//                obj["email"] = email;
                obj["firstname"] = firstname;
                obj["lastname"] = lastname;
                obj["bio"] = bio;
                obj["birthday"] = birthday;
                if(obj["birthday"] === undefined) {
                    obj["birthday"] = "";
                }
                obj["country"] = country;
                obj["town"] = city;
                console.log(obj);
                if (me.id == udata.id) {
                    console.log("found matching id...");
                    dfjkvd.update(obj);
                    window.location = "map.html";
                } else {
                    console.log("can't find id...");
                    console.log("pushing data!");
                    newRef.push(obj);
                    window.location = "map.html";
                }
            });
            //redirect after login
//            window.location = "map.html";
            }).fail(function(err) {
            //todo when the OAuth flow failed
            alert("Twitter login failed, Please try again");
        });    
        //end of successful auth     
    }).fail(function(err) {
        //todo when the OAuth flow failed
    });
    //Redict function goes here
    //redirect();
}