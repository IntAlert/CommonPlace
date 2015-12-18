cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
<<<<<<< HEAD
        "file": "plugins/com.oauthio.plugins.oauthio/dist/oauth.js",
        "id": "com.oauthio.plugins.oauthio.OAuth",
=======
<<<<<<< HEAD
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
>>>>>>> ae3bf5a5129d8badff2ca9d6b9512641770616c3
        "merges": [
            "OAuth"
        ]
    },
    {
<<<<<<< HEAD
=======
=======
>>>>>>> 5bd3302147ff576d38a10e8399fe5f8b2b086025
>>>>>>> ae3bf5a5129d8badff2ca9d6b9512641770616c3
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
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/phonegap-plugin-push/www/push.js",
        "id": "phonegap-plugin-push.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
<<<<<<< HEAD
    "com.oauthio.plugins.oauthio": "0.2.4",
    "cordova-plugin-calendar": "4.4.4",
=======
<<<<<<< HEAD
    "cordova-plugin-inappbrowser": "1.1.1",
    "com.oauthio.plugins.oauthio": "0.2.4",
    "cordova-plugin-calendar": "4.4.4",
=======
    "cordova-plugin-calendar": "4.4.4",
<<<<<<< HEAD
    "phonegap-plugin-push": "1.4.4",
    "com.oauthio.plugins.oauthio": "0.2.4",
    "cordova-plugin-inappbrowser": "1.1.1"
=======
>>>>>>> 5bd3302147ff576d38a10e8399fe5f8b2b086025
>>>>>>> ae3bf5a5129d8badff2ca9d6b9512641770616c3
    "cordova-plugin-geolocation": "1.0.1",
    "cordova-plugin-whitelist": "1.0.0",
    "phonegap-plugin-push": "1.4.4",
    "cordova-plugin-inappbrowser": "1.1.1"
}
// BOTTOM OF METADATA
});