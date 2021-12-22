// Kallar på get-genres.php
// som returnerar URL till bild, genre
// Skapa element + appenda dem

"use strict";

async function makeGenreBanner(){
    // let genres = await getGenres();
    let genres = await getGenres();
    let movieByGenre = await getMoviesByGenre();


    // console.log(movieByGenre);

    genres["genres"].forEach(async function (genre) {

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

        // console.log(allGenreDivs);
        // console.log(genres);

        let genreID = genre.id;

        movieByGenre.forEach(async function (movie) {    
            movie.results.forEach((movie) => {
                let posterPath = movie["poster_path"];
                
                if(movie.genre_ids.includes(genreID)){
                    genreBanner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${posterPath}')`;
                } 
            })
        });
      

        
        //append
        genreBanner.append(genreName);
        genreBanner.append(divider);
        document.getElementById("genre").append(genreBanner);

        // getBackground(genreID, genreBanner);
    });
}


// async function getBackground(genreID, div){
//     let movieByGenre = await getMoviesByGenre();
    

//     // console.log(movieByGenre);
    
// }

