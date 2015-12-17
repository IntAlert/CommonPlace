// ***** PUSH NOTIFICATION INIT ***** \\
document.addEventListener("deviceready", init, false);

function init() {
    // Now safe to use device APIs
    var push = PushNotification.init({ "android": {"senderID": "331361199003"},
         "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

    push.on('registration', function(data) {
        console.log("registered");
        console.log(data.registrationId);
    });

    push.on('notification', function(data) {
        console.log("notification: ");
         console.log(data.message);
         console.log(data.title);
         console.log(data.count);
         console.log(data.sound);
         console.log(data.image);
         console.log(data.additionalData);
    });
}


// ***** BEGIN CODE ***** \\
function login() {
    var email = document.getElementById("txtEmail").value;
    var password = document.getElementById("txtPass").value;
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("email", email);
    }
    if (email === "") {
        alert("Please enter you email");
        return;
    } else if (password === "") {
        alert("Please enter you password");
        return;
    } else {
        var ref = new Firebase("https://commonplaceapp.firebaseio.com");
        ref.authWithPassword({
            email    : email,
            password : password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem("uid", authData.uid);
                window.location = "map.html";
            }
        });
    }
}

function newuser() {
    var newRef = new Firebase("https://commonplaceapp.firebaseio.com/users");
    var obj = {};
    var uemail = document.getElementById("txtEmail").value;
    var pass = document.getElementById("txtPass").value;
//    console.log(uemail);
    obj["email"] = uemail;
    
    ref.createUser({
        email    : uemail,
        password : pass
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account");
            newRef.push(obj);
        }
        console.log(ref.createUser);
    });
}