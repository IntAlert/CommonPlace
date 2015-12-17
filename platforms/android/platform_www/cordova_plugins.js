cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/com.oauthio.plugins.oauthio/dist/oauth.js",
        "id": "com.oauthio.plugins.oauthio.OAuth",
        "pluginId": "com.oauthio.plugins.oauthio",
        "merges": [
            "OAuth"
        ]
    },
    {
        "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
        "id": "cordova-plugin-calendar.Calendar",
        "pluginId": "cordova-plugin-calendar",
        "clobbers": [
            "Calendar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-calendar/test/tests.js",
        "id": "cordova-plugin-calendar.tests",
        "pluginId": "cordova-plugin-calendar"
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "file": "plugins/phonegap-plugin-push/www/push.js",
        "id": "phonegap-plugin-push.PushNotification",
        "pluginId": "phonegap-plugin-push",
        "clobbers": [
            "PushNotification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-inappbrowser": "1.1.1",
    "com.oauthio.plugins.oauthio": "0.2.4",
    "cordova-plugin-calendar": "4.4.4",
    "cordova-plugin-geolocation": "1.0.1",
    "cordova-plugin-whitelist": "1.0.0",
    "phonegap-plugin-push": "1.4.4"
}
// BOTTOM OF METADATA
});