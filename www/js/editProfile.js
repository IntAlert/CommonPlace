var ref = "https://cdn.firebase.com/js/client/2.0.4/firebase.js";

//JQuery to allow users to edit form fields
$(document).ready(function(){
    $(".editlink").on("click", function(e){
        e.preventDefault();
        var dataset = $(this).prev(".datainfo");
		var savebtn = $(this).next(".savebtn");
		var theid   = dataset.attr("id");
		var newid   = theid + "-form";
        console.log("newid " + newid)
		var currval = dataset.text(); //'currval' --> 'current value' (I always forget what this means)
		dataset.empty();
        console.log("currval " + currval)
        $('<input type= "text" name= "' + newid + '" id="' + newid + '" value="' + currval + '" class= "hlite">').appendTo(dataset);
        $('<input type="text" name="'+newid+'" id="'+newid+'" value="'+currval+'" class="hlite">').appendTo(dataset);
		$(this).css("display", "none");
		savebtn.css("display", "block");
    });
    
    $(".savebtn").on("click", function(e){
        console.log("saving");
        e.preventDefault();
        var elink   = $(this).prev(".editlink");
		var dataset = elink.prev(".datainfo");
		var newid   = dataset.attr("id");
//		var cinput  = "#" + newid + "-form";
        var cinput  = newid + "-form";
		var einput  = $(newid);
//		var newval  = $(einput).attr("value");  
        var newval = document.getElementById(cinput).value;
        console.log(einput);
        console.log("einput" + einput.value)
        console.log("newval = " + newval)
		var cinput  = "#"+newid+"-form";
		var einput  = $(cinput);
		var newval  = einput.attr("value");
		$(this).css("display", "none");
		einput.remove();
		dataset.html(newval);
		elink.css("display", "block");
    });
});

function populateForm() {
    var email = sessionStorage.getItem("email");
    console.log(sessionStorage);
    var newRef = new Firebase("https://commonplaceapp.firebaseio.com/users");
    var refCheck = newRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {   
        var udata = snapshot.val();
        var ukey = snapshot.key();
        var dfjkvd = newRef.child(ukey);   
        console.log(ukey);
        document.getElementById("thelastairbender").innerHTML = udata.profilepic;
        document.getElementById("username").innerHTML = udata.alias;
        document.getElementById("pemail").innerHTML = email;
        document.getElementById("firstname").innerHTML = udata.firstname;
        document.getElementById("lastname").innerHTML = udata.lastname; 
        document.getElementById("bio").innerHTML = udata.bio;   
        document.getElementById("interests").innerHTML = udata.interests;
        document.getElementById("birthday").innerHTML = udata.birthday; 
        document.getElementById("country").innerHTML = udata.country; 
        document.getElementById("citytown").innerHTML = udata.town; 
    });
}

function submitForm() {
    $("input[type='file']").each(function(){
        if($(this).val().length == 0){
            //file not chosen
            console.log("submit form");
            saveForm();
        } else {
            //file chosen
            console.log("uploading image");
        if($(this).val().length === 0){
            //file not chosen
            saveForm();
        } else {
            //file chosen
            imageUpload();
        }
    });
}

function imageUpload() {
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();
    console.log("uploading image");
    reader.onloadend = function () {
        var image = reader.result;
        console.log("image");
        saveForm(image);
    };
    if (file) {
        reader.readAsDataURL(file);
    }    
}

function saveForm(image) {
    console.log("saving form")
    var newRef = new Firebase("https://commonplaceapp.firebaseio.com/users");
    var refCheck = newRef.orderByChild("id").on("child_added", function(snapshot) {
        var obj = {};
        var udata = snapshot.val();
        var ukey = snapshot.key();
        var dfjkvd = newRef.child(ukey);
        var exists = false;
        //Grab data from form
        var avatar = image;  //                                                __
        var alias = document.getElementById("username").innerHTML; //            |
        var email = document.getElementById("pemail").innerHTML; //              |
        var firstname = document.getElementById("firstname").innerHTML; //       |
        var lastname = document.getElementById("lastname").innerHTML; //         |
        var bio = document.getElementById("bio").innerHTML; //                    > It may be time-consuming, but it's a necessary evil
        var interests = document.getElementById("interests").innerHTML; //       |
        var birthday = document.getElementById("birthday").innerHTML; //         |
        var country = document.getElementById("country").innerHTML; //           |
        var city = document.getElementById("citytown").innerHTML; //           --
        var avatar = image;
        var alias = document.getElementById("username").innerHTML;
        var email = document.getElementById("pemail").innerHTML;
        var firstname = document.getElementById("firstname").innerHTML;
        var lastname = document.getElementById("lastname").innerHTML;
        var bio = document.getElementById("bio").innerHTML;
        var interests = document.getElementById("interests").innerHTML;
        var birthday = document.getElementById("birthday").innerHTML;
        var country = document.getElementById("country").innerHTML;
        var city = document.getElementById("citytown").innerHTML;
        //Populate object with form data
        obj["profilepic"] = avatar;
        obj["alias"] = alias;
        obj["email"] = email;
        obj["first_name"] = firstname;
        obj["last_name"] = lastname;
        obj["bio"] = bio;
        obj["interests"] = interests;
        obj["birthday"] = birthday;
        obj["country"] = country;
        obj["town"] = city;
        console.log(ukey);
        if (email == udata.email) {
            console.log("found matching email...");
            exists = true;
            console.log(exists);
            console.log("there can be only one!");
            if (obj == "undefined") {
                obj = "";
            }
            dfjkvd.update(obj);
        }
    });
}

function cancel(){
    window.location = "profile.html";
}