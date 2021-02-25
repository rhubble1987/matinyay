const searchForMovieButton = $("#find-movie");
const createNewPartyButton = $('#partyCreate');
const addANewMovie = $('#add-a-new-movie');


let key = "k_7ln5s4c3";



addANewMovie.click(function() {
    $(".modal").attr('class','modal is-active');
});

$('.modal-close').click(function() {
    $(".modal").attr('class','modal');
});

$('.modal-background').click(function() {
    $('.modal').attr('class','modal');
});

searchForMovieButton.click(function(event) {
    event.preventDefault();
    $('#movie-results').empty();
    $.ajax({
        method:"GET",
        url: "https://imdb-api.com/en/API/SearchMovie/" + key + "/" + $('#movie-search-field').val()
    }).then(function (response) {
            console.log(response);
            $('#movie-results').append('<p><b>Results</b></p>');
            for (i = 0; i < 5; i++) {
                console.log(response.results[i]); 
                $('#movie-results').append('<p><a class="movie-result" data-imdb-id="' + response.results[i].id + '">' + response.results[i].title + ' ' + response.results[i].description + '</a></p>');
            }
            $('.movie-result').click(function() {
                $(this).attr('id','selected-movie');
                $('#movie-results').attr('style','display: none');
                $('#chosen-movie').append($(this));
            });
        });   
    
});



createNewPartyButton.on('click', function(event) {
    event.preventDefault();
    $('.modal').attr('class','modal');
    $.ajax({
        method: 'POST',
        url: '/api/movies',
        data: {
            imdbId: $('#selected-movie').attr('data-imdb-id')
        }
    }).then(function() {
        $.ajax({
            method: 'POST',
            url: '/api/parties',
            data: {
                imdbId: $('#selected-movie').attr('data-imdb-id'),
                roomName: $("#roomName").val().trim(),
                viewDay: moment($("#viewDay").val()).format("M/D/YYYY"),
                viewTime: moment($("#viewTime").val(),"HH:mm").format("h:mm A"),
            }
        }).then(function() {
                location.reload();
        });
    });
});


/* $.ajax({
    method: "GET",
    url: "https://imdb-api.com/en/API/Title/" + key + "/" + imdbId + "/Posters",
    success: function (response) {
        console.log(response);
        $("#movie-info").append(`
        <a href="/movie/${response.id}"><h2>${response.fullTitle}</h2></a>
        <img src=${response.image}></img>
        <p>${response.plot}</p>
        `);
    }
}); */



$(document).ready(function() {
    $.ajax({
        method: 'GET',
        url: '/api/movies'
    }).then(function(res) {
        console.log(res);
            for (let i = 0; i < res.length; i++) {
                $.ajax({
                    method:"GET",
                    url: "https://imdb-api.com/en/API/Title/" + key + "/" + res[i].imdbId
                }).then(function (data) {
                        console.log(data);
                        $("#movie-list").append(`
                        <div class="column is-3">
                        <div class="box mt-5">
                        <p><a href="/movie/${data.id}">${data.fullTitle}</a></p>
                        <figure class="image">
                        <img src="${data.image} width="200" height="300">
                        </figure>
                        </div>
                        </div>`);
                });
        }
    });
});
