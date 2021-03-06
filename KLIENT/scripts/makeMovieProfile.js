"use strict";

// Variabler för den inloggade?
let loggedInUser = getLoggedInUserID();
async function makeMovieProfile(movieID) {
  document.querySelector(".drop3").remove();
  document.querySelector(".drop4").remove();

  let user = await getUserInfo(loggedInUser);
  let overlay = document.getElementById("overlay");
  let data = await getMovieInfo(movieID);
  let movieInfo = data.message;

  // ______________________________________________________________________________________________________
  // HEADER
  let movieHeader = document.createElement("div");
  movieHeader.className = "movie-profile-header";

  // // Drop
  let drop1 = document.createElement("div");
  drop1.className = "drop1";
  let drop2 = document.createElement("div");
  drop2.className = "drop2";

  // backdrop
  let backdrop = document.createElement("div");
  backdrop.className = "movie-profile-backdrop";
  if (movieInfo["backdrop_path"] == null) {
    backdrop.style.backgroundImage = "url('/icons/image.svg')";
  } else {
    backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieInfo["backdrop_path"]})`;
  }

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
  poster.className = "movie-profile-poster";

  if (movieInfo["poster_path"] == null) {
    poster.setAttribute("src", "/icons/image.svg");
    poster.style.background = "white";
  } else {
    poster.setAttribute("src", `https://image.tmdb.org/t/p/w500${movieInfo["poster_path"]}`);
  }

  infoPoster.append(poster);

  // info-text  (Title, Buttons, Release, Rating, Runtime)
  let infoText = document.createElement("div");
  infoText.className = "movie-profile-info-text";

  // p (Runtime, Rating & Release date) - Isak
  let movieRsDiv = document.createElement("div");
  let movieRs = document.createElement("p");
  let runtime = movieInfo["runtime"] != undefined || movieInfo["runtime"] != 0 ? `| ${movieInfo["runtime"]} min` : "";

  let imdbLogo = `<svg id="imdb_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>`;
  let rating = movieInfo["vote_average"] != 0 ? `${imdbLogo}${movieInfo["vote_average"]} |` : "";
  let currenttime = moment().format("YYYY-MM-DD");

  if (currenttime < movieInfo["release_date"]) {
    movieRs.innerHTML = `Premieres: ${movieInfo["release_date"]} ${runtime}`;
  } else {
    movieRs.innerHTML = `${rating} ${movieInfo["release_date"]} ${runtime}`;
  }

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
  review.style.display = "none";

  if (relation.watchlist !== false) {
    watchLater.classList.add("marked");
  }
  if (relation.watched !== false) {
    watched.classList.add("marked");
    review.style.display = "flex";
  }

  if (relation.review !== false) {
    review.textContent = "Update review";
    review.classList.add("marked");
  }

  if (currenttime < movieInfo["release_date"]) {
    watched.disabled = true;
    watched.style.opacity = "0.5";
  }

  buttons.append(watchLater, watched, review);
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

  let additionalInfo = await getAdditionalInfo(movieID);
  let userRegion = user.region;

  let streamingservices = document.createElement("div");
  streamingservices.className = "movie-profile-streamingservices";

  let streamingservicesText = document.createElement("h4");
  streamingservicesText.textContent = "Available on";
  streamingservicesText.className = "streaming-services-text";

  streamingservices.append(streamingservicesText);

  let allProvidersGrid = document.createElement("div");
  allProvidersGrid.className = "allProviders";

  streamingservices.append(allProvidersGrid);

  // Checks if you can buy, rent or flatrate in your country
  if (additionalInfo.message.providers.results[userRegion] == undefined) {
    let message = document.createElement("p");
    message.textContent = "It's not avaible in your country :(";
    streamingservices.append(message);
  } else {
    // Checks if you can flatrate it
    if (additionalInfo.message.providers.results[userRegion].flatrate == undefined) {
      let message = document.createElement("p");
      message.textContent = "This movie isnt avaible at any streaming services.";
      streamingservices.append(message);
    } else {
      let movieProviders = additionalInfo.message.providers.results[userRegion].flatrate;
      let activeUserSC = user.active_streaming_services;

      let yourProviders = movieProviders.filter((prov) => activeUserSC.includes(prov["provider_name"]));
      let otherProviders = movieProviders.filter((prov) => !activeUserSC.includes(prov["provider_name"]));

      let yourStreamingservicesGrid = document.createElement("div");
      yourStreamingservicesGrid.className = "your-streaming-services-grid";

      let yourStreamingServices = document.createElement("div");
      yourStreamingServices.className = "movie-profile-your-streaming-services";
      yourStreamingServices.innerHTML = "<p>Yours</p>";

      if (yourProviders.length > 0) {
        yourProviders.forEach((provider) => {
          let providerName = provider.provider_name;
          if (activeUserSC.includes(providerName)) {
            let yourProvidersDiv = document.createElement("img");

            yourStreamingservicesGrid.append(yourProvidersDiv);
            yourProvidersDiv.setAttribute("src", `https://image.tmdb.org/t/p/w200${provider["logo_path"]}`);
          }
        });
      } else {
        let message = document.createElement("p");
        message.textContent = "Not available on your streaming providers.";
        message.className = "movie-p-message";
        yourStreamingServices.append(message);
      }

      yourStreamingServices.append(yourStreamingservicesGrid);
      allProvidersGrid.append(yourStreamingServices);

      if (otherProviders.length > 0) {
        let otherStreamingservicesGrid = document.createElement("div");
        otherStreamingservicesGrid.className = "other-streaming-services-grid";

        let otherStreamingServices = document.createElement("div");
        otherStreamingServices.className = "movie-profile-other-streaming-services";
        otherStreamingServices.innerHTML = "<p>Other</p>";

        otherProviders.forEach((provider) => {
          let otherProvidersDiv = document.createElement("img");
          otherStreamingservicesGrid.append(otherProvidersDiv);
          otherProvidersDiv.setAttribute("src", `https://image.tmdb.org/t/p/w200${provider["logo_path"]}`);
        });

        otherStreamingServices.append(otherStreamingservicesGrid);
        allProvidersGrid.append(otherStreamingServices);
      }
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

  let count = 5;

  if (additionalInfo.message.credits.cast.length < 5) {
    count = additionalInfo.message.credits.cast.length;
  }

  for (let i = 0; i < count; i++) {
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
    let name = document.createElement("p");

    if (person !== undefined) {
      if (person.profile_path == null) {
        image.style.backgroundImage = `url(/icons/face.svg)`;
      } else {
        image.style.backgroundImage = `url(https://image.tmdb.org/t/p/w200/${person.profile_path})`;
      }
      name.textContent = person.name;
    } else {
      image.style.backgroundImage = `url(/icons/face.svg)`;
      name.textContent = "Jane Doe";
    }

    productionPeople.addEventListener("click", () => {
      let name = person.name.toLowerCase();
      makeSearchOverlay(name, "Actor");
    });

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

  async function getActivityByMovieID(movieID) {
    let response = await fetch(`${urlAPI}/GET/get-activities.php?movieID=${movieID}`);
    let data = await response.json();
    return data;
  }

  if (activities.length == 0) {
    let message = document.createElement("p");
    message.className = "movie-p-message";
    message.textContent = "This movie doesn't have any reviews yet.";
    reviews.append(message);
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
  if (activities.length != 0) {
    activities.sort((a, b) => b.date - a.date);
    makeShowMoreForActis(makeShowMoreForActis, "movieProfile", "#movie-profile-reviews", activities, 1);
  }

  // ______________________________________________________________________________________________________
  // Appends in overlay
  overlay.append(movieHeader, info, middle, drop1, drop2);

  // ------------------------------------------------------------------------------------------------------
  // EVENT for the buttons
  watchLater.addEventListener("click", async function () {
    watchLater.disabled = true;
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
    watchLater.disabled = false;
  });

  watched.addEventListener("click", async function () {
    watched.disabled = true;
    relation = await getButtonRealtionStatus(loggedInUser, movieID);

    // om personen INTE har filmen i sin watched => lägg till den
    if (relation.watched == false) {
      postNewActivity(movieID, loggedInUser, "watched");
      watched.classList.add("marked");

      // VISA REVIEW knapp
      review.style.display = "flex";
    }

    // om personen HAR ifilmen i sin watched => ta bort den
    if (relation.watched !== false) {
      deleteteActivity(relation.watched);
      watched.classList.remove("marked");
      review.classList.remove("marked");
      review.textContent = "Review";

      // TA BORT REVIEW knapp
      review.style.display = "none";
    }

    watched.disabled = false;
  });

  review.addEventListener("click", async function (e) {
    relation = await getButtonRealtionStatus(loggedInUser, movieID);

    // Prevent scrolling
    document.body.style.overflow = "hidden";

    // overlayFade
    let overlayFade = document.createElement("div");
    overlayFade.className = "overlay-fade";
    let messageWrapper = document.createElement("div");
    messageWrapper.className = "message-wrapper";

    // Position
    let currentTopPosition = window.pageYOffset.toFixed(0);
    overlayFade.style.top = `${currentTopPosition}px`;
    messageWrapper.style.top = `${currentTopPosition}px`;

    document.body.append(overlayFade);

    setTimeout(() => {
      messageWrapper.style.display = "flex";
    }, 500);

    // the object you press with the finger/mouse
    let object = e.target.className;

    // Content depending on what button is clicked
    if (object.includes("review")) {
      // Top Div -
      let topDiv = document.createElement("div");
      topDiv.className = "top";
      let exitButton = document.createElement("img");
      exitButton.className = "exit button";
      exitButton.setAttribute("src", "/icons/exit.svg");
      let title = document.createElement("h1");
      title.className = "titleComment";
      title.textContent = "Tell your friends";

      // Middle Div -
      let middleDiv = document.createElement("div");
      middleDiv.className = "middle";

      // Rating
      let labelRating = document.createElement("label");
      labelRating.textContent = "label-rating";

      let stars = document.createElement("section");
      stars.setAttribute("id", "rate");

      for (let i = 1; i <= 5; i++) {
        let input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("id", `star_${i}`);
        input.setAttribute("name", "rate");
        input.setAttribute("value", `${i}`);

        if (relation.review.rate != undefined && relation.review.rate == i) {
          input.checked = true;
        }

        let label = document.createElement("label");
        label.setAttribute("for", `star_${i}`);
        label.setAttribute("title", `${i}`);
        label.innerHTML = "&#9733;";

        stars.prepend(input, label);
      }

      // Bottom
      let bottomDiv = document.createElement("div");
      bottomDiv.className = "bottom";

      let labelHolder = document.createElement("div");
      labelHolder.classList.add("labelHolder");

      let labelComment = document.createElement("label");
      labelComment.textContent = "Review";
      labelComment.classList.add("labelComment");

      let buttonHolder = document.createElement("div");
      buttonHolder.className = "buttonHolder";

      if (relation.review != false) {
        let date = howManyDaysAgo(relation.review.date);
        let labelDate = document.createElement("label");
        labelDate.classList.add("labelDate");

        labelDate.textContent = `Last updated ${date}`;
        labelHolder.append(labelComment, labelDate);

        // Delete-button
        let deleteButton = document.createElement("button");
        deleteButton.className = "delete button";
        deleteButton.textContent = "Delete review";

        // Delete event - ta bort från DB, ta bort markering på reviewknapp
        deleteButton.addEventListener("click", () => {
          deleteteActivity(relation.review.id);

          let message = "You have successfully deleted your review";
          closingMessage(message);

          review.classList.remove("marked");
          review.textContent = "Review";
        });
        buttonHolder.append(deleteButton);
      } else {
        labelHolder.append(labelComment);
      }

      let textArea = document.createElement("textarea");
      textArea.setAttribute("id", "text-area");
      textArea.setAttribute("name", "comment");
      textArea.setAttribute("rows", "4");
      textArea.setAttribute("placeholder", "Leave a comment...");

      if (relation.review.comment != undefined) {
        textArea.textContent = relation.review.comment;
      }

      // Submit-button
      let submitButton = document.createElement("button");
      submitButton.setAttribute("type", "submit");
      submitButton.className = "submit button";
      submitButton.textContent = "Submit";

      // Appends
      topDiv.append(title, exitButton);
      middleDiv.append(stars);
      bottomDiv.append(labelHolder, textArea);
      buttonHolder.append(submitButton);
      messageWrapper.append(topDiv, middleDiv, bottomDiv, buttonHolder);

      setTimeout(() => {
        topDiv.style.display = "flex";
        middleDiv.style.display = "flex";
        bottomDiv.style.display = "flex";
        buttonHolder.style.display = "flex";
      }, 1500);
    }

    overlayFade.append(messageWrapper);
    document.body.append(overlayFade);

    // Exit clickevent
    document.querySelector(".exit").addEventListener("click", () => {
      overlayFade.remove();
      document.body.style.overflow = "visible";
    });

    // Submit click
    document.querySelector(".submit").addEventListener("click", () => {
      let comment = document.querySelector("textarea").value;
      let starRate = 0;
      let radioStars = document.querySelectorAll("input");

      radioStars.forEach((star) => {
        if (star.checked == true) {
          starRate = star.value;
        }
      });

      let message = "";
      // PATCH
      if (relation.review != false) {
        relation.review.rate = starRate;
        relation.review.comment = comment;
        relation.review.updated = true;

        patchActivity(relation.review);
        message = "You updated your review";

        // POST
      } else {
        postNewActivity(movieID, loggedInUser, "review", comment, starRate);
        message = "Thanks for your review";
      }

      closingMessage(message);
      review.classList.add("marked");
      review.textContent = "Update review";
    });

    function closingMessage(message) {
      let messageWrapper = document.querySelector(".message-wrapper");
      let top = document.querySelector(".message-wrapper > .top");
      let middle = document.querySelector(".message-wrapper > .middle");
      let bottom = document.querySelector(".message-wrapper > .bottom");
      top.style.animation = "fadeOut 1.2s";
      middle.style.animation = "fadeOut 1.2s";
      bottom.style.animation = "fadeOut 1.2s";

      setTimeout(() => {
        messageWrapper.innerHTML = "";
        messageWrapper.style.display = "flex";
        messageWrapper.style.justifyContent = "center";
        messageWrapper.style.alignItems = "center";
        let p = document.createElement("p");
        p.textContent = message;
        p.style.animation = "fadeIn 1s";
        messageWrapper.append(p);
      }, 1000);

      setTimeout(() => {
        overlayFade.style.animation = "fadeOut 1.2s";

        setTimeout(async function () {
          reviews.innerHTML = "";
          overlayFade.remove();
          document.body.style.overflow = "visible";
          let titleReview = document.createElement("h4");
          titleReview.textContent = "Reviews";
          reviews.append(titleReview);

          let activities = await getActivityByMovieID(movieID);
          activities.sort((a, b) => b.date - a.date);
          makeShowMoreForActis(makeShowMoreForActis, "movieProfile", "#movie-profile-reviews", activities, 1);
        }, 1000);
      }, 2500);
    }
    buttons.append(watchLater, watched, review);
  });

  toScroll();
}
