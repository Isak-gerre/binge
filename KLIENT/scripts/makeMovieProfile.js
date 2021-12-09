// Hämta data om filmen från SESSIONSTORAGE
// SKAPA hela sidan
// 1. MOVIE description (including buttons)
// 2. Streaming Services (Kalla på endpoint - skicka med
// movieID)
// 3. Cast + Directory (Kalla på endpoint - skicka med
// movieID) kolla vilka streaming tjänster som användaren har
// 4. Hämtar reviews från get-activitys.php
// 5. Similar Movies (Kalla på endpoint - skicka me MovieID)

// Kolla om användaren har gjort en aktivitet först,
// hämta data om info gällande aktiviterna genom
// check-movie-user-relation.php som returnerar true/false/obj
// Klickevent på knapparna:
// 1. Watched: skickar till servern
// 2. Watch later: skickar till servern
// 3. Review: skickar till servern

/*

makeMovieProfile([movieID]){

}

*/

"use strict";

async function makeMovieProfile(movieID) {
  let overlay = document.getElementById("overlay");
  overlay.style.minHeight = "100vh";
  let data = await getMovieInfo(movieID);
  let movieInfo = data.message;
  console.log(movieInfo);

  // TOP
  let movieHeader = document.createElement("div");
  movieHeader.className = "movie-profile-header";

  // Backdrop - Isak
  let backdrop = document.createElement("img");
  backdrop.setAttribute("src", `https://image.tmdb.org/t/p/w500${movieInfo["backdrop_path"]}`);
  backdrop.className = "movie-profile-backdrop";

  // --INFO Divs
  // infoPoster & infoText
  let info = document.createElement("div");
  info.className = "movie-profile-info";

  // info > Poster
  let infoPoster = document.createElement("div");
  infoPoster.className = "movie-profile-info-poster";

  // info > Title, Buttons, Release, Rating, Runtime

  let infoText = document.createElement("div");
  infoText.className = "movie-profile-info-text";

  // Poster - Isak
  let poster = document.createElement("img");
  poster.setAttribute("src", `https://image.tmdb.org/t/p/w500${movieInfo["poster_path"]}`);
  poster.className = "movie-profile-poster";

  // Title - Isak
  let title = document.createElement("h3");
  title.textContent = movieInfo.title;
  title.className = "movie-profile-title";

  // Buttons - Niklas
  let buttons = document.createElement("div");
  buttons.className = "movie-profile-buttons";

  // Runtime, Rating & Release date - Isak
  let movieRsDiv = document.createElement("div");
  let movieRs = document.createElement("p");
  movieRs.textContent = `${movieInfo["vote_average"]} | ${movieInfo["release_date"]} | ${movieInfo["runtime"]} min`;

  // MIDDLE
  let middle = document.createElement("div");
  middle.className = "movie-profile-middle";

  // Description - Isak
  let description = document.createElement("div");
  description.className = "movie-profile-description";
  description.innerHTML = `
    <p>${movieInfo.overview}</p>
    `;

  // Streaming Services - Isak
  let streamingservices = document.createElement("div");
  streamingservices.className = "movie-profile-streamingservices";
  let streamingservicesText = document.createElement("h4");
  streamingservicesText.textContent = "Streaming Services";
  streamingservicesText.className = "streaming-services-text";

  let streamingservicesGrid = document.createElement("div");
  streamingservicesGrid.className = "movie-profile-streaming-services-grid";
  let allProviders = await getProviders();
  let providers = allProviders.message.providers;
  console.log(providers);
  providers.forEach((provider) => {
    let providerDiv = document.createElement("img");
    providerDiv.setAttribute("src", `https://image.tmdb.org/t/p/w500${provider["logo_path"]}`);
    streamingservicesGrid.append(providerDiv);
  });

  // Credits - Niklas
  let credits = document.createElement("div");
  credits.className = "movie-profile-credits";

  // Cast - Niklas
  let cast = document.createElement("div");
  cast.className = "movie-profile-cast";

  // Directors - Niklas
  let director = document.createElement("div");
  director.className = "movie-profile-director";

  // Reviews - Isak VÄNTAR PÅ FEED
  let reviews = document.createElement("div");
  reviews.className = "movie-profile-reviews";

  // Similar Movies - Niklas
  let similarMovies = document.createElement("div");
  similarMovies.className = "movie-profile-similarMovies";

  // APPENDS
  movieRsDiv.append(movieRs);
  movieHeader.append(backdrop);
  infoPoster.append(poster);
  infoText.append(movieRs, title, buttons);
  info.append(infoPoster, infoText);

  streamingservices.append(streamingservicesText);
  streamingservices.append(streamingservicesGrid);
  credits.append(cast, director);
  middle.append(description, streamingservices, credits, reviews, similarMovies);

  overlay.append(movieHeader, info, middle);
}

makeMovieProfile(550);
