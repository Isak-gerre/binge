// Kallar på get-genres.php
// som returnerar URL till bild, genre
// Skapa element + appenda dem

"use strict";

let colorArray = ['#361986', '#ffb700', '#2a9d8f', '#a8dadc', '#023e8a', 
		  '#6a040f', '#4cc9f0', '#999966', '#fca311', '#006d77',
		  '#ef233c', '#8d99ae', '#c2c5aa', '#f94144', '#118ab2', 
		  '#06d6a0', '#ef476f', '#9e2a2b', '#9d4edd', '#ff6d00'
];

async function makeGenreBanner(){
    let genres = await getGenres();
    
    
    genres['genres'].forEach(async function (genre){
        let movieByGenre = await getMoviesByGenre(`${genre.name}`);
        // console.log(movieByGenre.page1.results.length);
        // console.log(movieByGenre);
        var randomMovie = movieByGenre.page1.results[Math.floor(Math.random()*movieByGenre.page1.results.length)];
        // console.log(randomMovie["poster_path"]);

        console.log(genre);


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
        // movieBanner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["poster_path"]}')`;


        
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


