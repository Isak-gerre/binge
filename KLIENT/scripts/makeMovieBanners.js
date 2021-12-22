// Hämta filmbild + titel
// skapa element
// returnera det.

"use strict";

async function makeMovieBanner(movieID) {
    let movieInfo = await getMovieInfo(movieID);
    // console.log(movieInfo);
  
    //create elements
    let movieBanner = document.createElement("div");
    let titleDiv = document.createElement("div");
    let title = document.createElement("p");
  
    //classes
    movieBanner.className = "movieBanner";
    titleDiv.className = "titleDiv";
    title.className = "movieTitle";
  
    // console.log(movieInfo);
  
    //content
    title.textContent = movieInfo.message.title;
    movieBanner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["poster_path"]}')`;
  
    //append
    movieBanner.append(title);
    movieBanner.append(titleDiv);
  
    return movieBanner;
}

function makeMovieBannerFromMovie(movie) {
  
    //create elements
    let movieBanner = document.createElement("div");
    let titleDiv = document.createElement("div");
    let title = document.createElement("p");
  
    //classes
    movieBanner.className = "movieBanner";
    titleDiv.className = "titleDiv";
    title.className = "movieTitle";
  
    // console.log(movieInfo);
  
    //content
  movieBanner.setAttribute("title", movie.title || movie.name)
    title.textContent = movie.name || movie.title;
    movieBanner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie["poster_path"]}')`;
  
    //append
    movieBanner.append(title);
    movieBanner.append(titleDiv);
  
    return movieBanner;
}

// makeMovieBanner(550);
// makeMovieBanner(123);
// makeMovieBanner(321);
