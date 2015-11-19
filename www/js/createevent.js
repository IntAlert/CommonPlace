function eventCreate(image) {
    //GATHER FORM DATA INTO VARS
    var user = localStorage.getItem("uid");
    var eventimage = image;
    var eventname = document.getElementById("eventname").value;
    var eventdetails = document.getElementById("eventdetails").value;
    var eventwebsite = document.getElementById("eventwebsite").value;
    var eventlat = document.getElementById("eventlat").value;
    var eventlon = document.getElementById("eventlon").value;
    
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/");
    var eventRef = ref.child("events");
    var newEventRef = eventRef.push({
        name: eventname,
        details: eventdetails,
        image: eventimage,
        lat: eventlat,
        lon: eventlon,
        website: eventwebsite,
        uid: user
    });
}

function imageUpload() {
    var file    = document.querySelector("input[type=file]").files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        console.log(reader.result);
        var eventimage = reader.result;
        eventCreate(eventimage);
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}