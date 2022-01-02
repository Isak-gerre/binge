// Hämta filmbild + titel
// skapa element
// returnera det.

"use strict";

async function makeMovieBanner(movieID, page) {
  let movieInfo = await getMovieInfo(movieID);

  //create elements
  let movieBanner = document.createElement("div");

  //classes
  movieBanner.className = "movieBanner";

  let movieImgPath = ``;

  if (movieInfo.message["poster_path"] == null) {
    movieImgPath = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["backdrop_path"]}')`;
  } else {
    movieImgPath = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["poster_path"]}')`;
  }

  //the background image
  movieBanner.style.backgroundImage = movieImgPath;

  // Om vi är på myprofile så körs detta
  if (page == "myProfile") {
    movieBanner.setAttribute("data-long-press-delay", "500");
    movieBanner.addEventListener("long-press", (e) => {
      e.preventDefault();

      let allMovieBanner = document.querySelectorAll(".movieBanner");
      allMovieBanner.forEach((movBan) => {
        movBan.style.filter = "blur(8px)";
      });

      touchstart(e);
      touchend(e);

      function touchstart(e) {
        e.target.style.filter = "blur(0px)";
        e.target.style.transform = "scale(1.1 , 1.1)";
        onlongtouch(e);
      }

      function onlongtouch(e) {
        // Prevent scrolling
        document.body.style.overflow = "hidden";

        let overlay = document.createElement("div");
        overlay.setAttribute("id", "overlay-profile");

        // Event på overlay
        // tar bort knapparna osv.
        overlay.addEventListener("click", () => {
          document.body.style.overflow = "visible";
          document.querySelector(".options > button:first-child").remove();
          document.querySelector(".options > button:last-child").remove();
          overlay.remove();

          allMovieBanner.forEach((movBan) => {
            movBan.style.filter = "blur(0px)";
          });

          e.target.style.transform = "scale(1 , 1)";
          e.target.style.zIndex = "0";
        });

        // Position på overlay
        let currentTopPosition = window.pageYOffset.toFixed(0);
        overlay.style.top = `${currentTopPosition}px`;

        document.body.append(overlay);

        e.target.style.zIndex = "16000";
        let options = document.createElement("div");
        options.className = "options";

        let markedAsWatched = document.createElement("button");
        markedAsWatched.textContent = "Marked as watched";
        markedAsWatched.className = "button";

        markedAsWatched.addEventListener("click", () => {
          // Forsättning
          // det ska göras en patch på denna aktiviteten
          // Ändra type till watched samt datum till nytt
        });

        let removeFromList = document.createElement("button");
        removeFromList.textContent = "Remove from list";
        removeFromList.className = "button";

        removeFromList.addEventListener("click", () => {
          // Denna knappen ska radera den från aktiviteten och griden
        });

        // En delay på när knapparna skapas.
        options.append(markedAsWatched, removeFromList);
        setTimeout(() => {
          e.target.append(options);
        }, 1000);
      }
    });
  }

  //send to movieProfile
  movieBanner.addEventListener("click", (e) => {
    e.stopPropagation();
    goToPageAndAddToState(`explore.php?movieID=${movieID}`);
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
    let input = document.getElementById("searchField").value;
    let searchBy = document.querySelector(".active").textContent;
    let search = makeSearchState(input, searchBy);
    goToPageAndAddToState(`explore.php?movieID=${movie.id}`, search);
  });

  //return it
  return movieBanner;
}

// makeMovieBanner(550);
// makeMovieBanner(123);
// makeMovieBanner(321);
