cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
        "id": "cordova-plugin-calendar.Calendar",
        "clobbers": [
            "Calendar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-calendar/test/tests.js",
        "id": "cordova-plugin-calendar.tests"
    },
    {
        "file": "plugins/phonegap-plugin-push/www/push.js",
        "id": "phonegap-plugin-push.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-geolocation": "1.0.1",
    "cordova-plugin-calendar": "4.4.4",
    "phonegap-plugin-push": "1.4.4"
}
// BOTTOM OF METADATA
});