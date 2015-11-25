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
    
if (me.raw.id_str === udata.raw.id_str) {
    
    console.log("found matching id...");
    exists = true;
    console.log(exists);
    console.log("there can be only one!");
    dfjkvd.update({bio: me.bio});
}
else {
    console.log("can't find id...");
    console.log(me.id_str);
    console.log(udata.id_str);
    exists = false;
    console.log(exists);
    console.log("pushing data!");
    newRef.push(me);
}
    
})
}).fail(function(err) {
//todo when the OAuth flow failed
alert("Twitter login failed, Please try again");
});    
//end of successful auth     
}).fail(function(err) {
//todo when the OAuth flow failed
})

//Redict function goes here
//redirect();

};