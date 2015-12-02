/**
 * jTinder initialization
 */
$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
        console.log('Dislike image ' + (item.index()+1));
    },
	// like callback
    onLike: function (item) {
	    // set the status text
        console.log('Like image ' + (item.index()+1));
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
getProfiles();

function getProfiles() {
    //CONNECT TO FIREBASE PROFILES BRANCH
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/users");
    ref.on('child_added', function(snapshot){
        var profile = snapshot.val();
        var profilekey = snapshot.key();
        console.log("PROFILE " + profilekey);
        var firstname = profile.firstname;
//        var lastname = profile.lastname; //LAST NAME PROBABLY ISNT NEEDED ON THIS SCREEN?
//        var fullname = firstname + " " + lastname;
        var location = profile.town + ", " + profile.country;
        var interests = profile.interests;
        var image = profile.profilepic;
    })
    //PULL DATA IN GROUPS OF 5
    //PUSH INTO ARRAY
    //PUSH INTO PANES
    //REPEAT USING WHERE FIREBASE LEFT OF (BEGIN AT?)
}