/**
 * jTinder initialization
 */
$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
        console.log('Dont follow ' + (item.index()+1));
        //load extra profile
    },
	// like callback
    onLike: function (item) {
	    // set the status text
        console.log('Follow ' + (item.index()+1));
        console.log(item);
        //load extra profile
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#tinderslide").jTinder($(this).attr('class'));
});


////////// MAIN CODE //////////
var count = 1;
getProfilesInit();

function getProfilesInit() {
    //CONNECT TO FIREBASE PROFILES BRANCH
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/users");
    ref.orderByKey().limitToFirst(5).on('child_added', function(snapshot){
        console.log("----------");
        var profile = snapshot.val();
        profilekey = snapshot.key();
        console.log("PROFILE " + profilekey);
        var firstname = profile.firstname;
        console.log(firstname);
//        var lastname = profile.lastname; //LAST NAME PROBABLY ISNT NEEDED ON THIS SCREEN?
//        var fullname = firstname + " " + lastname;
        var location = profile.town + ", " + profile.country;
        var interests = profile.interests;
        var image = profile.profilepic;
        
        var pImg = "#p" + count + "img";
        $(pImg).html("<img src='" + image + "' height='450px'>");
        var pName = "#p" + count + "info";
        $(pName).html(firstname + " - " + location);
        console.log("set pane");
        count = count + 1;
        console.log("count: " + count);
    });
    //PUSH INTO ARRAY
    //PUSH INTO PANES
    //REPEAT USING WHERE FIREBASE LEFT OF (BEGIN AT?)
}