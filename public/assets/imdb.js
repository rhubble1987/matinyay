const { response } = require("express");

const searchForMovieButton = $("#find-movie");
const movieSearchField = $('#movie-search-field').value();
const createNewPartyButton = $('#partyCreate');


let key = "k_7ln5s4c3";

searchForMovieButton.on("click", function(event) {
    event.preventDefault();
    $.ajax({
        method:"GET",
        url: "https://imdb-api.com/en/API/SearchMovie/" + key + "/" + movieSearchField,
        success: function (response) {
            console.log(response);
            if (response.length > 5) {
                for (i = 0; i < 5; i++) { 
                    $('#movie-results').append(`<li><a href="0">${response.results[i].title} ${response.results[i].description}</a></li>`);
                }
            } else if (response.length <= 5) {
                for (i = 0; i < response.length; i++) {
                    $('#movie-results').append(`<li><a href="0">${response.results[i].title} ${response.results[i].description}</a></li>`);
                }
            }
        }
    });
});

createNewPartyButton.on('click', function(event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/api/movies',
        data: {
            imdbId: response.results[?].id //Need to add event listener to add an attribute to the selected movie that can be used to specify that movie's ID when sending it to the server.
        }
    }).then(function() {
        $.ajax({
            method: 'POST',
            url: '/api/parties',
            data: {
                imdbId: response.results[?].id,//Need to add event listener to add an attribute to the selected movie that can be used to specify that movie's ID when sending it to the server.
                roomName: $("#roomName").val().trim(),
                viewDay: moment($("#viewDay").val()).format("M/D/YYYY"),
                viewTime: moment($("#viewTime").val(),"HH:mm").format("h:mm A"),
            },
        });
    });
});


$.ajax({
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
});



$(document).ready(function() {

for (let i = 0; i < imdbIds.length; i++) {

    $.ajax({
        method:"GET",
        url: "https://imdb-api.com/en/API/Title/" + key + "/" + imdbIds[i] + "/Posters",
        success: function (response) {
            console.log(response);
            $("#movie-list").append(`
            <div class="column is-3">
            <div class="box mt-5">
            <p><a href="/movie/${response.id}">${response.fullTitle}</a></p>
            <figure class="image">
            <img src="${response.image}">
            </figure>
            </div>
            </div>`);
        }
    });

}