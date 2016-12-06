'use strict';


// @todo delete temp variable for userid
var userid = 1;

// initialize Materialize navbar
$('.button__show-todo').sideNav();
$('.button__show-todo').sideNav('show');


$.ajax({
    url: 'https://api.seriousmom.jpeer.at/api/usermarker/get/' + userid,
    method: 'GET',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDgwOTY5NTI0LCJleHAiOjE0ODA5ODAzMjR9.MNnyk4J0_egVlWyFCVnO5DIpGaBlb63ICGaJ5MpsR2E')
    },
    success: function (data) {
        var $todoWrapper = $('.todo-wrapper');
        var $todoDeleteWrapper = $('.todo-delete-wrapper');
        var long;
        var lat;
        var id;

        for (var todos of data.markers) {
            long = todos.long;
            lat  = todos.lat;

            for (var todo of todos.todos) {
                id = todo.id;

                $todoWrapper.append('<li><a href="#!" data-long="' + long + '" data-lat="' + lat + '" data-todo-id="' + id + '" class="todo">' + todo.text + '</a></li>')
                $todoDeleteWrapper.append('<li class="todo--check" data-todo-close-id="' + id + '"><i class="fa fa-check"></i></li>')
            }
        }

        $('[data-todo-close-id]').click(function () {
            var $this = $(this);
            var id = $this.data('todo-close-id');

            // removing items - beautiful, isn't it? 🙈
            $('[data-todo-id=' + id + ']').remove();
            $this.remove();
            // @todo send delete request
        });
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