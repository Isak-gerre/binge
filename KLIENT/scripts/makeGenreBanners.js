// Kallar på get-genres.php
// som returnerar URL till bild, genre
// Skapa element + appenda dem

"use strict";

async function makeGenreBanner() {
  let genres = await getGenres();
  // Hämtar bilder och info till Your Watchlist
  const loggedInUserId = getLoggedInUserID();
  let userInfo = await getUserInfo(loggedInUserId);
  let allUserActivities = await getAllActivites(userInfo.id);

  let watchlist = [];
  allUserActivities.forEach((obj) => {
    if (obj.type == "watchlist") {
      watchlist.push(obj);
    }
  });
  if(watchlist.length != 0) {
    let random = Math.floor(Math.random() * watchlist.length);
    let randomMovie = await getMovieInfo(watchlist[random].movieID);
    
    let yourlist = document.createElement("div");
    yourlist.className = "genreBanner yourlist";
    yourlist.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${randomMovie.message["poster_path"]}')`;
    yourlist.addEventListener("click", () => {
      goToPageAndAddToState(`profile.php?watchlist=true`);
    });
    let yourListText = document.createElement("h2");
    yourListText.textContent = "Your Watchlist";
  
    yourlist.append(yourListText);
    document.getElementById("genre").append(yourlist);
  }


  genres["genres"].forEach(async function (genre) {
    //create elements
    let genreBanner = document.createElement("div");
    let genreImageDiv = document.createElement("div");
    let genreGradient = document.createElement("div");
    let genreName = document.createElement("h2");

    //classes
    genreBanner.className = "genreBanner";
    genreGradient.className = "genreGradient";
    genreImageDiv.className = "genreImageDiv";
    // genreName.className = "genreName";

    //content
    genreName.textContent = genre.name;

    //clickEvent, call on search function with the genre name in the field
    genreBanner.addEventListener("click", () => {
      makeSearchOverlay(genre.name, "Genre");
    });

    //append
    genreImageDiv.append(genreName);
    genreBanner.append(genreImageDiv);
    // genreBanner.append(genreName);
    document.getElementById("genre").append(genreBanner);
  });

  let title = document.createElement("h3");
  title.textContent = "Genres";
  document.querySelector("#genre").prepend(title);

  //Get movies by genre
  let movieByGenre = await getMoviesByGenre();

  //Get our genreBanners
  let allDivs = document.querySelectorAll(".genreImageDiv");

  //Create an array to fill with out picture-paths
  let pics = [];
  movieByGenre.forEach((genre) => {
    //If backdrop_path does not exist: take a poster_path instead
    let path = ``;
    if (genre.results[2]["backdrop_path"] == null) {
      path = `url('https://image.tmdb.org/t/p/w500/${genre.results[2]["poster_path"]}')`;
    } else {
      path = `url('https://image.tmdb.org/t/p/w500/${genre.results[2]["backdrop_path"]}')`;
    }

    //Pusha the picture-paths in our array
    pics.push(path);
  });

  for (let i = 0; i < pics.length; i++) {
    //for each div with a genre, place a backgroundImage from our array with images
    allDivs[i].style.backgroundImage = pics[i];
  }
}
