// Kallar på get-genres.php
// som returnerar URL till bild, genre
// Skapa element + appenda dem

"use strict";

async function makeGenreBanner(){
    let genres = await getGenres();
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

        //clickEvent, call on search function with the genre name in the field
        genreBanner.addEventListener('click', ()=>{
            makeSearchOverlay(genre.name);
        })
        
        //append
        genreBanner.append(genreName);
        genreBanner.append(divider);
        document.getElementById("genre").append(genreBanner);

    });
    
    //Get movies by genre
    let movieByGenre = await getMoviesByGenre();

    //Get our genreBanners
    let allDivs = document.querySelectorAll('.genreBanner');
    
    //Create an array to fill with out picture-paths
    let pics = [];
    movieByGenre.forEach((genre) => {
        //If backdrop_path does not exist: take a poster_path instead
        let path = ``;
        if(genre.results[2]['backdrop_path'] == null){
            path = `url('https://image.tmdb.org/t/p/w500/${genre.results[2]['poster_path']}')`;
        } else {
            path = `url('https://image.tmdb.org/t/p/w500/${genre.results[2]['backdrop_path']}')`;
        }

        //Pusha the picture-paths in our array
        pics.push(path);
        
    })

    for (let i = 0; i < pics.length; i++) {
        //for each div with a genre, place a backgroundImage from our array with images
        allDivs[i].style.backgroundImage = pics[i];
    }    

}


