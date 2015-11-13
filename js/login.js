OAuth.initialize('5i3BpuAxPXvxKYb4sJPpaOBRe8c');

function twitter() {
//Example with Twitter with the cache option enabled
OAuth.popup('twitter', {cache: true}).done(function(twitter) {
  //make API calls with `twitter`
    console.log("calling Twitter API")
}).fail(function(err) {
  //todo when the OAuth flow failed
    console.log("Failed to call Twitter API")
})

var twitter = OAuth.create('twitter');
//`twitter` is a request object.
//`twitter` can be `null` if the request object has not been created yet.

//Let's say the /me endpoint on the provider API returns a JSON object
//with the field "name" containing the name "John Doe"
OAuth.popup(provider)
.done(function(result) {
    result.get('https://twitter.com/')
    .done(function (response) {
        //this will display "John Doe" in the console
        console.log(response.name);
    })
    .fail(function (err) {
        //handle error with err
        console.log("failed response attempt #1")
    });
})
.fail(function (err) {
    //handle error with err
    console.log("failed response attempt #2")
});

//provider can be 'facebook', 'twitter', 'github', or any supported
//provider that contain the fields 'firstname' and 'lastname' 
//or an equivalent (e.g. "FirstName" or "first-name")
var provider = 'twitter';

OAuth.popup('twitter')
.done(function(result) {
    result.me()
    .done(function (response) {
        console.log('Firstname: ', response.firstname);
        console.log('Lastname: ', response.lastname);
    })
    .fail(function (err) {
        //handle error with err
        console.log("Couldn't get firstname")
    });
})
.fail(function (err) {
    //handle error with err
    console.log("Couldn't get lastname")
});

OAuth.popup('twitter').then(function(oauthResult) {
  return oauthResult.get('https://twitter.com/');
}).then(function(data) {
  // data is the result of the request to /me
}).fail(function(err) {
  // handle an error
});
    
oauthResult.get('https://twitter.com/').done(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});
    
}