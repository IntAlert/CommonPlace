/**
 * jTinder initialization
 */
function initJT(){
    console.log("resetting");
    $("#tinderslide").jTinder({
        // dislike callback
        onDislike: function (item) {
            console.log('Dont follow ' + (item.index()+1));
            if(item.index()+1 === 1) {
                getMoreProfiles();
            }
        },
        // like callback
        onLike: function (item) {
            console.log('Follow ' + (item.index()+1));
            if(item.index()+1 === 1) {
                getMoreProfiles();
            }
        },
        animationRevertSpeed: 200,
        animationSpeed: 400,
        threshold: 1,
        likeSelector: '.like',
        dislikeSelector: '.dislike'
    });
}

////////// MAIN CODE //////////
var count = 1;
var profilekey = "";
initJT();
getProfilesInit();

function getProfilesInit() {
    //CONNECT TO FIREBASE PROFILES BRANCH
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/users");
    ref.orderByKey().limitToFirst(10).on('child_added', function(snapshot){
        var profile = snapshot.val();
        profilekey = snapshot.key();
        console.log("PROFILE " + profilekey);
        var firstname = profile.firstname;
        var location = profile.town + ", " + profile.country;
        var interests = profile.interests;
        var image = profile.profilepic;
        
        var pImg = "#p" + count + "img";
        $(pImg).html("<img src='" + image + "' height='450px'>");
        var pName = "#p" + count + "info";
        $(pName).html(firstname + " - " + location);
        count = count + 1;
        console.log("count: " + count);
    });
}

function getMoreProfiles() {
    console.log("here");
    var count = 0;
    $("#panelist").remove();
    console.log("emptied");
    $("#tinderslide").append('<ul id="panelist"></ul>');
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/users");
    ref.orderByKey().startAt(profilekey).limitToFirst(11).on('child_added', function(snapshot){
        var profile = snapshot.val();
        profilekey = snapshot.key();
        console.log("PROFILE " + profilekey);
        if (count === 0) {
            console.log("ignoring");
            count = count + 1;
            console.log("count: " + count);
        } else {
            var firstname = profile.firstname;
            var location = profile.town + ", " + profile.country;
            var interests = profile.interests;
            var image = profile.profilepic;
            
            var divtag = '<li class="panexxx"><div class="img" id="pxxximg"></div><div id="pxxxinfo"></div><div class="like"></div><div class="dislike"></div></li>';
            divtag = divtag.replace(/xxx/g,count);
            $("#panelist").append(divtag);
            var pImg = "#p" + count + "img";
            $(pImg).html("<img src='" + image + "' height='450px'>");
            var pName = "#p" + count + "info";
            $(pName).html(firstname + " - " + location);
            count = count + 1;
            console.log("count: " + count);
            initJT();
        }
    });
}