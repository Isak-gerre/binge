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

// Variabler för den inloggade?
let loggedInUser = 4;

async function makeMovieProfile(movieID) {
  let user = await getUserInfo(1);

  let overlay = document.getElementById("overlay");
  let data = await getMovieInfo(movieID);
  let movieInfo = data.message;

  // ______________________________________________________________________________________________________
  // HEADER
  let movieHeader = document.createElement("div");
  movieHeader.className = "movie-profile-header";

  // // Background
  // let overlayBackground = document.createElement("div");
  // overlayBackground.className = "movie-profile-background";

<<<<<<< HEAD
  // // Drop
  let drop1 = document.createElement("div");
  drop1.className = "drop1";
  let drop2 = document.createElement("div");
  drop2.className = "drop2";

=======
>>>>>>> parent of 2af9255 (up)
  // backdrop
  let backdrop = document.createElement("div");
  backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieInfo["backdrop_path"]})`;
  backdrop.className = "movie-profile-backdrop";

  // gradient
  let gradient = document.createElement("div");
  gradient.className = "movie-profile-gradient";

  // Appends HEADER part
  movieHeader.append(backdrop, gradient);
  // ______________________________________________________________________________________________________
  // INFO
  let info = document.createElement("div");
  info.className = "movie-profile-info";

  // info-poster
  let infoPoster = document.createElement("div");
  infoPoster.className = "movie-profile-info-poster";

  let poster = document.createElement("img");
  poster.setAttribute("src", `https://image.tmdb.org/t/p/w500${movieInfo["poster_path"]}`);
  poster.className = "movie-profile-poster";

  infoPoster.append(poster);

  // info-text  (Title, Buttons, Release, Rating, Runtime)
  let infoText = document.createElement("div");
  infoText.className = "movie-profile-info-text";

  // p (Runtime, Rating & Release date) - Isak
  let movieRsDiv = document.createElement("div");
  let movieRs = document.createElement("p");
  movieRs.textContent = `${movieInfo["vote_average"]} | ${movieInfo["release_date"]} | ${movieInfo["runtime"]} min`;

  movieRsDiv.append(movieRs);

  // title - Isak
  let title = document.createElement("h3");
  title.textContent = movieInfo.title;
  title.className = "movie-profile-title";

  // ---------------------------------------------------------------------------------------------------------------------
  // BUTTONS
  let buttons = document.createElement("div");
  buttons.setAttribute("id", "movie-profile-buttons");

  // Kontrolelra vilka aktiviterer aom användaren gjort på filmen
  let relation = await getButtonRealtionStatus(loggedInUser, movieID);

  let watchLater = document.createElement("button");
  watchLater.className = "watch-later button";
  watchLater.textContent = "Watchlist";

  let watched = document.createElement("button");
  watched.className = "watched button";
  watched.textContent = "Watched";

  let review = document.createElement("button");
  review.className = "review button";
  review.textContent = "Review";

  if (relation.watchlist !== false) {
    watchLater.classList.add("marked");
  }
  if (relation.watched !== false) {
    watched.classList.add("marked");
  }
  if (relation.review !== false) {
    review.textContent = "Update Review";
  }

  infoText.append(movieRs, title, buttons);

  // Appends INFO part
  info.append(infoPoster, infoText);
  // ______________________________________________________________________________________________________
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
  let additionalInfo = await getAdditionalInfo(movieID);
  let userRegion = user.region;

  let streamingservices = document.createElement("div");
  streamingservices.className = "movie-profile-streamingservices";

  let streamingservicesText = document.createElement("h4");
  streamingservicesText.textContent = "Streaming Services";
  streamingservicesText.className = "streaming-services-text";

  streamingservices.append(streamingservicesText);

  // console.log(additionalInfo.message.providers.results[userRegion]);
  // Checks if you can buy, rent or flatrate in your country
  if (additionalInfo.message.providers.results[userRegion] == undefined) {
    let message = document.createElement("p");
    message.textContent = "It's not avaible in your country :(";
    streamingservices.append(message);
  } else {
    // Checks if you can flatrate it
    if (additionalInfo.message.providers.results[userRegion].flatrate == undefined) {
      let message = document.createElement("p");
      message.textContent = "This movie isnt avaible at any streaming services, but you can hire it :(";
      streamingservices.append(message);
    } else {
      let movieProviders = additionalInfo.message.providers.results[userRegion].flatrate;
      console.log(movieProviders);

      let streamingservicesGrid = document.createElement("div");
      streamingservicesGrid.className = "movie-profile-streaming-services-grid";

      movieProviders.forEach((provider) => {
        let providerDiv = document.createElement("img");
        let providerName = provider.provider_name;
        let activeUserSC = user.active_streaming_services;
        console.log(providerName.toLowerCase());
        console.log(activeUserSC.includes(providerName.toLowerCase()));
        if (activeUserSC.includes(providerName.toLowerCase())) {
          providerDiv.className = "active-streming-service";
        }

        providerDiv.setAttribute("src", `https://image.tmdb.org/t/p/w200${provider["logo_path"]}`);
        streamingservicesGrid.append(providerDiv);
      });
      streamingservices.append(streamingservicesGrid);
    }
  }

  // Credits - Niklas
  let credits = document.createElement("div");
  credits.className = "movie-profile-credits";

  // Cast - Niklas
  let cast = document.createElement("div");
  cast.className = "movie-profile-cast";
  let titleCast = document.createElement("h4");
  titleCast.textContent = "Cast";
  cast.append(titleCast);

  for (let i = 0; i < 5; i++) {
    let castMember = createCreditDiv(additionalInfo.message.credits.cast[i]);
    cast.append(castMember);
  }

  // Directors - Niklas
  let director = document.createElement("div");
  director.className = "movie-profile-director";
  let titleDirector = document.createElement("h4");
  titleDirector.textContent = "Director";
  director.append(titleDirector);

  additionalInfo.message.credits.crew.forEach((crewMember) => {
    if (crewMember.job == "Director") {
      let crew = createCreditDiv(crewMember);
      director.append(crew);
    }
  });

  function createCreditDiv(person) {
    let productionPeople = document.createElement("div");
    productionPeople.className = "production-people";

    let image = document.createElement("div");
    image.style.backgroundImage = `url(https://image.tmdb.org/t/p/w200/${person.profile_path})`;

    let name = document.createElement("p");
    name.textContent = person.name;

    productionPeople.append(image, name);
    return productionPeople;
  }

  credits.append(cast, director);

  // Reviews - Isak VÄNTAR PÅ FEED
  let reviews = document.createElement("div");
  reviews.className = "movie-profile-reviews";
  reviews.setAttribute("id", "movie-profile-reviews");
  let titleReview = document.createElement("h4");
  titleReview.textContent = "Reviews";
  reviews.append(titleReview);

  let activities = await getActivityByMovieID(movieID);
  console.log(activities);
  console.log(movieID);

  async function getActivityByMovieID(movieID) {
    try {
      let response = await fetch(`http://localhost:7001/GET/get-activities.php?movieID=${movieID}`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // Similar Movies - Niklas
  let similarMovies = document.createElement("div");
  similarMovies.className = "movie-profile-similarMovies";
  let titleSimilar = document.createElement("h4");
  titleSimilar.textContent = "Similar Movies";
  similarMovies.append(titleSimilar);

  let similar = await getSimilar(movieID);

  await similar.message.results.forEach(async function (simMovie) {
    let movie = await makeMovieBanner(simMovie.id);
    similarMovies.append(movie);
  });

  middle.append(description, streamingservices, credits, reviews, similarMovies);
  // ______________________________________________________________________________________________________
  // Appends in overlay
<<<<<<< HEAD
  overlay.append(movieHeader, info, middle, drop1, drop2);
=======
  overlay.append(movieHeader, info, middle);
>>>>>>> parent of 2af9255 (up)

  createActivities(activities, "feed", "movie-profile-reviews");

  // ------------------------------------------------------------------------------------------------------
  // EVENT for the buttons
  watchLater.addEventListener("click", async function () {
    relation = await getButtonRealtionStatus(loggedInUser, movieID);

    // om personen inte har filmen i sin watchlist => lägg till den
    if (relation.watchlist == false) {
      postNewActivity(movieID, loggedInUser, "watchlist");
      watchLater.classList.add("marked");
    }

    // om personen HAR ifilmen i sin watchlist => ta bort den
    if (relation.watchlist !== false) {
      deleteteActivity(relation.watchlist);
      watchLater.classList.remove("marked");
    }
  });

  watched.addEventListener("click", async function () {
    relation = await getButtonRealtionStatus(loggedInUser, movieID);

    // om personen INTE har filmen i sin watched => lägg till den
    if (relation.watched == false) {
      postNewActivity(movieID, loggedInUser, "watched");
      watched.classList.add("marked");

      review.style.display = "block";

      // VISA REVIEW knapp
    }

    // om personen HAR ifilmen i sin watched => ta bort den
    if (relation.watched !== false) {
      deleteteActivity(relation.watched);
      watched.classList.remove("marked");

      // TA BORT REVIEW knapp
      review.style.display = "none";

      // vill man då ta bort markeringen från watchlist?
    }
  });

  review.addEventListener("click", (e) => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";

    // $('body').css('overflow', 'hidden');
    let overlayFade = document.createElement("div");
    overlayFade.setAttribute("id", "overlay-fade");
    let messageWrapper = document.createElement("div");
    messageWrapper.setAttribute("id", "message-wrapper");

    // Position
    overlayFade.style.top = "0";
    messageWrapper.style.top = "0";
    let object = e.target.className;

    // Content depending on what button is clicked
    if (object.includes("review")) {
      // Top Div -
      let topDiv = document.createElement("div");
      topDiv.className = "top";
      let exitButton = document.createElement("img");
      exitButton.className = "exit button";
      exitButton.setAttribute("src", "../icons/exit.svg");
      let title = document.createElement("h1");
      title.className = "titleComment";
      title.textContent = "Leave a review";

      // Middle Div -
      let middleDiv = document.createElement("div");
      middleDiv.className = "middle";

      // FORM
      let form = document.createElement("form");

      // Rating
      let labelRating = document.createElement("label");
      labelRating.textContent = "rating-comment";

      let stars = document.createElement("ul");

      // for (let i = 0; i < 5; i++) {
      //     let star = document.createElement(".")
      // }

      // Comment
      let labelComment = document.createElement("label");
      labelComment.textContent = "label-comment";
      let input = document.createElement("input");
      input.setAttribute("type", "text-area");
      input.setAttribute("name", "comment");
      input.classname = "comment";
      input.value = relation.review.comment;

      // Submit-button
      let submitButton = document.createElement("button");
      submitButton.setAttribute("type", "submit");
      submitButton.className = "submit button";
      submitButton.textContent = "Submit";

      topDiv.append(exitButton, title);
      middleDiv.append();
      form.append(labelComment, input);
      messageWrapper.append(topDiv, middleDiv, form, submitButton);
    }

    overlayFade.append(messageWrapper);
    document.body.append(overlayFade);

    // exit click
    document.querySelector(".exit").addEventListener("click", () => {
      overlayFade.remove();
      document.body.style.overflow = "visible";
    });

    // star click
    // const container = document.querySelector(".rating");
    // const stars = container.querySelectorAll(".rating-stars");
    // container.addEventListener("click", (e) => {
    //     const elClass = e.target.classList;
    //     if (!elClass.contains("active")){
    //         stars.forEach( item => item.classList.remove("active"));
    //     }
    //     elClass.add(".active");
    // });

    // submit click
  });

  buttons.append(watchLater, watched, review);
}

// makeMovieProfile(movieID);
