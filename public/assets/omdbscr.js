
let imdbIds = ["tt3896198","tt2911666","tt0076759","tt1375666","tt0120338","tt0119217","tt1190536","tt0942385","tt0800039","tt0119094"];

let key = "k_8pgddpof";

for (let i = 0; i < imdbIds.length; i++) {

    $.ajax({
        method:"GET",
        url: "https://imdb-api.com/en/API/Title/" + key + "/" + imdbIds[i] + "/Posters",
        success: function (response) {
            console.log(response);
            $("#movie-list").append(`
            <div class="column is-3">
            <div class="box">
            <p><a href="/movie/${response.id}">${response.fullTitle}</a></p>
            <figure class="image">
            <img src="${response.image}">
            </figure>
            </div>
            </div>`);
        }
    });

}