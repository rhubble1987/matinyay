
let imdbIds = ["tt0076759","tt2015381","tt0133093","tt0073195"];

let key = "k_7ln5s4c3";

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