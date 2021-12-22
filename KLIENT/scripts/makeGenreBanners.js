// Kallar på get-genres.php
// som returnerar URL till bild, genre
// Skapa element + appenda dem

"use strict";

async function makeGenreBanner(){
    let genres = await getGenres();
    
    
    genres['genres'].forEach(async function (genre){
        let movieByGenre = await getMoviesByGenre(`${genre.name}`);
        // console.log(movieByGenre.page1.results.length);
        // console.log(movieByGenre);
        var randomMovie = movieByGenre.page1.results[Math.floor(Math.random()*movieByGenre.page1.results.length)];
        // console.log(randomMovie["poster_path"]);

        // console.log(movieByGenre);

        
        //create elements
        let genreBanner = document.createElement('div');
        let divider = document.createElement('div');
        let genreName = document.createElement('p');
        
        //classes
        genreBanner.className = "genreBanner";
        divider.className = "divider";
        genreName.className = "genreName";
        
        //content
        genreName.textContent= genre.name;
        genreBanner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${randomMovie["backdrop_path"]}')`;
        
        // movieByGenre.page1.results.forEach((genre)=>{
        //     // console.log(genre);
        //     genreBanner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${genre["backdrop_path"]}')`;
        // })

        
        //append
        genreBanner.append(genreName);
        genreBanner.append(divider);
        document.getElementById("genre").append(genreBanner);
    });


    return genres;
}

// makeGenreBanner();

// genres.forEach(genre => {
//     makeGenreBanner(genre);
// });


