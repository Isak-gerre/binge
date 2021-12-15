
// Hämta filmbild + titel
// skapa element 
// returnera det.

"use strict";

async function makeMovieBanner(movieID){
    let movieInfo = await getMovieInfo(movieID);
    console.log(movieInfo);
    
    //create elements
    let movieBanner = document.createElement('div');
    let titleDiv = document.createElement('div');
    let title = document.createElement('p');

    //classes
    movieBanner.className = "movieBanner";
    titleDiv.className = "titleDiv";
    title.className = "title";

    //content
    title.textContent= movieInfo.message.title;
    movieBanner.style.backgroundImage = `url('http://image.tmdb.org/t/p/w500/${movieInfo.message["poster_path"]}')`

    //append
    movieBanner.append(title);
    movieBanner.append(titleDiv);
    document.getElementById("wrapper").append(movieBanner);

    


}

makeMovieBanner(550);
makeMovieBanner(123);
makeMovieBanner(321);
