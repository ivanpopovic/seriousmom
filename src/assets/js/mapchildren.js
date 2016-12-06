var map;

function initMap() {
  var pos;
  var map;
  var markers = [];
  var marker_infobox = "test";

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 47.722942,
      lng: 13.089094
    },
    zoom: 16
  });
  /*
   var infoWindow = new google.maps.InfoWindow({
   map: map
   });
   var infowindow = new google.maps.InfoWindow({
   content: marker_infobox
   });
   */

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function addMarker(location) {

    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);
    markers[markers.length - 1].addListener('click', function (event) {
      infowindow.open(map, marker);
    });

  }

  map.addListener('click', function (event) {
    addMarker(event.latLng);
  });


  $.ajax({
    url: 'http://localhost:1337/api/usermarker/get/1',
    method: 'GET',
    success: function (marker) {

      console.log(marker.markers);

      for (var x in marker.markers) {

        var markers = null;
        var infowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        var myLatLng = {

          lat: marker.markers[x].lat,
          lng: marker.markers[x].long

        };


        Cookies.set('marker'+x, marker.markers[x]);
        console.log(Cookies('marker'+x));

        markers = new google.maps.Marker({

          position: myLatLng,
          map: map,
          animation: google.maps.Animation.DROP,
          info: marker.markers[x].title

        });

        google.maps.event.addListener(markers, 'click', function () {

          infowindow.setContent(this.info);
          infowindow.open(map, this);

        });

        bounds.extend(myLatLng);

      }

      map.fitBounds(bounds);

    }
  });


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}



