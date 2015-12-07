document.addEventListener("deviceready", init, false);

function init() {
    // Now safe to use device APIs
    var push = PushNotification.init({ "android": {"senderID": "331361199003"},
         "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

    push.on('registration', function(data) {
        console.log("registered");
        console.log(data.registrationId);
//        window.location = "map.html";
    });

    push.on('notification', function(data) {
        console.log("notification: ");
         console.log(data.message);
         console.log(data.title);
         console.log(data.count);
         console.log(data.sound);
         console.log(data.image);
         console.log(data.additionalData);
//        window.location = "map.html";
    });
//    window.location = "map.html";
}