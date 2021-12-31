// Hämta filmbild + titel
// skapa element
// returnera det.

"use strict";

async function makeMovieBanner(movieID) {
  let movieInfo = await getMovieInfo(movieID);

  //create elements
  let movieBanner = document.createElement("div");

  //classes
  movieBanner.className = "movieBanner";

  let movieImgPath = ``;

  if(movieInfo.message["poster_path"] == null){
    movieImgPath = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["backdrop_path"]}')`;
  } else {
    movieImgPath = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["poster_path"]}')`;
  } 

  //the background image
  movieBanner.style.backgroundImage = movieImgPath;

  //send to movieProfile
  movieBanner.addEventListener("click", () => {
    window.location.href = `explore.php?movieID=${movieID}`;
  });

  return movieBanner;
}
function makePlaceholderMovieBanner() {
  //create elements
  let movieBanner = document.createElement("div");

  //classes
  movieBanner.className = "movieBanner placeholder";

  return movieBanner;
}

function makeMovieBannerFromMovie(movie) {
  //create elements
  let movieBanner = document.createElement("div");

  //classes
  movieBanner.className = "movieBanner";

  //content
  movieBanner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie["poster_path"]}')`;

  // send to movieProfile
  movieBanner.addEventListener("click", () => {
    window.location.href = `explore.php?movieID=${movie.id}`;
  });

  //return it
  return movieBanner;
}

// makeMovieBanner(550);
// makeMovieBanner(123);
// makeMovieBanner(321);
