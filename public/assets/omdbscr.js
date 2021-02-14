
let omdbIds = ["tt3896198","tt2911666","tt0076759","tt1375666","tt0120338","tt0119217","tt1190536","tt0942385","tt0800039","tt0119094"];

let key = "ce3d9c47";

for (let i = 0; i < omdbIds.length; i++) {

    $.ajax({
        method:"GET",
        url: "https://www.omdbapi.com/?i=" + omdbIds[i] + "&plot=short&r=json&" + "apikey=" + key,
        success: function (response) {
            $("#movie-list").append(`<div class="col-6"> 
            <a href="/movie/${response.imdbID}"><h2>${response.Title}</h2></a>
            <img src=${response.Poster}></img> </div>
            <hr>`);
        }
    });

}