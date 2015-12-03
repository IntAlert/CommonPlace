
var ref = new Firebase("https://commonplaceapp.firebaseio.com");

function login() {
    alert("Hello");
var email = document.getElementById("txtEmail").value;
var password = document.getElementById("txtPass").value;
    
if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem("email", email);
}
    alert("I'm here");
    console.log(sessionStorage);
if (email === "") {
    alert("Please enter you email")
    return;
} else {
    if (password === "") {
        alert("Please enter you password")
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
//                window.location.assign("profile.html")
            }
        });
    }
}
    
}
    

var ref = new Firebase("https://commonplaceapp.firebaseio.com");
function newuser() {
var newRef = new Firebase("https://commonplaceapp.firebaseio.com/users");

var obj = {};
    
var uemail = document.getElementById("txtEmail").value;
var pass = document.getElementById("txtPass").value;

//obj["email"] = uemail;
    console.log(uemail);
    
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
    console.log(ref.createUser)
});
}