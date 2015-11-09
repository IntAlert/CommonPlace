var user = localStorage.getItem("uid");
console.log("USER ID: " + user);







//
//function getData() {
//    var reportText = "<table><tr>";
//    var ref = new Firebase("https://fiery-fire-7313.firebaseio.com/reports");
//    ref.on("child_added", function(snapshot) { //PULL ALL DATA FROM REPORTS TABLE
//        var newReport = snapshot.val();
//        var coords = newReport.coords;
//        console.log(coords);
//        var imagestring = newReport.image;
//        var info = newReport.info;
//        var timestamp = newReport.timestamp;
//        //ONCE ALL DATA EXTRACTED, CONVERT IMAGE
//        convertImage(imagestring);
//        reportText = reportText + "<td>" + "<img class='reportImage' src='" + imagestring + "' alt='Unable to load image'></td><td><p class='info'><b>Info: </b>" + info + "</p><br><p class='timestamp'><b>Timestamp: </b>" + timestamp + "</p><p class='coords'><b>Coordinates: </b>" + coords + "</p></td></tr>";
//        document.getElementById("report").innerHTML = reportText;
//    }, function(errorObject) {
//        console.log("Read fail: " + errorObject.code);
//    });
//}