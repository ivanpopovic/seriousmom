'use strict';

// @todo delete temp variable for userid
var userid = 1;

// initialize Materialize navbar
$('.button__show-todo').sideNav();

$.ajax({
    url: 'https://api.seriousmom.jpeer.at/api/usermarker/get/' + userid,
    method: 'POST',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDgwOTY5NTI0LCJleHAiOjE0ODA5ODAzMjR9.MNnyk4J0_egVlWyFCVnO5DIpGaBlb63ICGaJ5MpsR2E')
    },
    success: function () {
        var $todoWrapper = $('.todo-wrapper');
        var long;
        var lat;

        for (var todos of data.markers) {
            long = todos.long;
            lat  = todos.lat;

            for (var todo of todos.todos) {
                $todoWrapper.append('<li><a href="#!" data-long="' + long + '" data-lat="' + lat + '" class="todo">' + todo.text + '</a></li>')
            }
        }
    }
});

// init all todos
$('a.todo').click(function (e) {
    var $this = $(this);
    var long  = $this.data('long');
    var lat   = $this.data('lat');

    e.preventDefault();

    $('.button__show-todo').sideNav('hide');

    // @todo fire click on marker with this long lat
});