function eventCreate(image) {
    //GATHER FORM DATA INTO VARS
    var user = localStorage.getItem("uid");
    var eventimage = image;
    var eventname = document.getElementById("eventname").value;
    var eventdetails = document.getElementById("eventdetails").value;
    var eventdatestart = document.getElementById("eventdatestart").value; //returns as YYYY-MM-DD
    eventdatestart = eventdatestart.split("-"); //split into array by removing -
    eventdatestart = eventdatestart[2] + "/" + eventdatestart[1] + "/" + eventdatestart[0]; //rebuild into UK date format
    var eventdateend = document.getElementById("eventdateend").value; //same as above
    eventdateend = eventdateend.split("-");
    eventdateend = eventdateend[2] + "/" + eventdateend[1] + "/" + eventdateend[0];
    var eventcontact = document.getElementById("eventcontact").value;
    eventcontact = eventcontact.toLowerCase(); //make sure email is lowercased before pushing
    var eventwebsite = document.getElementById("eventwebsite").value;
    eventwebsite = eventwebsite.toLowerCase();
    var eventlat = document.getElementById("eventlat").value;
    var eventlon = document.getElementById("eventlon").value;
    
    var ref = new Firebase("https://commonplaceapp.firebaseio.com/");
    var eventRef = ref.child("events");
    var newEventRef = eventRef.push({
        name: eventname,
        contactdetails: eventcontact,
        details: eventdetails,
        datestart: eventdatestart,
        dateend: eventdateend,
        image: eventimage,
        interested: "0",
        lat: eventlat,
        lon: eventlon,
        website: eventwebsite,
        uid: user
    }, function(error) {
        if(error) {
            alert("Error: " + error);
        } else {
            alert("Event Created");
            location.reload();
        }
    });
}

function imageUpload() {
    document.getElementById("formsubmit").disabled = true;
    document.getElementById("formsubmit").value = "Please Wait";
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        console.log(reader.result);
        var eventimage = reader.result;
        eventCreate(eventimage);
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}