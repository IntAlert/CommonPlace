var ref = new Firebase("https://commonplaceapp.firebaseio.com");

//function redirect() {
//    window.location="profile.html"
//}
OAuth.initialize('H9No8xKO8a_UgKcl87XCFwTKSM4');
console.log("Beginning authentication...");
function authMe() {
    //Example with Twitter with the cache option enabled
    OAuth.popup('twitter', {cache: true}).done(function(twitter) {
        //make API calls with `twitter`
        console.log("You're logged in to twitter. Congrats");
        res = OAuth.create('twitter');
        res.me().done(function(me) {
            alert('Hello ' + me.name);
            console.log(me);
            var newRef = new Firebase("https://commonplaceapp.firebaseio.com/users");
            var refCheck = newRef.orderByChild("id").on("child_added", function(snapshot) {
                var udata = snapshot.val();
                var ukey = snapshot.key();
                var dfjkvd = newRef.child(ukey);
                var exists = false;
                console.log(snapshot.key());
                console.log(me.id);
                //console.log(udata);
                console.log(udata.id);
                console.log(me.raw.id_str);
                console.log(udata.raw.id_str);
                var obj = {};
                var fullname = me.raw.name;
                var splitname = fullname.split("");
                var avatar = me.raw.profile_url;
                var alias = me.raw.screen_name;
                var email = me.email;
                var firstname = splitname[0];
                var lastname = splitname[splitname.length - 1];
                var bio = me.raw.description;
                var birthday = me.birthday;
                var country = me.raw.location;
                var city = me.raw.location;
                obj["profilepic"] = avatar;
                obj["alias"] = alias;
                obj["email"] = email;
                obj["firstname"] = firstname;
                obj["lastname"] = lastname;
                obj["bio"] = bio;
                obj["birthday"] = birthday;
                obj["country"] = country;
                obj["town"] = city;
                console.log(obj);
                if (email == udata.email) {
                    console.log("found matching email...");
                    exists = true;
                    if (obj == "undefined") {
                        obj = "";
                    }
                    dfjkvd.update(obj);
                } else {
                    console.log("can't find email...");
                    console.log(email);
                    exists = false;
                    console.log(exists);
                    console.log("pushing data!");
                    newRef.push(obj);
                }
            });
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