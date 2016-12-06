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


      for (var x in marker.markers) {

        var markers = null;
        var infowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        var myLatLng = {

          lat: marker.markers[x].lat,
          lng: marker.markers[x].long

        };


        Cookies.set('marker'+x, marker.markers[x]);

        markers = new google.maps.Marker({

          position: myLatLng,
          map: map,
          animation: google.maps.Animation.DROP,
          info: marker.markers[x].title

        });

        google.maps.event.addListener(markers, 'click', function () {

          $('.todo-wrapper').empty();
          $('.todo-delete-wrapper').empty();

          infowindow.setContent(this.info);
          infowindow.open(map, this);

          $('.button__show-todo').sideNav('show');

          console.log(marker.markers[x].todos);

          for( var c in marker.markers[x].todos){

            $('.todo-wrapper').append('<li><a href="#!" data-long="' + myLatLng.lng + '" data-lat="' + myLatLng.lat + '" data-todo-id="' + marker.markers[x].id + '" class="todo">' + marker.markers[x].todos[c].text + '</a></li>');
            $('.todo-delete-wrapper').append('<li class="todo--check" data-todo-close-id="' + marker.markers[x].id + '"><i class="fa fa-check"></i></li>')
          }



        });

        bounds.extend(myLatLng);

        console.log(bounds);

      }

      map.zoom(16);

    }
  });


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}



