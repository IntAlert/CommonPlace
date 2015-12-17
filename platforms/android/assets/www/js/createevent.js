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
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

function validateForm() {
    if(document.addEvent.eventname.value === "") {
        alert("Please enter an name for this event");
        document.addEvent.eventname.focus();
        return false;
    }
    if(document.addEvent.eventdetails.value === "") {
        alert("Please enter some details for this event");
        document.addEvent.eventdetails.focus();
        return false;
    }
    if(document.addEvent.eventdatestart.value === "") {
        alert("Please enter a start date for this event");
        document.addEvent.eventdatestart.focus();
        return false;
    }
    if(document.addEvent.eventdateend.value === "") {
        alert("Please enter an end date for this event");
        document.addEvent.eventdateend.focus();
        return false;
    }
    if(document.addEvent.eventwebsite.value === "") {
        alert("Please enter a website for this event");
        document.addEvent.eventwebsite.focus();
        return false;
    }
    if(document.addEvent.eventcontact.value === "") {
        alert("Please enter a contact email for this event");
        document.addEvent.eventcontact.focus();
        return false;
    }
    if(document.addEvent.eventimage.value === "") {
        alert("Please choose an image for this event");
        document.addEvent.eventimage.focus();
        return false;
    }
    if(document.addEvent.eventlat.value === "") {
        alert("Please enter a lat value for this event");
        document.addEvent.eventlat.focus();
        return false;
    }
    if(document.addEvent.eventlon.value === "") {
        alert("Please enter a lon value for this event");
        document.addEvent.eventlon.focus();
        return false;
    }
    //once validated, continue as normal
    imageUpload();
}