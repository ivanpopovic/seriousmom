var lat = null;
var lng = null;

// sets your location as default
if (navigator.geolocation) {
    var getCurrentPosition = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            var locationMarker = null;

            if (locationMarker){
                // return if there is a locationMarker bug
                return;
            }

            lat = position.coords["latitude"];
            lng = position.coords["longitude"];
            console.log(lat, lng)
        }, function (error) {
            console.log("Error: ", error);
        }, {
            enableHighAccuracy: true
        });
    };

    getCurrentPosition();
    setInterval(function () {
        getCurrentPosition();
    }, 10000);
}