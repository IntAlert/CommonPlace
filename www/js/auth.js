// Create a callback which logs the current auth state
function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        console.log("User is logged out");
        window.location = "index.html";
    }
}

// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://commonplaceapp.firebaseio.com");
ref.onAuth(authDataCallback);

// Unauth user
function logout() {
    console.log("LOGGING OUT");
    ref.unauth();
}