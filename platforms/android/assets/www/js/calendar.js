function addEventCalendar(eventdatestart, eventdateend, eventname, eventcoords, eventdetails) {
    var title = eventname;
    var eventLocation = eventcoords;
    var notes = eventdetails;
    var startDate = eventdatestart;
    var endDate = eventdateend;
    console.log(startDate + " + " + endDate);
    startDate = startDate.split("/"); //split into array by removing /
    var startDateObject = new Date(startDate[2], startDate[1] - 1, startDate[0]);
    console.log(startDateObject);
    endDate = endDate.split("/"); //split into array by removing /
    var endDateObject = new Date(endDate[2], endDate[1] - 1, endDate[0]);
    console.log(endDateObject);
    var success = function(message) { alert("Success: " + JSON.stringify(message)); };
    var error = function(message) { alert("Error: " + message); };

    // create an event silently (on Android < 4 an interactive dialog is shown)
    window.plugins.calendar.createEvent(title,eventLocation,notes,startDateObject,endDateObject,success,error);
}
//
//function deleteEvent(startDate, endDate, destination) {
//    var title = "International Alert Trip: " + destination;
////    var success = function(message) { alert("Success: " + JSON.stringify(message)); };
////    var error = function(message) { alert("Error: " + message); };
//    //    console.log(title);
//    //    console.log(startDate);
//    //    console.log(endDate);
//    //    console.log(destination);
//    //    console.log(eventLocation);
//    //    // delete an event (you can pass nulls for irrelevant parameters, note that on Android `notes` is ignored). The dates are mandatory and represent a date range to delete events in.
//    //    // note that on iOS there is a bug where the timespan must not be larger than 4 years, see issue 102 for details.. call this method multiple times if need be
//    //    // since 4.3.0 you can match events starting with a prefix title, so if your event title is 'My app - cool event' then 'My app -' will match.
//    window.plugins.calendar.deleteEvent(title,destination,null,startDate,endDate);
//}