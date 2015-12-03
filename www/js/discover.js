/**
 * jTinder initialization
 */
function initJT(){
    console.log("resetting");
    $("#tinderslide").jTinder({
        // dislike callback
        onDislike: function (item) {
            // set the status text
            console.log('Dont follow ' + (item.index()+1));
            if(item.index()+1 === 1) {
                getMoreProfiles();
//                initJT();
            }
            //load extra profile
        },
        // like callback
        onLike: function (item) {
            // set the status text
            console.log('Follow ' + (item.index()+1));
            console.log(item);
            if(item.index()+1 === 1) {
                getMoreProfiles();
                initJT();
            }
            //load extra profile
        },
        animationRevertSpeed: 200,
        animationSpeed: 400,
        threshold: 1,
        likeSelector: '.like',
        dislikeSelector: '.dislike'
    });
}

    /**
     * Set button action to trigger jTinder like & dislike.
     */
    $('.actions .like, .actions .dislike').click(function(e){
        e.preventDefault();
        $("#tinderslide").jTinder($(this).attr('class'));
    });


////////// MAIN CODE //////////
var count = 1;
var profilekey = "";
initJT();
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

function getMoreProfiles() {
    console.log("here");
    var count = 0;
    $("#panelist").remove();
//    $("#tinderslide").remove();
    console.log("emptied");
//    $("#wrap").append('<div id="tinderslide"></div>')
    $("#tinderslide").append('<ul id="panelist"></ul>');
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/users");
    ref.orderByKey().startAt(profilekey).limitToFirst(6).on('child_added', function(snapshot){
        console.log("-----MORE PROFILES-----");
        var profile = snapshot.val();
        profilekey = snapshot.key();
        console.log("PROFILE " + profilekey);
        if (count === 0) {
            console.log("ignoring");
            count = count + 1;
            console.log("count: " + count);
        } else {
            var firstname = profile.firstname;
            console.log(firstname);
            var location = profile.town + ", " + profile.country;
            var interests = profile.interests;
            var image = profile.profilepic;
            
            
            var divtag = '<li class="panexxx"><div class="img" id="pxxximg"></div><div id="pxxxinfo"></div><div class="like"></div><div class="dislike"></div></li>';
            divtag = divtag.replace(/xxx/g,count);
            $("#panelist").append(divtag);
//            console.log("div: " + divtag);
            var pImg = "#p" + count + "img";
            $(pImg).html("<img src='" + image + "' height='450px'>");
            var pName = "#p" + count + "info";
            $(pName).html(firstname + " - " + location);
//            console.log("set pane");
            count = count + 1;
            console.log("count: " + count);
        }
    }, initJT());
}