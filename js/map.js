var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.4624037, lng: -0.1289721},
        zoom: 14
    });
}